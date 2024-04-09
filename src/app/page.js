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
    "https://imagetolink.com/ib/zQ7XldRFV5.png",
    "https://imagetolink.com/ib/PjPW8FgxR9.png",
    "https://imagetolink.com/ib/Jyzc7y2VHQ.png",
    "https://imagetolink.com/ib/PnteLQhwca.png",
    "https://imagetolink.com/ib/6oEzuOsCAb.png",
    "https://imagetolink.com/ib/WsC8YAeV7z.png",
    "https://imagetolink.com/ib/0ah0OrvzJb.png",
    "https://imagetolink.com/ib/auuzqFXC3N.png",
    "https://imagetolink.com/ib/vJYSWD5rNt.png",
    "https://imagetolink.com/ib/CfgffVfsFX.png",
    "https://imagetolink.com/ib/CCSwsWMSso.png",
    "https://imagetolink.com/ib/4FYvNjA6iF.png",
  ]);
  const [gameArrMedium, setGameArrMedium] = useState([
    "https://imagetolink.com/ib/zQ7XldRFV5.png",
    "https://imagetolink.com/ib/PjPW8FgxR9.png",
    "https://imagetolink.com/ib/Jyzc7y2VHQ.png",
    "https://imagetolink.com/ib/PnteLQhwca.png",
    "https://imagetolink.com/ib/6oEzuOsCAb.png",
    "https://imagetolink.com/ib/WsC8YAeV7z.png",
    "https://imagetolink.com/ib/0ah0OrvzJb.png",
    "https://imagetolink.com/ib/auuzqFXC3N.png",
  ]);
  const [gameArrEasy, setGameArrEasy] = useState([
    "https://imagetolink.com/ib/0ah0OrvzJb.png",
    "https://imagetolink.com/ib/auuzqFXC3N.png",
    "https://imagetolink.com/ib/vJYSWD5rNt.png",
    "https://imagetolink.com/ib/CfgffVfsFX.png",
    "https://imagetolink.com/ib/CCSwsWMSso.png",
    "https://imagetolink.com/ib/4FYvNjA6iF.png",
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
      <section className={styles.background}>
        <div className={styles.heading_and_newgame}>
          <h1>MUSEUM MEMORY GAME</h1>
          <p className={styles.newgame} onClick={newgame}>
            NEW GAME
          </p>
        </div>
        <div className={styles.time_and_count}>
          <p className={styles.time}>TIME LEFT: {time} SECONDS</p>
          <p className={styles.current_count}>PAINTINGS FOUND: {count}</p>
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
