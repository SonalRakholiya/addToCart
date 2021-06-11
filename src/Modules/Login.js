import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import "./css/App.css";
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { Link, useHistory } from "react-router-dom";
const Login = (props) => {
    const history = useHistory()
    const [user, setUser] = useState({ userName: '', Password: '' })
    const [isError, setIsError] = useState(false)
    const [isValidate, setIsValidate] = useState({ userName: '', Password: '' })
    const HandleLogin = (e) => {
        e.preventDefault();
        debugger
        console.log(e.target);
        if (user.userName === "" || user.Password === "") {

            setIsError(true);
        }
        else {
            sessionStorage.setItem('userName', e.target.userName.value);
            sessionStorage.setItem('Password', e.target.Password.value);
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

        if (name === 'Password') {

            if (value.length <= 8) {
                setIsValidate({ ...isValidate, Password: 'Password have minimum 8 characters' })
            }
            else if (value !== props.Password) {
                setIsValidate({ ...isValidate, Password: 'Invalid Password' })
            }
            else {
                setIsValidate({ ...isValidate, Password: '' })
            }
        }
        if (name === 'userName') {
            if (!validator.isEmail(value)) {
                setIsValidate({ ...isValidate, userName: 'Invalid Email Address' })
            }
            else if (value !== props.userName) {
                setIsValidate({ ...isValidate, userName: 'Invalid User Name' })
            }
            else {
                setIsValidate({ ...isValidate, userName: '' })
            }
        }

    }
    return (
        <Container>
            <div className="row w-100 h-100 divBox ">
                <div className="login" >
                    <div className='col-md-12'>
                        <Form className="needs-validation" onSubmit={(e) => HandleLogin(e)} noValidate>
                            <div className='header'>  <h1 className="text-center">Login</h1></div>
                            <div className='col-md-12'>
                                <Form.Group className='txtInput'>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Email"
                                        name='userName'
                                        value={user.userName}
                                        onChange={(e) => handleChange(e)}
                                    ></Form.Control>
                                    {isError && !user.userName && <div className="errorMsg">Please Enter UserName</div>}
                                    {isError && user.userName && isValidate.userName !== '' && <div class="errorMsg" >{isValidate.userName}</div>}
                                </Form.Group>
                            </div>
                            <div className='col-md-12'>
                                <Form.Group className='txtInput'>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        value={user.Password}
                                        name='Password'
                                        onChange={(e) => handleChange(e)}
                                    ></Form.Control>
                                    {isError && !user.Password && <div class="errorMsg">Please enter Password</div>}
                                    {isError && user.Password && isValidate.Password !== '' && <div class="errorMsg">{isValidate.Password}</div>}
                                </Form.Group>
                            </div>
                            <div className='col-md-12 btnAlign'>
                                <Button className="btnSubmit" type="submit" id="btnLogin">Login</Button>
                            </div>
                            <div className='col-md-12 lbl'>
                                <div>Do you have Account ?  <Link  onClick={() => history.push('/register')}>Register</Link></div>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </Container>

    )
}
export default Login