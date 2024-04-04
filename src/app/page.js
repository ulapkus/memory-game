"use client";

import React, { useState, useEffect, createContext } from "react";
import styles from "./page.module.css";
import GameModal from "./startModal/page";
import LoseModal from "./loseModal/page";
import WinModal from "./winModal/page";

export const Context = createContext([[], () => {}]);
export const ModalContext = React.createContext();

function Game() {
  const [gameArrHard, setGameArrHard] = useState([
    "https://imagetolink.com/ib/hG4ledtobm.png",
    "https://imagetolink.com/ib/T4A0n1Jc9k.png",
    "https://imagetolink.com/ib/5hdb0TKwOt.png",
    "https://imagetolink.com/ib/sABYVQFCaF.png",
    "https://imagetolink.com/ib/rCihSQ2lbB.png",
    "https://imagetolink.com/ib/sY4DQFCWfs.png",
    "https://imagetolink.com/ib/I0idzCTEvf.png",
    "https://imagetolink.com/ib/X8b1tora8J.png",
    "https://imagetolink.com/ib/CUVx2f719J.png",
    "https://imagetolink.com/ib/U6k4FYP0Xf.png",
    "https://imagetolink.com/ib/FDxgvwhXXz.png",
    "https://imagetolink.com/ib/JDhaQ9uYu2.png",
  ]);
  const [gameArrMedium, setGameArrMedium] = useState([
    "https://imagetolink.com/ib/hG4ledtobm.png",
    "https://imagetolink.com/ib/T4A0n1Jc9k.png",
    "https://imagetolink.com/ib/5hdb0TKwOt.png",
    "https://imagetolink.com/ib/sABYVQFCaF.png",
    "https://imagetolink.com/ib/rCihSQ2lbB.png",
    "https://imagetolink.com/ib/sY4DQFCWfs.png",
    "https://imagetolink.com/ib/I0idzCTEvf.png",
    "https://imagetolink.com/ib/X8b1tora8J.png",
  ]);
  const [gameArrEasy, setGameArrEasy] = useState([
    "https://imagetolink.com/ib/I0idzCTEvf.png",
    "https://imagetolink.com/ib/X8b1tora8J.png",
    "https://imagetolink.com/ib/CUVx2f719J.png",
    "https://imagetolink.com/ib/U6k4FYP0Xf.png",
    "https://imagetolink.com/ib/FDxgvwhXXz.png",
    "https://imagetolink.com/ib/JDhaQ9uYu2.png",
  ]);
  const [clickedArr, setClickedArr] = useState([]);
  const [count, setCount] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [time, setTime] = useState(60);
  const [howfast, setHowfast] = useState(0);
  const [gameMode, setGameMode] = useState("hard");

  React.useEffect(() => {
    let interval;
    if (timerIsRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerIsRunning === false) {
      clearInterval(interval);
    }

    if (timerIsRunning && time === 0) {
      document.getElementById("loseModal").style.display = "block";
      setTimerIsRunning(false);
      clearInterval(interval);
    }

    if (count === 12) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerIsRunning, time]);

  useEffect(() => {
    function onstartup() {
      document.getElementById("openModal").style.display = "block";
    }
    onstartup();
  }, []);

  function newgame() {
    document.getElementById("openModal").style.display = "block";
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

  const shuffleArray = (e, difficulty) => {
    if (e.target.tagName === "IMG") {
      setClickedArr((prevClickedArr) => [
        ...prevClickedArr,
        e.target.getAttribute("src"),
      ]);
    }

    let shuffled;
    switch (difficulty) {
      case "easy":
        shuffled = [...gameArrEasy];
        break;
      case "medium":
        shuffled = [...gameArrMedium];
        break;
      case "hard":
        shuffled = [...gameArrHard];
        break;
      default:
        break;
    }

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]])];
    }

    setCount((prevCount) => prevCount + 1);
    switch (difficulty) {
      case "easy":
        setGameArrEasy(shuffled);
        break;
      case "medium":
        setGameArrMedium(shuffled);
        break;
      case "hard":
        setGameArrHard(shuffled);
        break;
      default:
        break;
    }

    if (clickedArr.indexOf(e.target.getAttribute("src")) !== -1) {
      setCount((prevCount) => prevCount - 1);

      setTimerIsRunning(false);
      setClickedArr([]);
      document.getElementById("loseModal").style.display = "block";
    }
  };

  React.useEffect(() => {
    if (
      (gameMode === "hard" && count === 12) ||
      (gameMode === "medium" && count === 8) ||
      (gameMode === "easy" && count === 6)
    ) {
      document.getElementById("successModal").style.display = "block";
      setTimerIsRunning(false);
      const secondsleft = time;
      const result = 60 - secondsleft;
      setHowfast(result);
    }
  }, [timerIsRunning, time, count]);

  const Background = () => {
    return (
      <section className={styles.all_content}>
        <div className={styles.heading_and_newgame}>
          <h1>Museum Memory Game</h1>
          <p className={styles.newgame} onClick={newgame}>
            New Game
          </p>
        </div>
        <div className={styles.time_and_count}>
          <p className={styles.time}>Time left: {time} seconds</p>
          <p className={styles.current_count}>Art collected: {count}</p>
        </div>
      </section>
    );
  };

  const renderEasyMode = () => {
    return (
      <section className={styles.all_content}>
        <ModalContext.Provider
          value={{
            value: [gameMode, setGameMode],
            value2: [timerIsRunning, setTimerIsRunning],
            value3: [count, setCount],
            value4: [time, setTime],
            value5: [howfast, setHowfast],
          }}
        >
          <GameModal />
          <WinModal />
          <LoseModal />
        </ModalContext.Provider>
        <Background />
        <section
          className={styles.images_easy}
          onClick={(e) => shuffleArray(e, "easy")}
        >
          {gameArrEasy.map((item, index) => (
            <img key={index} className={styles.img_easy} src={item} />
          ))}
        </section>
      </section>
    );
  };

  const renderMediumMode = () => {
    return (
      <section className={styles.all_content}>
        <ModalContext.Provider
          value={{
            value: [gameMode, setGameMode],
            value2: [timerIsRunning, setTimerIsRunning],
            value3: [count, setCount],
            value4: [time, setTime],
            value5: [howfast, setHowfast],
          }}
        >
          <GameModal />
          <WinModal />
          <LoseModal />
        </ModalContext.Provider>
        <Background />
        <section
          className={styles.images_medium}
          onClick={(e) => shuffleArray(e, "medium")}
        >
          {gameArrMedium.map((item, index) => (
            <img key={index} className={styles.img_medium} src={item} />
          ))}
        </section>
      </section>
    );
  };

  const renderHardMode = () => {
    return (
      <section className={styles.all_content}>
        <ModalContext.Provider
          value={{
            value: [gameMode, setGameMode],
            value2: [timerIsRunning, setTimerIsRunning],
            value3: [count, setCount],
            value4: [time, setTime],
            value5: [howfast, setHowfast],
          }}
        >
          <GameModal />
          <WinModal />
          <LoseModal />
        </ModalContext.Provider>
        <Background />
        <section
          className={styles.images_hard}
          onClick={(e) => shuffleArray(e, "hard")}
        >
          {gameArrHard.map((item, index) => (
            <img key={index} className={styles.img_hard} src={item} />
          ))}
        </section>
      </section>
    );
  };
  return (
    <div>
      {gameMode === "easy"
        ? renderEasyMode()
        : gameMode === "medium"
        ? renderMediumMode()
        : renderHardMode()}
    </div>
  );
}

export default Game;
