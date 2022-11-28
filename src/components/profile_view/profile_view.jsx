import React, {useState} from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './profile_view.scss'

import {Container, Form, Card, CardGroup, Row, Col, Button} from 'react-bootstrap';

export class  ProfileView extends React.Component{
    constructor(){

        super()
        this.state = {
            username: localStorage.getItem('user'),
            email: null,
            favrioteMovies: [],
            birth: null
        }
    }
    componentDidMount(){
        this.getUser();
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        function getConfirmation() {
            var retVal = confirm("Your user values are going to be updated. Continue?");
            if( retVal == true ) {
                console.log("change user values");

            } else {
                console.log('User has decline changes');

            }
         }

    };
    
    getUser(){
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.get(`https://new-super-flix.herokuapp.com/users/${username}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response =>{
            // const data = response.data;
            // console.log (data);
            this.setState({
                username: response.data.username,
                email: response.data.email,
                birth: response.data.birth,
                favoriteMovies: response.data.FavoriteMovies
            })
        })
        .catch(function(e){
            console.log(e);
        })
    }
    
    render(){
        
        console.log(this.state);
        const{username, email, favoriteMovies, birth} = this.state;

        return(
            <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card style = {{marginTop: 100, marginBottom: 50, width: '100px'}}>
                            <Card.Body>
                                <Card.Title style ={{textAlign: 'center', fontSize: '2rem'}}>User information: </Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label> Username: </Form.Label>
                                        <Form.Control
                                            defaultValue = {username}
                                            type = "text"
                                            onChange = {this.username}
                                        />
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        Password:
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control
                                            defaultValue = {email}
                                            type = "text"
                                            onChange = {this.state.email}
                                        />
                                    </Form.Group>
                                    <Form.Group style = {{marginTop: '10px'}}>
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control
                                        defaultValue = {birth}
                                        type = "date"
                                        onChange = {this.state.birth}
                                        />
                                    </Form.Group>
                                    <Button style = {{marginTop: '10px'}} variant = "primary" type = "submit" onClick = {this.handleSubmit}> Update </Button>
                                </Form>
                            
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
        );
    }
 
}