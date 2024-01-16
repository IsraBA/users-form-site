import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from '../Form/Form.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


export default function EditUser({ setUsers }) {

    let { id } = useParams();
    const nav = useNavigate();

    const [formState, setFormState] = useState({});
    const [formError, setFormError] = useState({ fName: '', lName: '', email: '', password: '', id: '' })
    const [error, setError] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

    // מילוי השדות אוטומטית בפרטי המשתמש על פי מה שהיה
    useEffect(() => {
        axios.get('http://localhost:2500/user/' + id)
            .then((response) => setFormState(response.data))
    }, [])


    const clearForm = () => {
        setFormState({ fName: '', lName: '', email: '', password: '' });
        localStorage.user = ""
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formError).every((value) => !value.trim())) {
            axios.put('http://localhost:2500/user/' + id, formState)
                .then(() => {
                    return axios.get('http://localhost:2500/user');
                })
                .then((response) => {
                    setUsers(response.data);
                    nav('/');
                })
                .catch((error) => {
                    setError(error.response?.data);
                });
        }
    };

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        const { name, value } = e.target;

        setFormState(oldForm => {
            const newData = { ...oldForm, [name]: value }
            return newData;
        });

        setFormError(oldForm => ({ ...oldForm, [name]: '' }));

        if (name === 'email') {
            setError(false);
        }

        if (name === 'password' && !passwordRegex.test(value) && value.length !== 0) {
            setFormError(oldForm => ({ ...oldForm, [name]: '* Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one number. Special characters are optional.' }));
        }
        
        if (name === 'id' && value.length !== 8 && value.length !== 0) {
            setFormError(oldForm => ({ ...oldForm, [name]: '* ID must 8 digits' }));
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
            <h2>Update user</h2>
            <div className={styles.inputBox}>
                <label>ID: &nbsp;</label>
                <input type="number" name='id'
                    max="99999999"
                    onChange={handleChange}
                    value={formState.id}
                    onBlur={handleBlur}
                    required />
                <div className={`${styles.error} ${formError.id ? styles.vis : ''}`}>{formError.id}</div>
            </div>
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
                <div className={`${styles.error} ${error ? styles.vis : ''}`}>{error}</div>
            </div>
            <div className={styles.inputBox}>
                <label>Password: &nbsp;</label>
                <input type="password" name='password'
                    onChange={handleChange}
                    value={formState.password}
                    required />
                <div className={`${styles.error} ${formError.password ? styles.vis : ''}`}>{formError.password}</div>
            </div>
            <button className={styles.submit} type="submit">Update user</button>
        </form>
    )
}
