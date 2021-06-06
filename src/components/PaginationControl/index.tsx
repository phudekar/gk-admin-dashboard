import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

const PaginationControl = ({ page = 1, pageSize = 10,
    totalItems = 0, maxPageControls = 5,
    onPageChange }: PaginationControlProps) => {
    const additionalPage = !totalItems || !pageSize || totalItems % pageSize !== 0 ? 1 : 0
    const totalPages = (parseInt(totalItems / pageSize + '') || 0) + additionalPage;
    return (
        <div>
            <SpecialButton icon={faAngleDoubleLeft} disabled={page === 1}
                onClick={() => onPageChange(1)} testId="first-page"/>
            <SpecialButton icon={faAngleLeft} disabled={page === 1}
                onClick={() => onPageChange(page - 1)} testId="previous-page"/>

            {new Array(totalPages > maxPageControls ? maxPageControls : totalPages).fill(1)
                .map((_, i) => {
                    const pageNumber = (totalPages > maxPageControls ? page : 1) + i;
                    return <PageButton key={pageNumber}
                        isSelected={pageNumber === page}
                        pageNumber={pageNumber}
                        onClick={onPageChange} />
                })}

            <SpecialButton icon={faAngleRight} disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)} testId="next-page"/>
            <SpecialButton icon={faAngleDoubleRight} disabled={page === totalPages}
                onClick={() => onPageChange(totalPages)} testId="last-page"/>

        </div>
    )
}

const SpecialButton = ({ icon, disabled, testId, onClick }: SpecialButtonPropTypes) => {
    return <button data-testid={testId} disabled={disabled} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
    </button>
}

type SpecialButtonPropTypes = {
    testId?: string,
    icon: IconProp,
    disabled: boolean | undefined,
    onClick: () => void
}

const PageButton = ({ pageNumber, isSelected = false, onClick }: PageButtonProps) => {
    return (
        <button data-testid={`page-${pageNumber}-button`} onClick={() => !isSelected && onClick(pageNumber)} disabled={isSelected}>
            {pageNumber}
        </button>
    )
}

type PageButtonProps = {
    pageNumber: number,
    isSelected?: boolean,
    onClick: (n: number) => void
}

export type PaginationControlProps = {
    page?: number,
    pageSize?: number,
    totalItems?: number,
    maxPageControls?: number,
    onPageChange: (n: number) => void
}

export default PaginationControl;