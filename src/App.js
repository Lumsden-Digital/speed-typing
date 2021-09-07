import "./styles.css";
import {
  Container,
  TextField,
  Button,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useState, useRef, useEffect } from "react";
import { words } from "./words";

const useStyles = makeStyles({
  field: {
    margin: "1rem"
  }
});

export default function App() {
  const classes = useStyles();

  const typingArea = useRef(null);
  const startButton = useRef(null);

  const [inputText, setInputText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [disableInput, setDisableInput] = useState(false);

  const startGame = () => {
    setDisableInput(false);
    setScore(0);
    setTimer(5);
    setTimerRunning(true);
    typingArea.current.disabled = false;
  };

  const firstUpdate = useRef(true);

  const endGame = () => {
    setScore(typedText.length / 5);
    setDisableInput(true);
    setInputText("");
  };

  useEffect(() => {
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    setWordArray(shuffledWords);
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (timer > 0 && timerRunning) {
      setTimeout(() => {
        setTimer((time) => time - 1);
      }, 1000);
    } else if (!timer) {
      endGame();
    }
  }, [timer, timerRunning]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (inputText === `${wordArray[0]} `) {
      setTypedText((prev) => prev + inputText);
      setWordsTyped((wordsTyped) => wordsTyped + 1);
      setWordArray((prevArray) => prevArray.filter((w, i) => i > 0));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText("");
  }, [wordArray]);

  useEffect(() => {
    console.log(inputText);
  }, [inputText]);

  return (
    <div className="App">
      <Container style={{ maxWidth: "500px" }}>
        <form noValidate autoComplete="off">
          <TextField
            value={inputText}
            onChange={handleChange}
            ref={typingArea}
            className={classes.field}
            id="outlined-basic"
            label="Type Here"
            variant="outlined"
            disabled={disableInput}
          />
          <Button
            className={classes.field}
            variant="contained"
            color="primary"
            onClick={() => startGame()}
            buttonRef={startButton}
          >
            Start
          </Button>
        </form>
        <Typography style={{ wordWrap: "break-word", fontSize: "2rem" }} noWrap>
          {/* {newArray ? newArray.join(" ") : wordArray.join(" ")} */}
          {wordArray.join(" ")}
        </Typography>
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="h4">{`Timer: ${timer}`}</Typography>
          <Typography variant="h4">{`Score: ${score}`}</Typography>
          <Typography variant="h4">{`Words typed: ${wordsTyped}`}</Typography>
        </div>
      </Container>
    </div>
  );
}
