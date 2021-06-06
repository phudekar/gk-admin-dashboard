import React from 'react'
import { render } from '@testing-library/react'
import Users from './Users'

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
