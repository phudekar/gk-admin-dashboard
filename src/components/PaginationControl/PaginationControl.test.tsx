import React from 'react';
import { fireEvent, render } from '@testing-library/react'
import PaginationControl from '.';

test('should render page buttons for exact pages', () => {
    const pageChanged = jest.fn()
    const { getByText } = render(
        <PaginationControl page={1} pageSize={10} totalItems={25}
            onPageChange={pageChanged} />)

    expect(getByText(1)).toBeVisible();
    expect(getByText(2)).toBeVisible();
    expect(getByText(3)).toBeVisible();
})

test('should render navigation page buttons', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl onPageChange={pageChanged} />)

    expect(getByTestId('first-page')).toBeVisible();
    expect(getByTestId('previous-page')).toBeVisible();
    expect(getByTestId('next-page')).toBeVisible();
    expect(getByTestId('last-page')).toBeVisible();
})

test('should disable navigation page buttons on first page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={1} pageSize={10} totalItems={25}
            onPageChange={pageChanged} />)

    expect(getByTestId('first-page')).toBeDisabled();
    expect(getByTestId('previous-page')).toBeDisabled();
    expect(getByTestId('next-page')).toBeEnabled();
    expect(getByTestId('last-page')).toBeEnabled();
})

test('should disable navigation page buttons on last page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={3} pageSize={10} totalItems={25}
            onPageChange={pageChanged} />)

    expect(getByTestId('first-page')).toBeEnabled();
    expect(getByTestId('previous-page')).toBeEnabled();
    expect(getByTestId('next-page')).toBeDisabled();
    expect(getByTestId('last-page')).toBeDisabled();
})

test('should render one page by default', () => {
    const pageChanged = jest.fn()
    const { getByText } = render(
        <PaginationControl onPageChange={pageChanged} />)

    expect(getByText(1)).toBeVisible();
})

test('should render one page by default when pageSize is 0', () => {
    const pageChanged = jest.fn()
    const { getByText } = render(
        <PaginationControl page={1} pageSize={0} totalItems={0}
            onPageChange={pageChanged} />)

    expect(getByText(1)).toBeVisible();
})

test('should render only max pages in view', () => {
    const pageChanged = jest.fn()
    const { getByTestId, queryByTestId } = render(
        <PaginationControl page={1} pageSize={2} totalItems={20}
            maxPageControls={3}
            onPageChange={pageChanged} />)

    expect(getByTestId('page-1-button')).toBeVisible();
    expect(getByTestId('page-2-button')).toBeVisible();
    expect(getByTestId('page-3-button')).toBeVisible();
    expect(queryByTestId('page-4-button')).toBeNull();
})

test('should render only max pages in view after next', () => {
    const pageChanged = jest.fn()
    const { getByTestId, queryByTestId } = render(
        <PaginationControl page={2} pageSize={2} totalItems={20}
            maxPageControls={3}
            onPageChange={pageChanged} />)

    expect(getByTestId('page-2-button')).toBeVisible();
    expect(getByTestId('page-3-button')).toBeVisible();
    expect(getByTestId('page-4-button')).toBeVisible();
    expect(queryByTestId('page-1-button')).toBeNull();
    expect(queryByTestId('page-5-button')).toBeNull();
})

test('should render only total pages in view after next', () => {
    const pageChanged = jest.fn()
    const { getByTestId, queryByTestId } = render(
        <PaginationControl page={2} pageSize={2} totalItems={4}
            maxPageControls={3}
            onPageChange={pageChanged} />)

    expect(getByTestId('page-1-button')).toBeVisible();
    expect(getByTestId('page-2-button')).toBeVisible();
    expect(queryByTestId('page-3-button')).toBeNull();
})

test('should call pageChange on clicking first page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={2} pageSize={2} totalItems={4}
            maxPageControls={3}
            onPageChange={pageChanged} />)
    fireEvent.click(getByTestId('first-page'))
    expect(pageChanged).toHaveBeenCalledWith(1)
})
test('should call pageChange on clicking previous page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={3} pageSize={2} totalItems={6}
            maxPageControls={3}
            onPageChange={pageChanged} />)
    fireEvent.click(getByTestId('previous-page'))
    expect(pageChanged).toHaveBeenCalledWith(2)
})

test('should call pageChange on clicking last page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={2} pageSize={2} totalItems={6}
            maxPageControls={3}
            onPageChange={pageChanged} />)
    fireEvent.click(getByTestId('last-page'))
    expect(pageChanged).toHaveBeenCalledWith(3)
})
test('should call pageChange on clicking next page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={2} pageSize={2} totalItems={8}
            maxPageControls={3}
            onPageChange={pageChanged} />)
    fireEvent.click(getByTestId('next-page'))
    expect(pageChanged).toHaveBeenCalledWith(3)
})

test('should call pageChange on clicking specific page', () => {
    const pageChanged = jest.fn()
    const { getByTestId } = render(
        <PaginationControl page={2} pageSize={2} totalItems={8}
            maxPageControls={3}
            onPageChange={pageChanged} />)
    fireEvent.click(getByTestId('page-3-button'))
    expect(pageChanged).toHaveBeenCalledWith(3)
})
