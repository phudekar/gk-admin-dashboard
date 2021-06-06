import { Action, UsersState } from "../types";


export const USERS_LOADED = 'USERS_LOADED'
export const USERS_SELECTED = 'USERS_SELECTED'
export const USERS_DESELECTED = 'USERS_DESELECTED'
export const USER_UPDATED = 'USER_UPDATED'
export const USERS_DELETED = 'USERS_DELETED'

const initialState: UsersState = { users: [] }

const usersReducer = (state: UsersState, action: Action): UsersState => {
    const anyAction = action as any;
    switch (action.type) {
        case USERS_LOADED:
            return { ...initialState, users: anyAction.users }
        case USER_UPDATED:
            const updatedUsers = state.users.map(user =>
                user.id !== anyAction.user.id ? user :
                    anyAction.user);
            return { ...state, users: updatedUsers };
        case USERS_DELETED:
            const activeUsers = state.users
                .filter(user => anyAction.ids.indexOf(user.id) < 0);
            return { ...state, users: activeUsers }
        case USERS_SELECTED:
            return {
                ...state, users:
                    state.users.map(user =>
                        anyAction.ids.indexOf(user.id) < 0 ? user :
                            { ...user, isSelected: true })
            };
        case USERS_DESELECTED:
            return {
                ...state, users:
                    state.users.map(user =>
                        anyAction.ids.indexOf(user.id) < 0 ? user :
                            { ...user, isSelected: false })
            }
        default:
            return state;

    }
}

export default usersReducer;