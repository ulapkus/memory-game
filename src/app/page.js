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

  document.getElementById("openModal").style.display = "block";

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
  };

  useEffect(() => {
    console.log(clickedArr);
  }, [clickedArr]);

  for (let i = 0; i < clickedArr.length; i++) {
    if (clickedArr.indexOf(clickedArr[i]) !== i) {
      setCount(0);
      setClickedArr([]);

      document.getElementById("myModal").style.display = "block";
    }
    if (count === 12) {
      document.getElementById("successModal").style.display = "block";
    }
  }

  var modal = document.getElementById("myModal");

  function exit() {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var modalsuccess = document.getElementById("successModal");

  function leave() {
    modalsuccess.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modalsuccess.style.display = "none";
    }
  };

  return (
    <div className={styles.allcontent}>
      <h1>Neopets Memory Game</h1>
      <h2>Current Count: {count}</h2>
      <section className={styles.images}>
        <img onClick={shuffleArray} className={styles.que} src={gameArr[0]} />
        <img onClick={shuffleArray} src={gameArr[1]} />
        <img onClick={shuffleArray} src={gameArr[2]} />
        <img onClick={shuffleArray} src={gameArr[3]} />
        <img onClick={shuffleArray} src={gameArr[4]} />
        <img onClick={shuffleArray} src={gameArr[5]} />
        <img onClick={shuffleArray} src={gameArr[6]} />
        <img onClick={shuffleArray} src={gameArr[7]} />
        <img onClick={shuffleArray} src={gameArr[8]} />
        <img onClick={shuffleArray} src={gameArr[9]} />
        <img onClick={shuffleArray} src={gameArr[10]} />
        <img onClick={shuffleArray} src={gameArr[11]} />
      </section>

      <div id="myModal" className={styles.modal}>
        <div className={styles.modalcontent}>
          <span onClick={exit} className={styles.close}>
            &times;
          </span>
          <p>Oh no! You lost.</p>
        </div>
      </div>
      <div id="successModal" className={styles.modal}>
        <div className={styles.modalcontent}>
          <span onClick={leave} className={styles.close}>
            &times;
          </span>
          <p>You won!</p>
        </div>
      </div>
    </div>
  );
}

export default Game;
