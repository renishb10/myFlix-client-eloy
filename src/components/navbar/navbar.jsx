import React, {useState} from 'react';
import './navbar.scss';

import {Container, Nav, Navbar, Button} from 'react-bootstrap';

export function Navbar ({user}) {
    
    const onLoggedOut = () => {
        window.localStorage.clear();
        window.open('/', "_self");
    };

    const isAuth = () =>{
        if(typeof window == "undefined"){
            return false;
        }
        if(localStorage.getItem('token')){
            return localStorage.getItem('token');
        }else{
            return false;
        }
    };


    

    return(
        <Navbar className = "main-nav" sticky = "top" bg = "dark" expand = "lg" variant = 'dark'>
            <Container>
                <Navbar.Brand className = 'navbar-logo' href ='/'>New Super Flix </Navbar.Brand>
                <Navbar.Toggle aria-controls = 'responsive-navbar-nav'/>
                <Navbar.Collapse id = 'responsive-navbar-nav'>
                    <Nav className = "ml-auto">
                        <Nav.Link href = '/'> Home </Nav.Link>
                        {isAuth() && (<Nav.Link href = {`/users/${user}`}> Profile</Nav.Link>
                        )}
                        {isAuth() && (<Button variant = "primary" onClick = {() => {onLoggedOut()}}> Logout</Button>
                        )}
                        {!isAuth() && (<Nav.Link href = "/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (<Nav.Link href = "/register">Create New account</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};