import React, {useState} from 'react';

import {Container, Form, Card, CardGroup, Row, Col, Button} from 'react-bootstrap';

export function RegistrationView (props) {
    
    const [newUsername, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState ('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newUsername, password, email, birth);
        props.onRegistered(newUsername)
    }

    return(
        <Container>
            <Row>
                <Col>
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
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control
                                            type = "text"
                                            value = {email}
                                            onChange = {e => setEmail (e.target.value)} 
                                            required
                                        />
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