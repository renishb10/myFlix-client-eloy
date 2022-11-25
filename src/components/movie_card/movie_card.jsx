import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component{
    render(){
        const {movieData} = this.props;
        return (
            <Card style = {{width: '18 rem'}}>
                <Card.Img variant = "top" src = {movieData.ImagePath}/>
                <Card.Body>
                    <Card.Title> {movieData.Title} </Card.Title>
                    <Card.Text> {movieData.Description} </Card.Text>
                    <Link to = {`/movies/${movieData._id}`}>
                    <Button variant = "link">Open</Button>
                    {/* Button variant = "primary">Open</Button */}
                    </Link>                    
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
