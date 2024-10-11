import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../../features/useFetch";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./DetailMovie.css";
const DetailMovie = () => {
  const { slug: movieID } = useParams();
  console.log(movieID);
  const API_KEY = "e9e9d8da18ae29fc430845952232787c";
  const detailMovie = useFetch(
    ` https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const trailerMovie = useFetch (`https://api.themoviedb.org/3/movie/917496/videos?api_key=${API_KEY}`)
  const findTrailer = trailerMovie.find((item) => item.type === "Trailer");
  console.log(findTrailer);
  return (
    <div>
      <Container>
        <Row>
          <Col lg={6}>
            <img
              src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`}
              alt="Despicable Me 4"
            />
          </Col>
          <Col lg={6}>
            <h1 className="">{detailMovie.original_title}</h1>
            <div class="info">
              <p class="year">{detailMovie.release_date}</p>
              <p class="kind">
                {detailMovie.genres &&
                  detailMovie.genres.map((item) => item.name).join(",")}
              </p>
              <p class="time">
                <i class="fa-regular fa-clock text-white"></i>
                {detailMovie.runtime} min
              </p>
            </div>
            <div class="rate">
              <p class="number-rate">{detailMovie.vote_average}</p>
              <p class="user">user score</p>
              <p class="playtrailer">
                <i class="fa-solid fa-play"></i>

                <Button className="button-playtrailer" onClick={handleShow}>Play trailer</Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-black">Trailer</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${detailMovie.type}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </Modal.Body>
                </Modal>
              </p>
            </div>
            <h3>Can You Bury Your Past?</h3>
            <h2>Overview</h2>
            <p class="overview">{detailMovie.overview}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailMovie;
