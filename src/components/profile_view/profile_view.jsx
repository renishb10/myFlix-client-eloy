import React, {useState} from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './profile_view.scss'
import UserInfo from './user_info';
import ProfileUpdate from './profile_update';

import { MovieCard } from '../movie_card/movie_card';

import {Container, Form, Card, CardGroup, Row, Col, Button} from 'react-bootstrap';

export class  ProfileView extends React.Component{
    constructor(){

        super()
        this.state = {
            username: localStorage.getItem('user'),
            newUsername: null,
            email: null,
            favoriteMovies: [],
            fullFavs:[],
            movies:[],
            birth: null,
            password: null,
            newPassword: null,
            newPassword2: null

        }
    }
    componentDidMount(){
        this.getUser();
    }

    getConfirmation(message) {
        var retVal = confirm(message);
        if( retVal === true ) {
           return true;
        } else {
           return false;
        }
     }

     validate(){
        // console.log(this.state.newPassword);
        // console.log(this.state.newPassword2);

        if(this.state.newPassword === this.state.newPassword2 && this.state.newPassword !== (null || undefined)){
            this.setState({
                password: this.state.newPassword
            })
        };
        if(this.state.newUsername && this.state.newUsername !== localStorage.getItem('user')){
            this.setState({
                username: this.state.newUsername
            })
        };
        //We can implement here further validation protocols
        return true;
     };

    handleSubmit = (e) => {
        e.preventDefault();
        const isReq = this.validate();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const userConfirm = confirm("Your user values are going to be updated. Continue?");

        if(isReq && userConfirm){
            // console.log(userConfirm);
            // console.log("blablabla");
            console.log(this.state.username);
            console.log(this.state.newPassword);
            console.log(this.state.email);
            console.log(this.state.birth);
            if(this.state.birth){
                // axios.put(`https://new-super-flix.herokuapp.com/users/${user}`,{
                axios.put(`https://localhost:8080/users/${user}`,{
                    username: this.state.username,
                    password: this.state.newPassword,
                    email: this.state.email,
                    birthday: this.state.birth
                }, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                .then(response => {
                    console.log(response.data);
                    // localStorage.setItem("user", this.state.username);
                    // window.open(`/users/${localStorage.getItem('user')}`, "_self");
                    // alert("Your user information has been updated");
                })
                .catch(function (e){
                    console.log(e);
                });
            }else{
                // axios.put(`https://new-super-flix.herokuapp.com/users/${user}`,{
                axios.put(`https://localhost:8080/users/${user}`,{

                    username: this.state.newUsername,
                    password: this.state.newPassword,
                    email: this.state.email,
                }, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem("user", this.state.username);
                    window.open(`/users/${localStorage.getItem('user')}`, "_self");
                    alert("Your user information has been updated");
                })
                .catch(function (e){
                    console.log(e);
                });
            }
        } else {
            console.log('User has decline changes');
            window.open(`/users/${user}`,"_self");
        }
    };



    setUsername(value){
        this.setState({
            username:value,
        })
    }

