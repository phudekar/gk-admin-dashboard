import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Users, { getFilteredUsers, pageFilter, userComparer } from './Users'
import { Role, User } from '../../types'
import { fetchUsers } from '../../actions/usersActions';
import { deleteUsers, deselectUsers, selectUsers } from '../../actions/usersActions'

jest.mock('../../actions/usersActions')
fetchUsers.mockResolvedValue([{ id: "1", name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member }
]);

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
    const user = { id: "1", name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member }
    expect(userComparer(user, 'doe')).toBeTruthy()
})

test('should return true if email matches with query', () => {
    const user = { id: "1", name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member }
    expect(userComparer(user, 'abc')).toBeTruthy()
})

test('should return true if role matches with query', () => {
    const user = { id: "1", name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member }
    expect(userComparer(user, 'member')).toBeTruthy()
})

test('should return false if nothing matches with query', () => {
    const user = { id: "1", name: 'John Doe', email: 'jhon.doe@abc.com', role: Role.Member }
    expect(userComparer(user, 'admin')).toBeFalsy()
})

test('should return matching users', () => {
    const data: Array<User> = [{
        id: "1",
        name: 'Abc Def',
        email: 'abc@gmail.com',
        role: Role.Member
    },
    {
        id: "2",
        name: 'Xyz pqr',
        email: 'xyz@gmail.com',
        role: Role.Admin
    }]
    const result = getFilteredUsers(data, 'abc', userComparer);
    expect(result.length).toBe(1);
    expect(result).toStrictEqual([data[0]])

    expect(getFilteredUsers(data, 'admin', userComparer)).toStrictEqual([data[1]])
})

test('should filter data in page', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    expect(data.filter(pageFilter(1, 3))).toStrictEqual([1, 2, 3])
    expect(data.filter(pageFilter(2, 3))).toStrictEqual([4, 5, 6])
    expect(data.filter(pageFilter(5, 3))).toStrictEqual([13, 14, 15])
})

test('should call delete users for all selected ids', () => {
    const data = [
        { id: '1', name: 'John Doe 1', email: 'john.doe1@yahoo.com', role: Role.Member },
        { id: '2', isSelected: true, name: 'John Doe 2', email: 'john.doe2@yahoo.com', role: Role.Admin },
        { id: '3', isSelected: true, name: 'John Doe 3', email: 'john.doe3@yahoo.com', role: Role.Member }
    ]
    const { getByText } = render(<Users users={data} />)
    fireEvent.click(getByText('Delete Selected'));
    expect(deleteUsers).toHaveBeenCalledWith(['2', '3'])

})

test('should call select all for all users in page', () => {
    const data = [
        { id: '1', name: 'John Doe 1', email: 'john.doe1@yahoo.com', role: Role.Member },
        { id: '2', isSelected: true, name: 'John Doe 2', email: 'john.doe2@yahoo.com', role: Role.Admin },
        { id: '3', isSelected: true, name: 'John Doe 3', email: 'john.doe3@yahoo.com', role: Role.Member }
    ]
    const { getByTestId } = render(<Users users={data} />)
    fireEvent.click(getByTestId('select-all'));
    expect(selectUsers).toHaveBeenCalledWith(['1','2', '3'])
})

test('should call deselect all for all users in page', () => {
    const data = [
        { id: '1', isSelected: true, name: 'John Doe 1', email: 'john.doe1@yahoo.com', role: Role.Member },
        { id: '2', isSelected: true, name: 'John Doe 2', email: 'john.doe2@yahoo.com', role: Role.Admin },
        { id: '3', isSelected: true, name: 'John Doe 3', email: 'john.doe3@yahoo.com', role: Role.Member }
    ]
    const { getByTestId } = render(<Users users={data} />)
    fireEvent.click(getByTestId('select-all'));
    fireEvent.click(getByTestId('select-all'));
    expect(deselectUsers).toHaveBeenCalledWith(['1','2', '3'])
})