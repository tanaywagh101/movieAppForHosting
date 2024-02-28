import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MovieCardsComp(props) {
  return props.movieData ? (
    <div>
      <Row>
        {props.movieData.map((movie, index) => {
          return (
            <Col sm={4} style={{display:"flex", justifyContent:"center"}}  >
              <Card style={{ width: "18rem", height: "80vh" }} key={index} className="mt-5" >
                <Card.Img variant="top" src={movie.Poster} style={{height : "60vh"}} alt="Movie Poster"/>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Year}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  ) : (
    <h1>Nothing to Display</h1>
  );
}

export default MovieCardsComp;
