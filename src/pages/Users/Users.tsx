import React, { useState } from 'react'
import { deleteUsers, deselectUsers, selectUsers } from '../../actions/usersActions'
import PageHeader from '../../components/PageHeader'
import PaginationControl from '../../components/PaginationControl'
import SearchBox from '../../components/SearchBox'
import { ButtonProps, User } from '../../types'
import UsersTable from './UsersTable'
import styles from './users.module.css';

export function getFilteredUsers<T>(users: Array<T>, query: string,
    comparer: (item: T, q: string) => boolean): Array<T> {
    if (query) {
        const filteredData = [
            ...users.filter((item) => comparer(item, query))];
        return [...filteredData];
    } else {
        return users
    }
}

export const pageFilter = (page: number, pageSize: number): ((a: any, i: number) => boolean) =>
    (a: any, i: number) => i >= (page - 1) * pageSize && i < page * pageSize;

const Users = ({ users = [] }: UsersProps) => {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const [allSelected, setAllSelected] = useState(false);
    const [query, setQuery] = useState<string>('');

    const totalFilteredUsers = getFilteredUsers(users, query, userComparer);

    const filteredUsers = totalFilteredUsers.filter(pageFilter(page, pageSize));

    return (
        <div>
            <PageHeader title="Users" />
            <SearchBox
                placeholder="Search by name, email or role"
                onSearch={q => {
                    setQuery(q);
                    setPage(1);
                }} />
            <UsersTable users={filteredUsers} allSelected={allSelected}
                onSelectAllChanged={(selected) => {
                    if (selected) {
                        selectUsers(filteredUsers.map(u => u.id))
                    } else {
                        deselectUsers(filteredUsers.map(u => u.id))
                    }
                    setAllSelected(selected)
                }} />
            <div className={styles.tableFooter}>
                <DeleteButton onClick={() => {
                    deleteUsers(users.filter(u => u.isSelected)
                        .map(u => u.id))
                    setAllSelected(false)
                }} />
                <PaginationControl page={page}
                    pageSize={pageSize}
                    totalItems={totalFilteredUsers.length}
                    maxPageControls={5}
                    onPageChange={setPage} />
            </div>
        </div>
    )
}

const DeleteButton = (props: ButtonProps) => {
    return (
        <button {...props} className={styles.deleteAllButton} >Delete Selected</button>
    )
}

export type UsersProps = {
    users?: Array<User>,
}

export const userComparer = (user: User, query: string): boolean =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().indexOf(query) >= 0;

export default Users