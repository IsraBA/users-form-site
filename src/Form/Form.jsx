import { useState } from 'react';
import styles from './Form.module.css';

export default function Form({ users, setUsers }) {

    const initialState = localStorage.user ? JSON.parse(localStorage.user) : { fName: '', lName: '', email: '', password: '' };
    const [formState, setFormState] = useState(initialState);
    const [formError, setFormError] = useState({ fName: '', lName: '', email: '', password: '' })
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;


    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formError).every((value) => !value.trim())) {
            // Object.entries(formState).forEach(([key, value]) => console.log(`${key}: ${value}`));
            let newUsers = [...users, formState];
            console.log(newUsers);
            setUsers(newUsers);
            setFormState({ fName: '', lName: '', email: '', password: '' })
        }
    };

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        const { name, value } = e.target;

        setFormState(oldForm => {
            const newData = { ...oldForm, [name]: value }
            localStorage.user = JSON.stringify({ ...newData, password: '' });
            return newData;
        });

        setFormError(oldForm => ({ ...oldForm, [name]: '' }));

        if (name === 'password' && !passwordRegex.test(value) && value.length !== 0) {
            setFormError(oldForm => ({ ...oldForm, [name]: '* Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one number. Special characters are optional.' }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setFormError(oldForm => ({ ...oldForm, [name]: '' }));

        if (name === 'fName' && value.length < 2 && value.length !== 0) {
            setFormError(oldForm => ({ ...oldForm, [name]: '* First name must be at least 2 letters' }));
        }
        if (name === 'lName' && value.length < 2 && value.length !== 0) {
            setFormError(oldForm => ({ ...oldForm, [name]: '* Last name must be at least 2 letters' }));
        }
        if (name === 'email' && !emailRegex.test(value) && value.length !== 0) {
            setFormError(oldForm => ({ ...oldForm, [name]: '* please enter a valid email address' }));
        }
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Add new user</h2>
            <div className={styles.inputBox}>
                <label>First Name: &nbsp;</label>
                <input type="text" name='fName'
                    onChange={handleChange}
                    value={formState.fName}
                    onBlur={handleBlur}
                    required />
                <div className={`${styles.error} ${formError.fName ? styles.vis : ''}`}>{formError.fName}</div>
            </div>
            <div className={styles.inputBox}>
                <label>Last Name: &nbsp;</label>
                <input type="text" name='lName'
                    onChange={handleChange}
                    value={formState.lName}
                    onBlur={handleBlur}
                    required />
                <div className={`${styles.error} ${formError.lName ? styles.vis : ''}`}>{formError.lName}</div>
            </div>
            <div className={styles.inputBox}>
                <label>Email: &nbsp;</label>
                <input type="email" name='email'
                    onChange={handleChange}
                    value={formState.email}
                    onBlur={handleBlur}
                    required />
                <div className={`${styles.error} ${formError.email ? styles.vis : ''}`}>{formError.email}</div>
            </div>
            <div className={styles.inputBox}>
                <label>Password: &nbsp;</label>
                <input type="password" name='password'
                    onChange={handleChange}
                    value={formState.password}
                    required />
                <div className={`${styles.error} ${formError.password ? styles.vis : ''}`}>{formError.password}</div>
            </div>
            <button className={styles.submit} type="submit">Create user</button>
        </form>
    )
}




{/* 
        ^__^
        (oo)\_______
        (__)\       )\/\
            ||----w |
            ||     ||
*/}
