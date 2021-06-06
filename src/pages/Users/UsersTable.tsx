import React from 'react'
import { User } from '../../types';

const UsersTable = ({ users = [] }: UsersTableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <td></td>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map(user =>
                        <UserRow key={user.name} user={user} />
                    )
                }
            </tbody>
        </table>
    )
}

const UserRow = ({ user }: UserRowProps) => {
    return (
        <tr>
            <td></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td></td>
        </tr>
    )
}

export type UsersTableProps = {
    users?: Array<User>
}

export type UserRowProps = {
    user: User
}

export default UsersTable;