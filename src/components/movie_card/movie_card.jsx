import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component{
    render(){
        const {movieData, onMovieClick} = this.props;
        return (
            <Card style = {{width: '18 rem'}}>
                <Card.Img variant = "top" src = {movieData.ImagePath}/>
                <Card.Body>
                    <Card.Title> {movieData.Title} </Card.Title>
                    <Card.Text> {moviedData.Description} </Card.Text>
                    <Button onClick = {() => { onMovieClick(movieData)}} Variant = "link"> Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
