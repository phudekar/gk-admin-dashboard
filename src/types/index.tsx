export type User = {
    id: string,
    name: string,
    email: string,
    role: Role,
    isSelected?: boolean 
}

export enum Role {
    Admin = 'Admin',
    Member = 'Member'
}

export type ButtonProps = {
    onClick?: () => any
    disabled?: boolean
}

export interface Action {
    type: string
}

export type UsersState = {
    users: Array<User>
}