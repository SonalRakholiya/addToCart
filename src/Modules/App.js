import React from 'react'
import Header from './Header';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Cart from './Cart';
const App = () => {

    return (
        <Container >
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/Cart" component={Cart} />
                </Switch>
            </Router>
        </Container>
       

    )
}
export default App
