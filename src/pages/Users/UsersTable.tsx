import React from 'react'
import { User } from '../../types';
import UserRow from './UserRow';

const UsersTable = ({ users = [], selectedUsers = [], onSelected, onDeselected }: UsersTableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <td><input type="checkbox" data-testid="select-all"
                        onChange={e => e.target.checked
                            ? onSelected && onSelected(users.map(u => u.id))
                            : onDeselected && onDeselected(users.map(u => u.id))
                        } /></td>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map(user =>
                        <UserRow key={user.name} user={user} isSelected={selectedUsers.indexOf(user.id) >= 0}
                            onSelected={id => onSelected && onSelected([id])}
                            onDeselected={id => onDeselected && onDeselected([id])}

                        />
                    )
                }
            </tbody>
        </table>
    )
}

export type UsersTableProps = {
    users?: Array<User>
    selectedUsers?: Array<string>
    onSelected: (ids: Array<string>) => any,
    onDeselected: (ids: Array<string>) => any
}

export default UsersTable;