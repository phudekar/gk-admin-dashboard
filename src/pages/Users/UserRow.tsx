import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { deleteUsers, deselectUsers, selectUsers, updateUser } from '../../actions/usersActions';
import EditableDropDown from '../../components/EditableDropDown';
import EditableTextInput from '../../components/EditableTextInput';
import { Role, User } from '../../types';
import styles from './users.module.css';

const UserRow = ({ user }: UserRowProps) => {
    const [editMode, setEditMode] = useState(false);
    const [draftUser, setDraftUser] = useState(user);

    const onSelectionChanged = (checked: boolean) => {
        if (checked) {
            selectUsers([user.id]);
        } else {
            deselectUsers([user.id]);
        }
    }

    useEffect(() => {
        setDraftUser(user)
    }, [user])

    return (
        <tr className={`${styles.row} ${user.isSelected ? styles.selectedRow : ''}`}>
            <td>
                <input type="checkbox" checked={user.isSelected}
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
                    value={draftUser.role.toString()} editMode={editMode}
                    onChange={role => setDraftUser({
                        ...draftUser,
                        role: role === Role.Admin.toString() ? Role.Admin : Role.Member
                    })} />
            </td>
            <td>
                {!editMode
                    ? <FontAwesomeIcon className={styles.editButton} icon={faEdit} data-testid={`edit-${user.id}`} onClick={() => {
                        setEditMode(true);
                    }} />
                    : <FontAwesomeIcon className={styles.saveButton} icon={faSave} data-testid={`save-${user.id}`} onClick={() => {
                        setEditMode(false)
                        updateUser(draftUser);
                    }} />
                }
                <FontAwesomeIcon className={styles.deleteButton} icon={faTrash} data-testid={`delete-${user.id}`} onClick={() => deleteUsers([user.id])} />
            </td>
        </tr>
    )
}


export type UserRowProps = {
    user: User,
}

export default UserRow;