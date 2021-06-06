import React from 'react';
import { USERS_DELETED, USERS_DESELECTED, USERS_LOADED, USERS_SELECTED, USER_UPDATED } from './usersReducer';
import { Role } from '../types';
import usersReducer from './usersReducer';

const users = [
    { id: '1', name: 'John Doe', email: 'john.doe@yahoo.com', role: Role.Member },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@yahoo.com', role: Role.Admin }
]

test('should load users in state', () => {
    const initialState = { users: [] };
    const action = {
        type: USERS_LOADED,
        users: users
    }
    const state = usersReducer(initialState, action);
    expect(state.users).toBe(users)
})

test('should update user in state', () => {
    const initialState = { users };
    const action = {
        type: USER_UPDATED,
        user: { ...users[0], name: 'SuperMan' }
    }
    const state = usersReducer(initialState, action);
    expect(state.users[0]).toStrictEqual({ ...users[0], name: 'SuperMan' })
})

test('should delete user from state', () => {
    const initialState = { users };
    const action = {
        type: USERS_DELETED,
        ids: ["2"]
    }
    const state = usersReducer(initialState, action);
    expect(state.users.length).toBe(1)
    expect(state.users[0].id).toBe("1")
})

test('should select user in state', () => {
    const initialState = { users };
    const action = {
        type: USERS_SELECTED,
        ids: ["2"]
    }
    const state = usersReducer(initialState, action);
    expect(state.users[1].isSelected).toBeTruthy()
})

test('should deselect user in state', () => {
    const initialState = { users: [users[0], { ...users[1], isSelected: true }] };
    const action = {
        type: USERS_DESELECTED,
        ids: ["2"]
    }
    const state = usersReducer(initialState, action);
    expect(state.users[1].isSelected).toBeFalsy()
})