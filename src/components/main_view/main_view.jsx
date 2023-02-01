
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { Navigationbar } from '../navbar/navbar';
import { LoginView } from '../login_view/login_view';
import { RegistrationView } from '../registration_view/registration_view';
import { MovieCard } from '../movie_card/movie_card';
import { MovieView } from '../movie_view/movie_view';
import { DirectorView } from '../director_view/director_view';
import { GenreView } from '../genre_view/genre_view';
import { ProfileView } from '../profile_view/profile_view';
import { FavoriteMovies } from '../profile_view/FavoriteMovies';
import './main_view.scss';



import { Container, Row, Col, Button} from 'react-bootstrap';


export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user:localStorage.getItem('user'),
                register: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    //this function will be deprecated with routing
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(authData){
        console.log(authData);
        this.setState({
            user: authData.user.username,
            register: authData.user.username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    //This function will be deprecated with the client side routing
    onRegistered(authData){
        console.log(authData);
        this.setState({
            register: authData.username,
            user: authData.username,
        });
    }

    //This function will be deprecated with the client side routing
    toggleRegisterView(e){
        e.preventDefault();
        this.setState({
            registered: !this.state.registered,
            user: !this.state.user
        });
    }

    getMovies(token) {
       
        // axios.get('https://new-super-flix.herokuapp.com/movies', {
        axios.get('http://localhost:8080/movies', {
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

    render() {
        //Selected movies and register will be deprecated when using client side routing
        const {movies, selectedMovie, user, register} = this.state;

        
        return (
            <Router>
                <Navigationbar user = {user}/>
                <Container> 
                    <Row className = "main-view justify-content-md-center">
                        <Route exact path = "/" render = {() =>{
                            //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passsed as a prop to the loginView
                            if(!user) return <Col>
                                <LoginView movies = {movies} onLoggedIn = {user => this.onLoggedIn(user)}/>
                            </Col>
                            //Before the movies have been loaded
                            if(movies.length === 0) return <div className = "main-view" />;
                            return movies.map(movie => (
                            <Col md = {3} key = {movie._id}>
                                <MovieCard movieData = {movie} />
                            </Col>
                        ))
                        }} />
                        <Route path = "/register" render = {() => {
                            if(user) return <Redirect to ="/"/>
                            return <Col lg = {8} md = {8}>
                                <RegistrationView/>
                            </Col>
                        }}/>
                       <Route path = "/movies/:movieId" render = {({match, history}) =>{
                            if(!user) return <Redirect to ="/"/>
                            return <Col  md = {8}>
                                {/* console.log(movies); */}
                               <MovieView movieData = {movies.find(movie => movie._id === match.params.movieId)} onBackClick ={() => history.goBack()}/>
                          </Col>
                        }}/>
                        <Route path ="/directors/:name" render = {({match, history}) =>{
                            if(!user) return <Redirect to ="/"/>
                            return <Col>
                                <DirectorView director = {movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick ={() => history.goBack()}/>
                            </Col>
                        }}/>
                        <Route path ="/genres/:name" render = {({match, history}) =>{
                            if(!user) return <Redirect to ="/"/>
                            return <Col>
                                <GenreView genre = {movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick ={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route path = {`/users/${user}`} render = {({match, history}) =>{
                            if(!user) return <Redirect to = "/"/>
                            return <Col>
                                <ProfileView movieData = {movies} user = {user} onBackClick = {() => history.goBack()}/>
                            </Col>
                        }}/>
                        <Route path = {`/user-update/${user}`} render = {({match, history}) =>{
                            if(!user) return <Redirect to = "/"/>
                            return <Col>
                                <UserUpdate user = {user} onBackClick ={() => history.goBack()}/>
                            </Col>
                        }}
                        />

                    </Row>
                </Container>
            </Router>        
        );
    }
}

