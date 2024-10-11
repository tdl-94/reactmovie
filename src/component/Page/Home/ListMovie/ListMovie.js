import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ListMovie.css";
import CardMovie from "../../../Global/CardMovie/CardMovie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useFetch from "../../../../features/useFetch";
const ListMovie = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  const API_KEY = "e9e9d8da18ae29fc430845952232787c";
  const movie = useFetch(
    `https://api.themoviedb.org/3/movie/${props.data}?api_key=${API_KEY}&page=1`
  );

  return (
    <div className="list-movie">
      <Container>
        <div className="headline">
          <h3>ONLINE STREAMING</h3>
          <h2>{props.title}</h2>
        </div>
        <Row>
          <div className="slider-container">
            <Slider {...settings}>
              {movie.map((item) => (
                <Col lg={2} key={item.id}>
                  <CardMovie
                    id={item.id}
                    title={item.original_title}
                    img={item.poster_path}
                    date={item.release_date}
                    vote={item.vote_average}
                  ></CardMovie>
                </Col>
              ))}
            </Slider>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default ListMovie;
