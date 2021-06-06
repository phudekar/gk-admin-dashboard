import React from 'react';
import styles from './editableDropDown.module.css';

const EditableDropDown = ({ data, value, editMode = false, disabled = false, onChange }: DropDownProps) => {
    return editMode
        ? <select className={styles.input} data-testid="dropdown" value={value} disabled={disabled}
            onChange={e => onChange(e.target.value)} >
            {data.map(item => <option key={item}>{item}</option>)}
        </select>
        : <span>{value}</span>
}

export type DropDownProps = {
    value: string | number,
    editMode?: boolean,
    data: Array<string | number>
    disabled?: boolean,
    onChange: (a: string | number) => any
}

export default EditableDropDown;
