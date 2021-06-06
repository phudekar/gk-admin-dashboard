import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SearchBox from '.';

test('should render search input with placeholder', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(
        <SearchBox placeholder="Type to search" onSearch={onSearch} />)

    expect(getByPlaceholderText("Type to search")).toBeVisible();
})

test('should call onSearch with query', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(
        <SearchBox onSearch={onSearch} />)
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "a" } })
    expect(onSearch).toHaveBeenCalledWith("a")
})