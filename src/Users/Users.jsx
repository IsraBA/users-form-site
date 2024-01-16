import React from 'react'
import styles from './Users.module.css';
import SingleUser from './SingleUser';

export default function Users({ users }) {
    return (
        <div className={styles.users}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => <SingleUser key={user.id} user={user} />)}
                </tbody>
            </table>
        </div>
    )
}
