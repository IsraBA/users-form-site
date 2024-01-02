import { useState } from 'react'
import styles from './App.module.css';
import Form from './Form/Form'
import Users from './Users/Users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [users, setUsers] = useState(
    [
      { fName: "Alice", lName: "Johnson", email: "alice.johnson@example.com" },
      { fName: "Bob", lName: "Smith", email: "bob.smith@example.com" },
      { fName: "Charlie", lName: "Davis", email: "charlie.davis@example.com" },
      { fName: "David", lName: "Miller", email: "david.miller@example.com" },
      { fName: "Eva", lName: "Williams", email: "eva.williams@example.com" }
    ]    
  )

  return (
    <>
     <header><h1><FontAwesomeIcon className={styles.usersIcon} icon={faUserGroup} /> users</h1></header>
     <main>
      <Form users={users} setUsers={setUsers}/>
      <Users users={users}/>
     </main>
     <footer></footer>
    </>
  )
}

export default App
