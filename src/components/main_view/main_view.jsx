
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login_view/login_view';
import { RegistrationView } from '../registration_view/registration_view';
import { MovieCard } from '../movie_card/movie_card';
import { MovieView } from '../movie_view/movie_view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col';
											



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
        axios.get('https://new-super-flix.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies:response.data
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user){
        this.setState({
            user,
            register: user
        });
    }
    onRegistered(register){
        this.setState({
            register,
            user: register
        });
    }
    toggleRegisterView(e){
        e.preventDefault();
        this.setState({
            registered: !this.state.registered,
            user: !this.state.user
        });
    }

    /*onRegistration(newUser){
        this.setState({
            newUser
        });
    }*/

    render() {
        const {movies, selectedMovie, user, register} = this.state;
     
        console.log (register,user)
        //If there is no user we return the log in view
        if(!user) return <LoginView onLoggedIn = {user => this.onLoggedIn(user)} onRegistration = {(e) => this.toggleRegisterView(e)}/>;
        // if(!user) return <RegistrationView onRegistration = {user => this.onRegistrated(user)}/>;

        if(!register) return <RegistrationView onRegistered = {user => this.onRegistered(user)} onRegistration = {(e => this.toggleRegisterView(e))}/>

       /*//If newUser == 1 
        if(newUser) return <RegistrationView onRegistration = {user => this.onRegistrated(user)} />
        */
        
        //If there is user, we retunn a different view depending on if movies have been loaded or if a movie is selected
        if(movies.lenght === 0){
            return <div className = "main-view" />;
        }
        
        return (
            <Container className = "main-view">
                { selectedMovie
                    ? (
                        <Row className = "justify-content-md-center">
                            <Col  md = {8}>
                                <MovieView movieData = {selectedMovie} onBackClick = {newSelectedMovie =>{ this.setSelectedMovie(newSelectedMovie);}}/>
                            </Col>
                        </Row>
                    )
                    : (
                        <Row className = "justify-content-md-center"> 
                            {movies.map(movie => (
                                <Col md = {3}>
                                    <MovieCard key = {movie._id} movieData = {movie}  onMovieClick = {(movie) => {this.setSelectedMovie (movie)}}/>
                                </Col>
                            ))}
                        </Row>
                    )
                }        
            </Container>        
        );
    }
}

