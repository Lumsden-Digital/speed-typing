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
  },
  form: {
    display: "flex",
    alignItems: "center"
  },
  stats: {
    // marginTop: "2rem",
    minHeight: "10rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end"
  }
});

export default function App() {
  const classes = useStyles();

  const typingArea = useRef(null);
  const startButton = useRef(null);

  const [inputText, setInputText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [, setWordsTyped] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [disableInput, setDisableInput] = useState(false);

  const reset = () => {
    setTypedText("");
    setTimerRunning(false);
    // const shuffledWords = words.sort(() => Math.random() - 0.5);
    const shuffled = words
      .map((w) => ({
        value: w,
        sort: Math.random()
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((i) => i.value);
    setWordArray(shuffled);
    setDisableInput(false);
    setScore(0);
    setTimer(60);
    setWordsTyped(0);
    typingArea.current.disabled = false;
  };

  const endGame = () => {
    setTypedText((prev) => prev + inputText);
    setScore(typedText.length / 5);
    setDisableInput(true);
    setInputText("");
  };

  useEffect(() => {
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
    if (inputText.length === 1 && !timerRunning) {
      setTimerRunning(true);
    }
    if (inputText === `${wordArray[0]} `) {
      setTypedText((prev) => prev + inputText);
      setWordsTyped((wordsTyped) => wordsTyped + 1);
      setWordArray((prevArray) => prevArray.filter((w, i) => i > 0));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText("");
  }, [wordArray]);

  useEffect(() => {}, [inputText]);

  return (
    <div className="App">
      <Container style={{ maxWidth: "500px" }}>
        <form noValidate autoComplete="off" className={classes.form}>
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
            onClick={() => reset()}
            buttonRef={startButton}
          >
            RESET
          </Button>
        </form>
        <div className={classes.stats}>
          <Typography
            style={{
              wordWrap: "break-word",
              fontSize: "2rem",
              minHeight: "100px"
            }}
            noWrap
          >
            {/* {newArray ? newArray.join(" ") : wordArray.join(" ")} */}
            {wordArray.join(" ")}
          </Typography>
          <Typography variant="h4">{`Timer: ${timer}`}</Typography>
          <Typography variant="h4">{`Score: ${score}`}</Typography>
        </div>
      </Container>
    </div>
  );
}
