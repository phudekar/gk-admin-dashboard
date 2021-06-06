import React from 'react';
import { render } from '@testing-library/react';
import EditableTextInput from '.';

test('should render value if edit mode is false', () => {
    const onChange = jest.fn();
    const { queryByTestId, getByText } = render(
        <EditableTextInput value="b" onChange={onChange} />);

    expect(getByText("b")).toBeVisible();
    expect(queryByTestId("input")).toBeNull();
})

test('should render text input if edit mode is true', () => {
    const onChange = jest.fn();
    const { queryByTestId } = render(
        <EditableTextInput editMode={true}
            value="b" onChange={onChange} />);

    expect(queryByTestId("input")).toBeVisible();
    expect(queryByTestId("input")).toHaveValue("b");

})