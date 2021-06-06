import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SearchBox from '.';

test('should render search input with placeholder', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(
        <SearchBox placeholder="Type to search" onSearch={onSearch} />)

    expect(getByPlaceholderText("Type to search")).toBeVisible();
})

test('should call onSearch with filtered data', () => {
    const onSearch = jest.fn();
    const data = ["a", "aa", "b", "c"]
    const { getByPlaceholderText } = render(
        <SearchBox data={data} onSearch={onSearch} />)
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "a" } })
    expect(onSearch).toHaveBeenCalledWith(["a", "aa"])
})

test('should use custom comparer to filter data', () => {
    const onSearch = jest.fn();
    const data = ["a", "aa", "b", "c"]
    const comparer = (item: any, query: any) => item === query;
    const { getByPlaceholderText } = render(
        <SearchBox data={data} onSearch={onSearch} comparer={comparer} />)
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "a" } })
    expect(onSearch).toHaveBeenCalledWith(["a"])
})

test('should reset to complete data on clear', () => {
    const onSearch = jest.fn();
    const data = ["a", "aa", "b", "c"]
    const comparer = (item: any, query: any) => item === query;
    const { getByPlaceholderText } = render(
        <SearchBox data={data} onSearch={onSearch} comparer={comparer} />)
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "a" } })
    expect(onSearch).toHaveBeenCalledWith(["a"])
    fireEvent.change(searchInput, { target: { value: "" } })
    expect(onSearch).toHaveBeenCalledWith(data)
})