import React from 'react';

function SearchBox<T>({ data = [], comparer, placeholder = "Search", onSearch }: SearchBoxProps<T>) {
    return (
        <input type="text" placeholder={placeholder}
            onChange={e => {
                const query = e.target.value;
                if (query) {
                    const filteredData = [...data.filter((item: T) =>
                        comparer ? comparer(item, query)
                            : `${item}`.toLowerCase().indexOf(query) >= 0)];
                    onSearch([...filteredData]);
                } else {
                    onSearch([...data])
                }
            }}
        />
    )
}

export type SearchBoxProps<T> = {
    placeholder?: string,
    data?: Array<T>,
    comparer?: (item: any, query: string) => boolean,
    onSearch: (a: Array<T>) => void
}

export default SearchBox;