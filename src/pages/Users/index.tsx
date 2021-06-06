import React, { useState } from 'react';
import { Role, User } from '../../types';
import Users from './Users';

const UsersPage = () => {
    const users: Array<User> = [
        { id: '1', name: 'John Doe', email: 'john.doe@yahoo.com', role: Role.Member },
        { id: '2', name: 'Jane Doe', email: 'jane.doe@yahoo.com', role: Role.Admin }
    ]

    const [activeUsers, setActiveUsers] = useState(users);

    const deleteUsers = (ids: Array<string>) => {
        setActiveUsers([...activeUsers.filter(user =>
            ids.indexOf(user.id) < 0)])
    }

    return <Users users={activeUsers} onDeleteUsers={deleteUsers} />
}

export default UsersPage;