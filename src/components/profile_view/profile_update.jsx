import React from 'react';

import {Container, Form, Card, CardGroup, Row, Col, Button} from 'react-bootstrap';

function ProfileUpdate ({}){
    <Row className = "user-profile-info">
            <Col>
                <CardGroup>
                    <Card style = {{marginTop: 100, marginBottom: 50}}>
                        <Card.Body>
                            <Card.Title style ={{textAlign: 'center', fontSize: '2rem'}}>User information: </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label> Username: </Form.Label>
                                    <Form.Control
                                        defaultValue = {username}
                                        type = "text"
                                        onChange={(e) => this.setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group style = {{marginTop: '10px'}}>
                                    Current Password*:
                                    <Form.Control
                                    type = "password"
                                    onChange={(e) => this.setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group style = {{marginTop: '10px'}}>
                                    New Password:
                                    <Form.Control
                                    type = "password"
                                    onChange={(e) => this.setNewPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group style = {{marginTop: '10px'}}>
                                    Repeat the Password:
                                    <Form.Control
                                    type = "password"
                                    onChange={(e) => this.setNewPassword2(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group style = {{marginTop: '10px'}}>
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control
                                        defaultValue = {email}
                                        type = "text"
                                        onChange = {(e) => this.setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group style = {{marginTop: '10px'}}>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control
                                    defaultValue = {birth}
                                    type = "date"
                                    onChange = {(e) => this.setBirth(e.target.value)}
                                    />
                                </Form.Group>
                                <Button style = {{marginTop: '10px'}} variant = "primary" type = "submit" onClick = {this.handleSubmit}> Update profile </Button>
                                <Button style = {{marginTop: "10px", marginLeft: "30px"}} variant = "danger" onClick = {this.deleteUser} >Delete User </Button>
                            </Form>
                        
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>

}
export default ProfileUpdate;