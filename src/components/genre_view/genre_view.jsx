import React from 'react';


import {Container, Row, Col, Button} from 'react-bootstrap';

export function GenreView (props) {
    const {genre, onBackClick} = props;
    
    return(
        <Container className = "genre-view">

            <div className = "genre-name">
                <span className = "label"> Genre: </span>
                <span className = "value"> {genre.Name} </span>
            </div>
            <div className = "genre-Description">
                <span className = "label"> Description: </span>
                <span className = "value"> {genre.Description} </span>
            </div>
            <Button onClick = {() =>{ onBackClick(null); }}> Back to the movie </Button>
        </Container>
        

    );
}