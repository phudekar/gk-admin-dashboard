import React from 'react';
import styles from './editableInput.module.css';

const EditableInput = ({ value, editMode = false, disabled = false, onChange }: InputControlProps) => {
    return editMode
        ? <input className={styles.input} data-testid="input" type="text" value={value} disabled={disabled}
            onChange={e => onChange(e.target.value)} />
        : <span>{value}</span>
}

export type InputControlProps = {
    value: string | number,
    editMode?: boolean,
    disabled?: boolean,
    onChange: (a: string) => any
}

export default EditableInput;
