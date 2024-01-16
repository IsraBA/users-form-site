import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styles from './SingleUser.module.css';
import { useNavigate } from 'react-router-dom';

export default function SingleUser({ user }) {

    const nav = useNavigate();

    return (
            <tr>
                <td>{user.id}</td>
                <td>{user.fName}</td>
                <td>{user.lName}</td>
                <td>{user.email}</td>
                <td id={styles.edit} onClick={() => nav('/editUser/' + user.id)}>
                <FontAwesomeIcon icon={faPenToSquare} /></td>
            </tr>
    )
}
