import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import EditableDropDown from '../../components/EditableDropDown';
import EditableTextInput from '../../components/EditableTextInput';
import { Role, User } from '../../types';

const UserRow = ({ user, isSelected, onUpdate, onDelete, onSelected, onDeselected }: UserRowProps) => {
    const [editMode, setEditMode] = useState(false);
    const [draftUser, setDraftUser] = useState(user);

    const onSelectionChanged = (checked: boolean) => {
        if (checked) {
            onSelected && onSelected(user.id);
        } else {
            onDeselected && onDeselected(user.id);
        }
    }

    useEffect(() => {
        setDraftUser(user)
    }, [user])

    return (
        <tr>
            <td>
                <input type="checkbox" checked={isSelected}
                    onChange={e => onSelectionChanged(e.target.checked)} />
            </td>
            <td>
                <EditableTextInput value={draftUser.name} editMode={editMode}
                    onChange={name => setDraftUser({ ...draftUser, name })} />
            </td>
            <td>
                <EditableTextInput value={draftUser.email} editMode={editMode}
                    onChange={email => setDraftUser({ ...draftUser, email })} />
            </td>
            <td>
                <EditableDropDown data={[Role.Admin, Role.Member]}
                    value={draftUser.role} editMode={editMode}
                    onChange={role => setDraftUser({
                        ...draftUser,
                        role: role === Role.Admin.toString() ? Role.Admin : Role.Member
                    })} />
            </td>
            <td>
                {!editMode
                    ? <FontAwesomeIcon icon={faEdit} data-testid={`edit-${user.id}`} onClick={() => {
                        setEditMode(true);
                    }} />
                    : <FontAwesomeIcon icon={faSave} data-testid={`save-${user.id}`} onClick={() => {
                        setEditMode(false)
                        onUpdate && onUpdate(draftUser);
                    }} />
                }
                <FontAwesomeIcon icon={faTrash} data-testid={`delete-${user.id}`} onClick={() => onDelete && onDelete(user.id)} />
            </td>
        </tr>
    )
}


export type UserRowProps = {
    user: User,
    isSelected?: boolean,
    onUpdate?: (user: User) => any,
    onDelete?: (id: string) => any,
    onSelected?: (id: string) => any,
    onDeselected?: (id: string) => any
}

export default UserRow;