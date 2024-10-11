import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useFetch from "../../../features/useFetch";
import CardMovie from "../../Global/CardMovie/CardMovie";
import "./Movie.css";
import { useParams } from "react-router-dom";
const Movie = () => {
  const { slug: keySearch } = useParams();
  console.log(keySearch);
  const [page, setPage] = useState(1);
  const [allMovie, setAllMovie] = useState([]);
  const API_KEY = "e9e9d8da18ae29fc430845952232787c";

  const movie = useFetch(
    keySearch
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keySearch}&page=1`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page= ${page}`
  );
  useEffect(() => {
    if (keySearch) {
      setAllMovie(movie);
    } else {
      setAllMovie([...allMovie, ...movie]);
    }
    setPage(1);
  }, [movie]);
  return (
    <div>
      <Container>
        <div className="headline">
          <h3>ONLINE STREAMING</h3>
          <h2>List Movie</h2>
        </div>
        <Row className="showmore">
          {allMovie.map((item) => (
            <Col lg={3} key={item.id}>
              <CardMovie
                id={item.id}
                title={item.original_title}
                img={item.poster_path}
                date={item.release_date}
                vote={item.vote_average}
              ></CardMovie>
            </Col>
          ))}
          <button className="button" onClick={() => setPage(page + 1)}>
            SHOW MORE
          </button>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
