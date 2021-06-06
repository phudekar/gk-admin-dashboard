import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UserRow from './UserRow';
import { Role } from '../../types';
import { deleteUsers, updateUser } from '../../actions/usersActions';

jest.mock('../../actions/usersActions');

const user = { id: "1", name: 'John Doe', email: 'john.doe@yahoo.com', role: Role.Member }

test('should display user info if edit mode is false', () => {
    const { getByText, queryByTestId } = render(<UserRow user={user} />)
    expect(getByText(user.name)).toBeVisible()
    expect(getByText(user.email)).toBeVisible()
    expect(getByText(user.role)).toBeVisible()
    expect(queryByTestId('edit-1')).toBeVisible()
    expect(queryByTestId('save-1')).toBeNull()
})

test('should display save button if edit mode is true', () => {
    const { getByTestId, queryByTestId } = render(<UserRow user={user} />)
    fireEvent.click(getByTestId('edit-1'));
    expect(queryByTestId('save-1')).toBeVisible()
    expect(queryByTestId('edit-1')).toBeNull()
})

test('should call onUpdate after clicking save button', () => {
    const onUpdate = jest.fn();
    const { getByTestId, queryByTestId } = render(<UserRow user={user} />)
    fireEvent.click(getByTestId('edit-1'));
    expect(queryByTestId('edit-1')).toBeNull()

    fireEvent.click(getByTestId('save-1'));
    expect(queryByTestId('save-1')).toBeNull()
    expect(updateUser).toHaveBeenCalledWith(user)
})


test('should call onDelete after clicking delete button', () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(
        <UserRow user={user} />
    )
    fireEvent.click(getByTestId('delete-1'));
    expect(deleteUsers).toHaveBeenCalledWith([user.id])
})