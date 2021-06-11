import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Cart from './Cart';
const Header = () => {
    const history = useHistory()
    const [UserInfo, setUserInfo] = useState({ UserName: 'Sonal', Password: '123456789' })
    const handleLogout = () => {
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('Password')
        history.push('/')
    }
    return (
        <Navbar className='headerLbl'>
            <Nav.Link className='headerLable' onClick={() => history.push('/')} UserName={UserInfo.UserName} Password={UserInfo.Password}>Login</Nav.Link>
            <Nav.Link className='headerLable' onClick={() => history.push('/register')}>Register</Nav.Link>
            <Nav.Link className='headerLable' onClick={() => history.push('/cart')}>Cart</Nav.Link>

            <Navbar.Collapse className="justify-content-end">
                <Nav.Link className='headerLable' onClick={() => handleLogout()}>Logout</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
        // <Container >
        //     <Router>
        //         <Navbar className='headerLbl'>
        //             <Nav.Link className='headerLable' onClick={() => history.push('/login')} UserName={UserInfo.UserName} Password={UserInfo.Password}>Login</Nav.Link>
        //             <Nav.Link className='headerLable' onClick={() => history.push('/register')}>Register</Nav.Link>
        //             <Nav.Link className='headerLable' onClick={() => history.push('/cart')}>Cart</Nav.Link>

        //             <Navbar.Collapse className="justify-content-end">
        //                 <Nav.Link className='headerLable' onClick={() => handleLogout()}>Logout</Nav.Link>
        //             </Navbar.Collapse>
        //         </Navbar>
        //         <Switch>
        //             <Route exact path="/login" component={Login} />
        //             <Route exact path="/register" component={Register} />
        //             <Route exact path="/Cart" component={Cart} />
        //         </Switch>

        //     </Router>
        // </Container>
    )
}
export default Header