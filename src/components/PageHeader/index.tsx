import React from 'react';
import styles from './pageHeader.module.css'

const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <div className={styles.header}>
            <h2> {title}</h2>
        </div>
    )
}

export type PageHeaderProps = {
    title: string
}

export default PageHeader;