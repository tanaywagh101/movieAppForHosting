import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import MovieCardsComp from "./MovieCardsComp";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function SearchComp() {
  const [movieArray, setMovieArray] = useState([]);
  const [movieName, setMovieName] = useState("");
  
  function sendData(e) {
    e.preventDefault();
    setMovieName(e.target.value);
    console.log(movieName);
  }

  let voiceEvent = document.getElementById("voiceSearch");
  let paraText = document.getElementById("voicePara");

  if (voiceEvent) {
    voiceEvent.addEventListener("click", (e) => {
      e.preventDefault();
      recognition.start();
    });
  }

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.lang = "en-US";
  console.log(recognition);

  recognition.onstart = () => {
    paraText.textContent = "Listening...";
  };

  recognition.onend = () => {
    paraText.textContent = "Not listening...";
  };

  recognition.onresult = (event) => {
    const transcriptedText = event.results[0][0].transcript;
    setMovieName(transcriptedText);
    paraText.textContent = "Processing...";
  };

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?s=${movieName}&apikey=f056e2f7`)
      .then((resp) => {
        setMovieArray(() => {
            console.log(resp);
          return resp.data.Search;
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieName]);

  //   {
  //     movieCardCompLoaded ? document.getElementById("voicePara")
  //   }
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form style={{ display: "flex" }}>
          <Form.Control
            size="md"
            type="text"
            style={{ width: "100%", height: "50px" }}
            placeholder="Enter movie name"
            onChange={sendData}
            value={movieName}
            id="input"
            className="mt-3"
          ></Form.Control>
          <div
            className="ms-3"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              variant="primary"
              className="mt-3"
              id="voiceSearch"
              style={{ width: "100px" }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                size="lg"
                style={{ color: "#ffffff" }}
              />
            </Button>
            <p id="voicePara" style={{ fontSize: "12px", width: "100%" }}>
              Not Listening
            </p>
          </div>
        </Form>
      </div>
      <MovieCardsComp movieData={movieArray} />
    </React.Fragment>
  );
}

export default SearchComp;
