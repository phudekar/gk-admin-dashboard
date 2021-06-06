import React, { useContext, useEffect } from 'react';
import { fetchUsers } from '../../actions/usersActions';
import { store } from '../../store';
import Users from './Users';

const UsersPage = () => {
    const { state }: any = useContext(store);
    useEffect(() => {
        fetchUsers()
    }, [])

    return <Users users={state.usersState?.users} />
}

export default UsersPage;