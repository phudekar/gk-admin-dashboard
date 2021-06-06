import React from 'react'
import { User } from '../../types';
import UserRow from './UserRow';
import styles from './users.module.css';

const UsersTable = ({ users = [], allSelected = false, onSelectAllChanged }: UsersTableProps) => {
    return (
        <table className={styles.usersTable}>
            <thead>
                <tr>
                    <td><input type="checkbox"
                        checked={allSelected}
                        data-testid="select-all"
                        onChange={e => {
                            onSelectAllChanged && onSelectAllChanged(e.target.checked)
                        }} /></td>
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

export type UsersTableProps = {
    users?: Array<User>,
    allSelected?: boolean,
    onSelectAllChanged?: (checked: boolean) => any
}

export default UsersTable;