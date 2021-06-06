import React from 'react';

const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <div>
            {title}
        </div>
    )
}

export type PageHeaderProps = {
    title: string
}

export default PageHeader;