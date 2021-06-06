import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import PaginationControl from '../../components/PaginationControl'
import SearchBox from '../../components/SearchBox'
import { User } from '../../types'
import UsersTable from './UsersTable'

const Users = ({ users = [] }: UsersProps) => {
    const [page, setPage] = useState(1);
    const [filteredUsers, setFilteredUsers] = useState(users);
    return (
        <div>
            <PageHeader title="Users" />
            <SearchBox
                data={users}
                comparer={userComparer}
                placeholder="Search by name, email or role"
                onSearch={setFilteredUsers} />
            <UsersTable users={filteredUsers} />
            <PaginationControl page={page}
                pageSize={10}
                totalItems={users.length}
                onPageChange={setPage} />
        </div>
    )
}

export type UsersProps = {
    users?: Array<User>
}

export const userComparer = (user: User, query: string): boolean =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().indexOf(query) >= 0;

export default Users