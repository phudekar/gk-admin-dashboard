import { USERS_DELETED, USERS_DESELECTED, USERS_LOADED, USERS_SELECTED, USER_UPDATED } from "../reducers/usersReducer"
import { dispatch } from "../store"
import { Role, User } from "../types"

export const fetchUsers = () => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res => res.status === 200 ? res.json() : Promise.reject(res.status))
        .then((data: Array<User>) => dispatch({
            type: USERS_LOADED,
            users: data.sort((a: User, b: User) => a.name > b.name ? 1 : a.name === b.name ? 0 : -1)
                .map(a => ({ ...a, role: a.role.toString() === 'admin' ? Role.Admin : Role.Member }))
        }))
        .catch(error => {
            console.log(`Failed to get users. ${error}`)
        })
}

export const selectUsers = (ids: Array<string>) => {
    dispatch({
        type: USERS_SELECTED,
        ids
    })
}

export const deselectUsers = (ids: Array<string>) => {
    dispatch({
        type: USERS_DESELECTED,
        ids
    })
}

export const updateUser = (user: User) => {
    dispatch({
        type: USER_UPDATED,
        user
    })
}
export const deleteUsers = (ids: Array<string>) => {
    dispatch({
        type: USERS_DELETED,
        ids
    })
}