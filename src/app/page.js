"use client";

import React, { useState, useEffect, createContext } from "react";
import styles from "./page.module.css";
import GameModal from "./modals/intro";
import LoseModal from "./modals/lose";
import WinModal from "./modals/win";
import Image from "next/image";
import one from "../../public/1.png";
import two from "../../public/2.png";
import three from "../../public/3.png";
import four from "../../public/4.png";
import five from "../../public/5.png";
import six from "../../public/6.png";
import seven from "../../public/7.png";
import eight from "../../public/8.png";
import nine from "../../public/9.png";
import ten from "../../public/10.png";
import eleven from "../../public/11.png";
import twelve from "../../public/12.png";

export const Context = createContext([[], () => {}]);
export const ModalContext = React.createContext();

function Game() {
  const [gameArrHard, setGameArrHard] = useState([
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
  ]);
  const [gameArrMedium, setGameArrMedium] = useState([
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
  ]);
  const [gameArrEasy, setGameArrEasy] = useState([
    one,
    two,
    three,
    four,
    five,
    six,
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

    if (e.target.tagName === "IMG") {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]])];
      }
      setCount((prevCount) => prevCount + 1);
      setClickedArr((prevClickedArr) => [
        ...prevClickedArr,
        e.target.getAttribute("src"),
      ]);
      console.log(clickedArr);
    }

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
          <h1>MUSEUM MEMORY</h1>
          <p className={styles.newgame} onClick={newgame}>
            NEW GAME
          </p>
        </div>
        <div className={styles.time_and_count}>
          <div className={styles.time_container}>
            <p className={styles.time}>TIME LEFT:</p>
            <p className={styles.time}>{time} SECONDS</p>
          </div>
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
            <Image
              key={index}
              className={styles.img_easy}
              src={item}
              priority
              alt=""
            ></Image>
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
            <Image
              key={index}
              className={styles.img_medium}
              src={item}
              priority
              alt=""
            ></Image>
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
            <Image
              key={index}
              className={styles.img_hard}
              src={item}
              priority
              alt=""
            ></Image>
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
