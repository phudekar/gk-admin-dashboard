import React from 'react';
import styles from './searchBox.module.css'

function SearchBox({ placeholder = "Search", onSearch }: SearchBoxProps) {
    return (
        <input className={styles.input} type="text" placeholder={placeholder}
            onChange={e => onSearch(e.target.value)} />
    )
}

export type SearchBoxProps = {
    placeholder?: string,
    onSearch: (a: string) => any
}

export default SearchBox;