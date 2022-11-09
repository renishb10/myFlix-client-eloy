
import React from 'react';
import {MovieCard} from '../movie_card/movie_card';
import{MovieView} from '../movie_view/movie_view';


export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Inception', Description: 'description 1....', ImagePath: '...', Genre: 'Thriller', Director: 'Christopher Nolan'},
                {_id: 2, Title: 'Gladiator', Description: 'description 2....', ImagePath: '...', Genre: 'Historical', Director: 'Stieven Spielberg' },
                {_id: 3, Title: 'Silver Linings Playbook', Description: 'description 3....', ImagePath: '...', Genre: 'Drama', Director: 'David O. Russell'}
            ],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const {movies, selectedMovie} = this.state;
        
        if(movies.lenght === 0){
            return <div className = "main-view"> The list is empty! </div>;
        }
        
        return (
            <div className = "main-view">
                { selectedMovie
                    ? <MovieView movieData = {selectedMovie} onBackClick = {newSelectedMovie =>{ this.setSelectedMovie(newSelectedMovie);}}/>
                    : movies.map(movie => (
                        <MovieCard key = {movie._id} movieData = {movie} onMovieClick = {(movie) => {this.setSelectedMovie (movie)}} />
                    ))
                }        
            </div>        
        );
    }
}