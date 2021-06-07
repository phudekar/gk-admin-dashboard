import { waitFor } from '@testing-library/dom';
import React from 'react'
import { USERS_DELETED, USERS_DESELECTED, USERS_LOADED, USERS_SELECTED, USER_UPDATED } from '../reducers/usersReducer';
import { dispatch } from '../store';
import { Role } from '../types';
import { deleteUsers, deselectUsers, fetchUsers, selectUsers, updateUser } from './usersActions'

jest.mock('../store');

test('should dispatch action for selecting users', () => {
    const ids = ['1', '2', '3'];
    selectUsers(ids);
    expect(dispatch).toHaveBeenCalledWith({ type: USERS_SELECTED, ids });
})

test('should dispatch action for deselecting users', () => {
    const ids = ['1', '2', '3'];
    deselectUsers(ids);
    expect(dispatch).toHaveBeenCalledWith({ type: USERS_DESELECTED, ids });
})

test('should dispatch action for deleting users', () => {
    const ids = ['1', '2', '3'];
    deleteUsers(ids);
    expect(dispatch).toHaveBeenCalledWith({ type: USERS_DELETED, ids });
})

test('should dispatch action for updating user', () => {
    const user = { id: '1', name: 'John', email: 'jhon@gmail.com', role: Role.Member }
    updateUser(user);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_UPDATED, user });
})

test('should dispatch user loaded', async () => {
    const users = [{ id: '1', name: 'John', email: 'jhon@gmail.com', role: Role.Member }]
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve(users),
        })
    );

    fetchUsers();
    await waitFor(() =>
        expect(dispatch).toHaveBeenCalledWith({ type: USERS_LOADED, users })
    );
})

test('should log error and return empty users', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 400,
        })
    );

    fetchUsers();
    await waitFor(() =>
        expect(dispatch).toHaveBeenCalledWith({ type: USERS_LOADED, users: [] })
    );
})