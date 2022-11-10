import React from 'react';

export class MovieView extends React.Component {

    //The three following functions:
    // keypressCallback
    // componentDidMount()
    //componentWillUnmount()
    // Dont have any funtion more than educational purposes (they will add an event listener and remove it when the movie view is activated and closed respectively)
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }
    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressCallback);    }

    render(){
        const { movieData, onBackClick } = this.props;
        return(
            <div className = "movie-view">
                <div className = "movie-poster">
                    <img src = {movieData.imagePath} />
                </div>
                <div className = "movie-title">
                    <span className = "label"> Title: </span>
                    <span className = "value"> {movieData.Title} </span>
                </div>
                <div className = "movie-description">
                    <span className = "label"> Description: </span>
                    <span className = "value">{movieData.Description} </span>
                </div>
                <div className = "movie-genre">
                    <span className = "label"> Genre: </span>
                    <span className = "value">{movieData.Genre.Name} </span>
                </div>
                <div className = "movie-director">
                    <span className = "label"> Director: </span>
                    <span className = "value">{movieData.Director.Name} </span>
                </div>
                
                <button onClick = {() =>{ onBackClick(null); }}> Back to movies </button>
            </div>

        );
    }
}