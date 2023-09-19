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

  React.useEffect(() => {
    let interval;
    if (timerIsRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timerIsRunning === false) {
      // setCount(0);
      // setTime(60);
      clearInterval(interval);
    }

    if (timerIsRunning && time === 0) {
      document.getElementById("myModal").style.display = "block";
      setTimerIsRunning(false);
      clearInterval(interval);
      // setCount(0);
      // setTime(60);
    }

    if (count === 12) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerIsRunning, time, count]);

  useEffect(() => {
    function onstartup() {
      document.getElementById("openModal").style.display = "block";
    }
    onstartup();
  }, []);

  function salir() {
    const openmodal = document.getElementById("openModal");
    openmodal.style.display = "none";
  }

  function exit() {
    const mymodal = document.getElementById("myModal");
    mymodal.style.display = "none";
  }

  function tryagain() {
    const mymodal = document.getElementById("myModal");
    mymodal.style.display = "none";
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
  }

  window.onclick = function (event) {
    const openmodal = document.getElementById("openModal");
    const mymodal = document.getElementById("myModal");
    const successmodal = document.getElementById("successModal");
    if (
      event.target == successmodal ||
      event.target == mymodal ||
      event.target == openmodal
    ) {
      successmodal.style.display = "none";
      mymodal.style.display = "none";
      openmodal.style.display = "none";
    }
  };

  const shuffleArray = (e) => {
    setTimerIsRunning(true);
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
      document.getElementById("myModal").style.display = "block";
    }
  };

  React.useEffect(() => {
    if (count === 12) {
      document.getElementById("successModal").style.display = "block";
      setTimerIsRunning(false);
    }
  }, [timerIsRunning, time, count]);

  return (
    <div className={styles.allcontent}>
      <div id="openModal" className={styles.modal}>
        <span onClick={salir} className={styles.close}>
          &times;
        </span>
        <div className={styles.modalcontent}>
          <div className={styles.headings}>
            <h3>Oh no!!</h3>
            <h4>
              The Neopets wandered too far and became lost in the Haunted
              Forest.
            </h4>
          </div>
          <p className={styles.openModalWords}>
            Save them by clicking each one ONCE before someone finds out they
            are here.
          </p>
        </div>
      </div>
      <div className={styles.headingPlusNewGame}>
      <h1>Neopets Memory Game</h1>
      <p className={styles.newgame} onClick={newgame}>New Game</p>
      </div>
      <div className={styles.timeandcount}>
        <h2>Time left: {time} seconds</h2>
        <p className={styles.currentCount}>Neopets rescued: {count}</p>
      </div>

      <section className={styles.images}>
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[0]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[1]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[2]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[3]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[4]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[5]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[6]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[7]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[8]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[9]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[10]} />
        <img onClick={shuffleArray} className={styles.pet} src={gameArr[11]} />
      </section>

      <div id="myModal" className={styles.modal}>
        <span onClick={exit} className={styles.close}>
          &times;
        </span>
        <div className={styles.modalcontentlose}>
          <img
            className={styles.evilThade}
            src="https://i.ibb.co/YhNbr74/Screenshot-2023-09-14-at-4-15-42-PM-removebg-preview-1.png"
          />
          <h5>Evil Thade found them!</h5>
          <p>You only saved {count} Neopet(s).</p>
          <button onClick={tryagain}>Try Again</button>
        </div>
      </div>
      <div id="successModal" className={styles.modal}>
        <span onClick={leave} className={styles.close}>
          &times;
        </span>
        <div className={styles.modalcontentwin}>
          <h6>You saved them all! </h6>

          <p className={styles.successwords}>
            Phew. Now they get to go home and rest.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Game;
