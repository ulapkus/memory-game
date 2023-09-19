"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

function Game() {
  const [gameArr, setGameArr] = useState([
    "https://pets.neopets.com/cp/6mn6k8lv/1/5.png",
    "https://pets.neopets.com/cp/2wsqgt78/1/7.png",
    "https://pets.neopets.com/cp/nwx8v2rb/1/4.png",
    "https://pets.neopets.com/cp/sk22m495/1/7.png",
    "https://pets.neopets.com/cp/lcx49td5/1/4.png",
    "https://pets.neopets.com/cp/rfsbh59t/1/5.png",
    "https://pets.neopets.com/cp/dnr2kj4b/1/4.png",
    "https://pets.neopets.com/cp/bkqnjzq6/1/4.png",
    "https://pets.neopets.com/cp/zbqv7t5z/1/7.png",
    "https://pets.neopets.com/cp/8msdcx58/1/4.png",
    "https://pets.neopets.com/cp/c39wz4r9/1/7.png",
    "https://pets.neopets.com/cp/kfonqhdc/1/7.png",
  ]);
  const [clickedArr, setClickedArr] = useState([]);
  const [count, setCount] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [time, setTime] = useState(60);
  const [howfast, setHowfast] = useState(0);

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

  function leave() {
    const successmodal = document.getElementById("successModal");
    successmodal.style.display = "none";
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

  const shuffleArray = (e) => {
    if (e.target.tagName === "IMG") {
      setClickedArr((prevClickedArr) => [
        ...prevClickedArr,
        e.target.getAttribute("src"),
      ]);
    }

    const shuffled = [...gameArr];
    for (let i = gameArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]])];
    }

    setCount((prevCount) => prevCount + 1);
    setGameArr(shuffled);

    if (clickedArr.indexOf(e.target.getAttribute("src")) !== -1) {
      setCount((prevCount) => prevCount - 1);

      setTimerIsRunning(false);
      setClickedArr([]);
      document.getElementById("loseModal").style.display = "block";
    }
  };

  React.useEffect(() => {
    if (count === 12) {
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

  return (
    <section className={styles.all_content}>
      <section id="openModal" className={styles.modal}>
        <div className={styles.intro_modal}>
          <div className={styles.headings}>
            <h3>Oh no!!</h3>
            <h4>
              The Neopets wandered too far and became lost in the Haunted
              Forest.
            </h4>
          </div>
          <p className={styles.intro_modal_words}>
            Save them by clicking each one ONCE before someone finds out they
            are here.
          </p>
          <button onClick={exit}>Begin</button>
        </div>
      </section>
      <div className={styles.heading_and_newgame}>
        <h1>Neopets Memory Game</h1>
        <p className={styles.newgame} onClick={newgame}>
          New Game
        </p>
      </div>
      <div className={styles.time_and_count}>
        <h2>Time left: {time} seconds</h2>
        <p className={styles.current_count}>Neopets rescued: {count}</p>
      </div>

      <section className={styles.images} onClick={shuffleArray}>
        <img className={styles.neopet_img} src={gameArr[0]} />
        <img className={styles.neopet_img} src={gameArr[1]} />
        <img className={styles.neopet_img} src={gameArr[2]} />
        <img className={styles.neopet_img} src={gameArr[3]} />
        <img className={styles.neopet_img} src={gameArr[4]} />
        <img className={styles.neopet_img} src={gameArr[5]} />
        <img className={styles.neopet_img} src={gameArr[6]} />
        <img className={styles.neopet_img} src={gameArr[7]} />
        <img className={styles.neopet_img} src={gameArr[8]} />
        <img className={styles.neopet_img} src={gameArr[9]} />
        <img className={styles.neopet_img} src={gameArr[10]} />
        <img className={styles.neopet_img} src={gameArr[11]} />
      </section>

      <section id="loseModal" className={styles.modal} onClick={begintimer}>
        <div className={styles.modal_lose}>
          <img
            className={styles.evil_thade}
            src="https://i.ibb.co/YhNbr74/Screenshot-2023-09-14-at-4-15-42-PM-removebg-preview-1.png"
          />
          <h5>Evil Thade found them!</h5>
          <p>You only saved {count} Neopet(s).</p>
          <button onClick={tryagain}>Try Again</button>
        </div>
      </section>
      <section id="successModal" className={styles.modal}>
        <div className={styles.modal_win}>
          <h6>You saved them all! </h6>
          <div className={styles.success_words}>
            <p>And it only took you {howfast} seconds.</p>
            <p>Phew. Now they get to go home and rest.</p>
          </div>
          <div>
            <p className={styles.faster}>Think you can do faster?</p>
            <button onClick={leave}>Try Again</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Game;
