import React, {useState} from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import './registration_view.scss';

import {Container, Form, Card, CardGroup, Row, Col, Button} from 'react-bootstrap';

export function RegistrationView (props) {
    const [newUsername, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState ('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    //Declaring the hooks for the autentification
    const[newNewUsernameErr, setNewUsernameErr] = useState('');
    const[passwordErr, setPasswordErr] = useState('');
    const[password2Err, setPassword2Err] = useState('');
    const[emailErr, setEmailErr] = useState('');

    const validate = () =>{
        let isReq = true;
        if(!newUsername){
            setNewUsernameErr('Username is required');
            isReq = false;
        }else if(newUsername.length < 2){
            setNewUsernameErr('Username must be, at least, 2 characters long');
            isReq = false;
        }if(!password){
            setPasswordErr('Password is required');
            isReq = false;
        }else if(password.length < 6){
            setPasswordErr('Password must be 6 characters long');
        }if(password2 !== password){
            setPassword2Err('Passwords must match');
        }if(email.indexOf('@') === -1){
            setEmailErr('The emails does not look like an email');
        }
        return isReq;
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            // console.log(newUsername, password, email, birth);
            // axios.post('https://new-super-flix.herokuapp.com/users',{
            axios.post('https://localhost:8080/users',{

                username: newUsername,
                password: password,
                email: email,
                birthday: birth
            })
            .then(response =>{
                const data = response.data;
                console.log(data);
                console.log(props)
                // props.onRegistered(data);
                alert('Registration successful, please login!');
                window.open('/','_self');
            })
            .catch(e =>{
                console.log(e);
                console.error('Something has gone wrong');
                alert('Unable to register');
            });
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <div>
                        <p>Name: this.state.username</p>
                        <p>e-mail: this.state.username</p>
                    </div>
                    <CardGroup>
                        <Card style = {{marginTop: 100, marginBottom: 50, width: '100px'}}>
                            <Card.Body>
                                <Card.Title style ={{textAlign: 'center', fontSize: '2rem'}}>Registration: </Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label> Username: </Form.Label>
                                        <Form.Control
                                            type = "text" 
                                            value = {newUsername} 
                                            onChange = {e => setUsername (e.target.value)}
                                            required
                                            placeholder = "Enter a username here"
                                            />
                                            {newNewUsernameErr && <p>{newUsernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        Password:
                                        <Form.Control
                                            type = "password"
                                            value = {password}
                                            onChange = {e => setPassword (e.target.value)}
                                            required
                                            minLength = "8"
                                            placeholder = "Enter your passoword"
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        <Form.Control
                                            type = "password"
                                            value = {password2}
                                            onChange = {e => setPassword2 (e.target.value)}
                                            required
                                            minLength = "8"
                                            placeholder = "Repeat your passoword"
                                        />
                                        {password2Err && <p>{password2Err}</p>}
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control
                                            type = "text"
                                            value = {email}
                                            onChange = {e => setEmail (e.target.value)} 
                                            required
                                        />
                                        {emailErr && <p>{emailErr}</p>}
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control
                                            type = "date"
                                            value = {birth}
                                            onChange = {e => setBirth(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button style = {{marginTop: '10px'}} variant = "primary" type = "submit" onClick = {handleSubmit}> Register now</Button>
                                    <a href = "" onClick = {props.onRegistration}> Already registered ?</a>
                                
                                </Form>
                            
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
        
    );
}

RegistrationView.propTypes = {
    register: propTypes.shape({
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired,
        email: propTypes.string.isRequired
    }),
};
