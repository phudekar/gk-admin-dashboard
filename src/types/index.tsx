export type User = {
    name: string,
    email: string,
    role: Role
}

export enum Role {
    Admin = 'Admin',
    Member = 'Member'
}