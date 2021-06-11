import React from 'react'
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



const Nav = () => {
    const history = useHistory()
    return (
        <div>
            <button onClick={() => history.push('/login')}>Login</button>
            <button onClick={() => history.push('/register')}>Register</button>
        </div>
    )
}

export default Nav
