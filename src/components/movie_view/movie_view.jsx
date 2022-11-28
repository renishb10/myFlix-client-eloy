import React from 'react';

import {Link} from 'react-router-dom';

import {Container, Row, Col, Button} from 'react-bootstrap';

export class MovieView extends React.Component {

    //The three following functions:
    // keypressCallback
    // componentDidMount()
    //componentWillUnmount()
    // Dont have any funtion more than educational purposes (they will add an event listener and remove it when the movie view is activated and closed respectively)
    // keypressCallback(event) {
    //     console.log(event.key);
    // }

    // componentDidMount(){
    //     document.addEventListener('keypress', this.keypressCallback);
    // }
    // componentWillUnmount(){
    //     document.removeEventListener('keypress', this.keypressCallback);    }

    render(){
        const { movieData, onBackClick } = this.props;
        console.log(movieData);
        return(
            <Container className = "movie-view">
                <Row>
                    <Col>
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
                            <Link to = {`/genres/${movieData.Genre.Name}`}>
                                <span className = "value">{movieData.Genre.Name} </span>
                                {/* <Button variant = "link"> See more</Button> */}
                            </Link>
                        </div>
                        <div className = "movie-director">
                            <span className = "label"> Director: </span>
                            <Link to ={`/directors/${movieData.Director.Name}`}>
                                <span className = "value">{movieData.Director.Name} </span>
                                {/* <Button variant = "link">See more</Button> */}
                            </Link>
                        </div>
                        
                        <Button onClick = {() =>{ onBackClick(null); }}> Back to movies </Button>
                            
                    </Col>
                </Row>
            </Container>

        );
    }
}