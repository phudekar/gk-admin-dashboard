export type User = {
    id: string,
    name: string,
    email: string,
    role: Role
}

export enum Role {
    Admin = 'Admin',
    Member = 'Member'
}

export type ButtonProps = {
    onClick?: () => any
    disabled?: boolean
}