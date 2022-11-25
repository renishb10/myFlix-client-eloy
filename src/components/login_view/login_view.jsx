
import React, {useState} from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import './login_view.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function LoginView (props){
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    //Hook declaration for each of the imputs
    const[usernameErr, setUsernameErr] = useState('');
    const[passwordErr, setPasswordErr] = useState('');

    //Function that validates the inputs in the client side of the app
    const validate = () =>{
        let isReq = true;
        if(!username){
            setUsernameErr('Username is required');
            isReq = false;
        }else if(username.length <2){
            setUsernameErr('Username must be, at least, two characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password is required');
            isReq = false;
        }else if(password.length < 6){
            setPasswordErr('Password must be 6 characters long');
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const isReq = validate();
        if (isReq){
            // console.log(username, password);
            // Send a request to the server for authentification
            axios.post('https://new-super-flix.herokuapp.com/login',{
                username: username,
                password: password
            })
            .then(response =>{
                const data = response.data;
                props.onLoggedIn(data);    
            }).catch(e =>{
                console.log('no such user');
            });
        }
    };

    onRegistration = (e) => {
        props.onRegistration(e)
    }
    

    /*onRegistrated(username){
        this.setState({
            username
        });
    }*/

    return(
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card style ={{marginTop: 100, marginBottom: 50, width: '300px'}}>
                            <Card.Body>
                                <Card.Title style ={{textAlign: 'center', fontSize: '2rem'}}>Login</Card.Title>
                                <Form className = 'login-border'>
                                    <Form.Group controlId = "formGroupUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type = "text"
                                        value = {username}
                                        onChange = {e => setUsername(e.target.value)}
                                        required
                                        placeholder = "Enter your username"
                                        />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group style ={{marginTop: '10px'}} controlId = "formGroupPassword">
                                        <Form.Label>Password: </Form.Label>
                                        <Form.Control 
                                        type = "password"
                                        value = {password}
                                        onChange ={e => setPassword(e.target.value)}
                                        required
                                        minLength = "8"
                                        placeholder = "Enter your password"
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <Button style ={{marginTop: '10px'}} variant = "primary" type = "submit" onClick = {handleSubmit}> Submit </Button>
                                    
                                    <a href = "" onClick = {onRegistration}> Not registered yet?</a>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>        
            
        </Container>
        
    );
}

LoginView.propTypes = {
    register: propTypes.shape({
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired
    }),
};