    getMovies(token) {
       
        // axios.get('https://new-super-flix.herokuapp.com/movies', {
        axios.get('https://localhost:8080/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response =>{
            //Assign the result to the state
            this.setState({
                movies:response.data
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    setPassword(value){
        this.setState({
            password: value,
        })
    }

    setNewPassword(value){
        this.setState({
            newPassword: value,
        })
    }

    setNewPassword2(value){
        this.setState({
            newPassword2: value,
        })
    }

    setEmail(value){
        this.setState({
            email: value,
        })
    }

    setBirth(value){
        this.setState({
            birth: value,
        })
    }

    deleteUser(){
        const conf = confirm("Are you sure you want to delete all your data?");
        if(conf){
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            // axios.delete(`https://new-super-flix.herokuapp.com/users/${user}`,{
            axios.delete(`https://localhost:8080/users/${user}`,{
            
                headers: {Authorization: `Bearer ${token}`}
                }).then(response =>{
                alert("your data has been succesfully removed");
                localStorage.clear();
                window.open("/","_self");

            }).catch(function(e) {
                console.log(e);
            });
        }else{
            console.log("User has declined deleting his data");
        }

    }

    RemoveFavorite(id){
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
    // axios.delete(`https://new-super-flix.herokuapp.com/users/${user}/movies/${id}`,
    axios.delete(`https://localhost:8080/users/${user}/movies/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((response) => {
        alert("Movie has been removed from favorites.");
        this.componentDidMount();
      })
      .catch(function (e) {
        console.log(e);
      });


    }
    
    getUser(){
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        // axios.get(`https://new-super-flix.herokuapp.com/users/${username}`, {
        axios.get(`https://localhost:8080/users/${username}`, {    
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response =>{
            const data = response.data[0];
            // console.log (response.data);
            if (data.birth){
                this.setState({
                    username: data.username,
                    email: data.email,
                    birth: data.birth.substring(0, 10),
                    favoriteMovies: data.FavoriteMovies
                })
            }else{
                this.setState({
                    username: data.username,
                    email: data.email,
                    favoriteMovies: data.FavoriteMovies
                })

            }
        })
        .catch(function(e){
            console.log(e);
        })

    }
    
    render(){
        
        // console.log(this.state);
        const {movieData} = this.props;
        const{username, email, favoriteMovies, birth} = this.state;

        const favMoviesList = [];
        if(favoriteMovies.length > 0){
            // console.log(favoriteMovies);
            movieData.forEach(movie=>{
                // console.log(movie._id);
                if(favoriteMovies.includes(movie._id)){
                  favMoviesList.push(movie);
                }
            })
            // console.log(favMoviesList);
        }


            return(
                <Container>
                    
                    <Row className = "user-profile-info">
                        <Col xs = {12} sm ={4} >
                            <Card style = {{ marginTop: 100, padding: "10px"}}>
                                <UserInfo name = {this.state.username} email = {this.state.email}/>
                            </Card>
                        </Col>
                        <Col xs = {12} sm = {8}>

                            <CardGroup>
                                <Card style = {{marginTop: 100, marginBottom: 50}}>
                                    <Card.Body>
                                        <Card.Title style ={{textAlign: 'center', fontSize: '2rem'}}>User update: </Card.Title>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label> Username: </Form.Label>
                                                <Form.Control
                                                    defaultValue = {username}
                                                    type = "text"
                                                    onChange={(e) => this.setUsername(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group style = {{marginTop: '10px'}}>
                                                Current Password*:
                                                <Form.Control
                                                type = "password"
                                                onChange={(e) => this.setPassword(e.target.value)}
                                                required
                                                />
                                            </Form.Group>
                                            <Form.Group style = {{marginTop: '10px'}}>
                                                New Password:
                                                <Form.Control
                                                type = "password"
                                                onChange={(e) => this.setNewPassword(e.target.value)}
                                                required
                                                />
                                            </Form.Group>
                                            <Form.Group style = {{marginTop: '10px'}}>
                                                Repeat the Password:
                                                <Form.Control
                                                type = "password"
                                                onChange={(e) => this.setNewPassword2(e.target.value)}
                                                required
                                                />
                                            </Form.Group>
                                            <Form.Group style = {{marginTop: '10px'}}>
                                                <Form.Label>Email: </Form.Label>
                                                <Form.Control
                                                    defaultValue = {email}
                                                    type = "text"
                                                    onChange = {(e) => this.setEmail(e.target.value)}
                                                    required
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
                    <Row className = "favorite-movies-title">
                        <h3 style ={{marginTop: "20px", marginBottom: "5px"}}>List of your favorite Movies: </h3>
                    </Row>
                    <Row className = "favorite-movies-list">
                        {favMoviesList.map(movie => (
                            <Col key = {movie.id} md = {3}>
                                <MovieCard key = {movie.id} movieData = {movie}  onMovieClick = {(movie) => {this.setSelectedMovie (movie)}}/>
                                <Button className="remove-button" variant="secondary" onClick={()=>{this.RemoveFavorite(movie._id)}}>Remove from favorites </Button>
                            </Col>
                            
                        ))}
                    </Row>
                </Container>
            );
        
    }
 
}