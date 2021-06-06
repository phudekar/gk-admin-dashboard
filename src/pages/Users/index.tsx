import React from 'react';
import { Role, User } from '../../types';
import Users from './Users';

const UsersPage = () => {
    const users: Array<User> = [
        { name: 'John Doe', email: 'john.doe@yahoo.com', role: Role.Member },
        { name: 'Jane Doe', email: 'jane.doe@yahoo.com', role: Role.Admin }
    ]
    return <Users users={users} />
}

export default UsersPage;