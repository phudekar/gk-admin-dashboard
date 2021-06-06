import React from 'react';

const EditableInput = ({ value, editMode = false, disabled = false, onChange }: InputControlProps) => {
    return editMode
        ? <input data-testid="input" type="text" value={value} disabled={disabled}
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
