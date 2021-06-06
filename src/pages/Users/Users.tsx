import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import PaginationControl from '../../components/PaginationControl'
import SearchBox from '../../components/SearchBox'
import { ButtonProps, User } from '../../types'
import UsersTable from './UsersTable'

const Users = ({ users = [], onDeleteUsers }: UsersProps) => {
    const [page, setPage] = useState(1);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);

    const addUserToSelection = (ids: Array<string>) => {
        ids.forEach(id => {
            if (selectedUsers.indexOf(id) < 0) {
                selectedUsers.push(id);
            }
        });
        setSelectedUsers([...selectedUsers])
    }

    const removeUserFromSelection = (ids: Array<string>) => {
        ids.forEach(id => {
            const userIndex = selectedUsers.indexOf(id);
            if (userIndex >= 0) {
                selectedUsers.splice(userIndex, 1)
            }
        });
        setSelectedUsers([...selectedUsers])
    }

    const deleteUsers = () => {
        setFilteredUsers([...filteredUsers.filter(user => selectedUsers.indexOf(user.id) < 0)])
        onDeleteUsers(selectedUsers)
    }

    return (
        <div>
            <PageHeader title="Users" />
            <SearchBox
                data={users}
                comparer={userComparer}
                placeholder="Search by name, email or role"
                onSearch={setFilteredUsers} />
            <UsersTable users={filteredUsers}
                selectedUsers={selectedUsers}
                onSelected={addUserToSelection}
                onDeselected={removeUserFromSelection}
            />
            <div>
                <DeleteButton onClick={deleteUsers} />
                <PaginationControl page={page}
                    pageSize={10}
                    totalItems={users.length}
                    onPageChange={setPage} />
            </div>
        </div>
    )
}

const DeleteButton = (props: ButtonProps) => {
    return (
        <button {...props} >Delete Selected</button>
    )
}

export type UsersProps = {
    users?: Array<User>,
    onDeleteUsers: (ids: Array<string>) => any
}

export const userComparer = (user: User, query: string): boolean =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().indexOf(query) >= 0;

export default Users