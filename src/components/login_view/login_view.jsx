
import React, {useState} from 'react';
import propTypes from 'prop-types';

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentification
        // then call props.onLoggedIn(username)
        props.onLoggedIn(username)
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
