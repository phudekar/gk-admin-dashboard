import React from 'react'
import { render } from '@testing-library/react'
import Users, { userComparer } from './Users'
import { Role } from '../../types'

test('should render users header', () => {
    const { getByText } = render(<Users />)
    expect(getByText('Users')).toBeVisible()
})

test('should render searchbox', () => {
    const { getByPlaceholderText } = render(<Users />)
    expect(getByPlaceholderText('Search by name, email or role')).toBeVisible()
})

test('should render pagination', () => {
    const { getByTestId } = render(<Users />)
    expect(getByTestId('first-page')).toBeVisible()
})

test('should return true if name matches with query', () => {
    const user = { name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member}
    expect(userComparer(user, 'doe')).toBeTruthy()
})

test('should return true if email matches with query', () => {
    const user = { name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member}
    expect(userComparer(user, 'abc')).toBeTruthy()
})

test('should return true if role matches with query', () => {
    const user = { name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member}
    expect(userComparer(user, 'member')).toBeTruthy()
})

test('should return false if nothing matches with query', () => {
    const user = { name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member}
    expect(userComparer(user, 'admin')).toBeFalsy()
})
