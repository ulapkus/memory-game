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
    // "https://imagetolink.com/ib/AZnQhJmJZ7.png",
    // "https://imagetolink.com/ib/4pJgH2eYfJ.png",

    // "https://imagetolink.com/ib/f7kXVMTxqa.png",
    // "https://imagetolink.com/ib/Em5Vse71iC.png",
    // "https://imagetolink.com/ib/Xy0K1LDu7L.png",
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
  const [gameMode, setGameMode] = useState("medium");

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

  function exit() {
    const openmodal = document.getElementById("openModal");
    openmodal.style.display = "none";
    setTimerIsRunning(true);
  }

  const submitMode = (mode) => {
    setGameMode(mode);
    const modemodal = document.getElementById("modeModal");
    modemodal.style.display = "none";
    setTimerIsRunning(true);
  };

  function tryagain() {
    const losemodal = document.getElementById("loseModal");
    losemodal.style.display = "none";
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

  function newgame() {
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

  function chooseMode() {
    document.getElementById("modeModal").style.display = "block";
    setCount(0);
    setTime(60);
    setTimerIsRunning(false);
  }

  function leave() {
    const successmodal = document.getElementById("successModal");
    successmodal.style.display = "none";
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

  const shuffleArrayHard = (e) => {
    if (e.target.tagName === "IMG") {
      setClickedArr((prevClickedArr) => [
        ...prevClickedArr,
        e.target.getAttribute("src"),
      ]);
    }

    const shuffled = [...gameArrHard];
    for (let i = gameArrHard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]])];
    }

    setCount((prevCount) => prevCount + 1);
    setGameArrHard(shuffled);

    if (clickedArr.indexOf(e.target.getAttribute("src")) !== -1) {
      setCount((prevCount) => prevCount - 1);

      setTimerIsRunning(false);
      setClickedArr([]);
      document.getElementById("loseModal").style.display = "block";
    }
  };

  const shuffleArrayMedium = (e) => {
    if (e.target.tagName === "IMG") {
      setClickedArr((prevClickedArr) => [
        ...prevClickedArr,
        e.target.getAttribute("src"),
      ]);
    }

    const shuffled = [...gameArrMedium];
    for (let i = gameArrMedium.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]])];
    }

    setCount((prevCount) => prevCount + 1);
    setGameArrMedium(shuffled);

    if (clickedArr.indexOf(e.target.getAttribute("src")) !== -1) {
      setCount((prevCount) => prevCount - 1);

      setTimerIsRunning(false);
      setClickedArr([]);
      document.getElementById("loseModal").style.display = "block";
    }
  };

  const shuffleArrayEasy = (e) => {
    if (e.target.tagName === "IMG") {
      setClickedArr((prevClickedArr) => [
        ...prevClickedArr,
        e.target.getAttribute("src"),
      ]);
    }

    const shuffled = [...gameArrEasy];
    for (let i = gameArrEasy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]])];
    }

    setCount((prevCount) => prevCount + 1);
    setGameArrEasy(shuffled);

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

  const begintimer = () => {
    setTimerIsRunning(true);
  };

  const renderEasyMode = () => {
    return (
      <div>
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
          <div className={styles.heading_and_newgame}>
            <h1>Museum Memory Game</h1>
            <p className={styles.newgame} onClick={newgame}>
              New Game
            </p>
          </div>
          <div className={styles.time_and_count}>
            <h2>Time left: {time} seconds</h2>
            <p className={styles.current_count}>Art collected: {count}</p>
          </div>
          <section className={styles.images_easy} onClick={shuffleArrayEasy}>
            <img className={styles.neopet_img_easy} src={gameArrEasy[0]} />
            <img className={styles.neopet_img_easy} src={gameArrEasy[1]} />
            <img className={styles.neopet_img_easy} src={gameArrEasy[2]} />
            <img className={styles.neopet_img_easy} src={gameArrEasy[3]} />
            <img className={styles.neopet_img_easy} src={gameArrEasy[4]} />
            <img className={styles.neopet_img_easy} src={gameArrEasy[5]} />
          </section>

          {/* <LoseModal /> */}
          {/* <WinModal /> */}
        </section>
      </div>
    );
  };

  const renderMediumMode = () => {
    return (
      <div>
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
          <section id="modeModal" className={styles.modal}>
            <div className={styles.intro_modal}>
              <div className={styles.headings}>
                <h3>Choose your difficulty level:</h3>
                <button onClick={() => submitMode("easy")}>Easy</button>
                <button onClick={() => submitMode("medium")}>Medium</button>
                <button onClick={() => submitMode("hard")}>Hard</button>
              </div>
            </div>
          </section>
          <div className={styles.heading_and_newgame}>
            <h1>Museum Memory Game</h1>
            <div>
              <p className={styles.newgame_medium} onClick={newgame}>
                New Game
              </p>
            </div>
          </div>
          <div className={styles.time_and_count}>
            <p className={styles.time_medium}>Time left: {time} seconds</p>
            <p className={styles.current_count_medium}>
              Art collected: {count}
            </p>
          </div>

          <section className={styles.images} onClick={shuffleArrayMedium}>
            <img className={styles.neopet_img_medium} src={gameArrMedium[0]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[1]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[2]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[3]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[4]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[5]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[6]} />
            <img className={styles.neopet_img_medium} src={gameArrMedium[7]} />
          </section>

          {/* <LoseModal /> */}
          {/* <WinModal /> */}
        </section>
      </div>
    );
  };

  const renderHardMode = () => {
    return (
      <div>
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
          <div className={styles.heading_and_newgame}>
            <h1>Museum Memory Game</h1>
            <div>
              <p className={styles.newgame} onClick={newgame}>
                New Game
              </p>
            </div>
          </div>
          <div className={styles.time_and_count}>
            <h2>Time left: {time} seconds</h2>
            <p className={styles.current_count}>Art collected: {count}</p>
          </div>
          <section className={styles.images} onClick={shuffleArrayHard}>
            <img className={styles.neopet_img} src={gameArrHard[0]} />
            <img className={styles.neopet_img} src={gameArrHard[1]} />
            <img className={styles.neopet_img} src={gameArrHard[2]} />
            <img className={styles.neopet_img} src={gameArrHard[3]} />
            <img className={styles.neopet_img} src={gameArrHard[4]} />
            <img className={styles.neopet_img} src={gameArrHard[5]} />
            <img className={styles.neopet_img} src={gameArrHard[6]} />
            <img className={styles.neopet_img} src={gameArrHard[7]} />
            <img className={styles.neopet_img} src={gameArrHard[8]} />
            <img className={styles.neopet_img} src={gameArrHard[9]} />
            <img className={styles.neopet_img} src={gameArrHard[10]} />
            <img className={styles.neopet_img} src={gameArrHard[11]} />
          </section>
          {/* <LoseModal /> */}
          {/* <WinModal /> */}
        </section>
      </div>
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
