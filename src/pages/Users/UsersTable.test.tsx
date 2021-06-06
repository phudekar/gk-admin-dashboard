import React from 'react'
import { render } from '@testing-library/react'
import UsersTable from './UsersTable'
import { Role, User } from '../../types'

test('should render table headers', () => {
    const { container } = render(<UsersTable users={[]} />)
    const headings = container.querySelectorAll('th')
    expect(headings.length).toBe(4);
    expect(headings[0].textContent).toBe('Name')
    expect(headings[1].textContent).toBe('Email')
    expect(headings[2].textContent).toBe('Role')
    expect(headings[3].textContent).toBe('Actions')
})

test('should render empty table', () => {
    const { container } = render(<UsersTable users={[]} />)
    const tbody = container.querySelector('tbody')
    expect(tbody?.querySelectorAll('tr').length).toBe(0);
})

test('should render user row', () => {
    const users: Array<User> = [
        { id: '1', name: 'John Doe', email: 'john.doe@yahoo.com', role: Role.Member },
        { id: '2', name: 'Jane Doe', email: 'jane.doe@yahoo.com', role: Role.Admin }
    ]
    const { container } = render(<UsersTable users={users} />)
    const tbody = container.querySelector('tbody')

    const rows = tbody?.querySelectorAll('tr') || [];
    expect(rows?.length).toBe(2)
    verifyUserRow(users[0], rows[0])
    verifyUserRow(users[1], rows[1])
})

const verifyUserRow = (user: User, row: HTMLTableRowElement) => {
    const cols = row.querySelectorAll('td')
    expect(cols[1].textContent).toBe(user.name)
    expect(cols[2].textContent).toBe(user.email)
    expect(cols[3].textContent).toBe(user.role.toString())
}