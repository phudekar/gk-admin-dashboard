import React from 'react';
import { render } from '@testing-library/react';
import EditableDropDown from '.';

test('should render value if edit mode is false', () => {
    const onChange = jest.fn();
    const { queryByTestId, getByText } = render(
        <EditableDropDown data={["a", "b", "c"]} value="b" onChange={onChange} />);

    expect(getByText("b")).toBeVisible();
    expect(queryByTestId("dropdown")).toBeNull();
})

test('should render dropdown if edit mode is true', () => {
    const onChange = jest.fn();
    const { queryByTestId, getByText } = render(
        <EditableDropDown editMode={true} data={["a", "b", "c"]}
            value="b" onChange={onChange} />);

    expect(getByText("b")).toBeVisible();
    expect(queryByTestId("dropdown")).toBeVisible();
})