import { useEffect, useState } from 'react'
import styles from './App.module.css';
import Form from './Form/Form'
import Users from './Users/Users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { NavLink, Route, Routes } from 'react-router-dom';
import EditUser from './EditUser/EditUser';

function App() {

  const [users, setUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:2500/user')
      .then((response) => {
        setUsers(response.data);
      })
  }, [users])


  return (
    <>
      <header>
        <h1><FontAwesomeIcon className={styles.usersIcon} icon={faUserGroup} /> users</h1>
        <span>
          <ul>
            <li>
              <NavLink to="/">
                all users
              </NavLink>
            </li>
            <li>
              <NavLink to="/createUser">
                create user
              </NavLink>
            </li>
          </ul>
        </span>
      </header>
      <main>
        <Routes>
          <Route path='*' element={<Users users={users} />} />
          <Route path='editUser/:id' element={<EditUser setUsers={setUsers}/>} />
          <Route path='createUser' element={<Form users={users} setUsers={setUsers} />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
