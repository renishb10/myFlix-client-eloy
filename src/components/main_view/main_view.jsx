
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login_view/login_view';
import { MovieCard } from '../movie_card/movie_card';
import { MovieView } from '../movie_view/movie_view';



export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
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
            user
        });
    }

    render() {
        const {movies, selectedMovie, user} = this.state;
        
        //If there is no user we return the log in view
        if(!user) return <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>;

        //If there is user, we retunn a different view depending on if movies have been loaded or if a movie is selected
        if(movies.lenght === 0){
            return <div className = "main-view" />;
        }
        
        return (
            <div className = "main-view">
                { selectedMovie
                    ? <MovieView movieData = {selectedMovie} onBackClick = {newSelectedMovie =>{ this.setSelectedMovie(newSelectedMovie);}}/>
                    : movies.map(movie => (
                        <MovieCard key = {movie._id} movieData = {movie}  onMovieClick = {(movie) => {this.setSelectedMovie (movie)}}/>
                    ))
                }        
            </div>        
        );
    }
}

