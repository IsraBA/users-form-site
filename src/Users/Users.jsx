import React from 'react'
import styles from './Users.module.css';

export default function Users({ users }) {
    return (
        <div className={styles.users}>
            <table>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
                {users.map((user, i) => {
                    return (
                    <tr key={user.fName + user.lName}>
                        <td>{i + 1}</td>
                        <td>{user.fName}</td>
                        <td>{user.lName}</td>
                        <td>{user.email}</td>
                    </tr>
                    )
                })}
            </table>
        </div>
    )
}
