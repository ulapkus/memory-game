"use client";

import React from "react";
import styles from "../page.module.css";
import { ModalContext } from "../page";

function LoseModal() {
  const { value2 } = React.useContext(ModalContext);
  const { value3 } = React.useContext(ModalContext);
  const { value4 } = React.useContext(ModalContext);

  const [timerIsRunning, setTimerIsRunning] = value2;
  const [count, setCount] = value3;
  const [time, setTime] = value4;

  function tryagain() {
    const losemodal = document.getElementById("loseModal");
    losemodal.style.display = "none";
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

  const begintimer = () => {
    setTimerIsRunning(true);
  };

  return (
    <section id="loseModal" className={styles.modal} onClick={begintimer}>
      <div className={styles.modal_lose}>
        <div className={styles.modal_lose_all_words}>
          <h5>You were caught!</h5>
          <div className={styles.modal_lose_words_container}>
            <p className={styles.modal_lose_words}>You only accounted for</p>
            <p className={styles.modal_lose_words}>&nbsp;{count} art piece(s).</p>
          </div>
        </div>
        <button onClick={tryagain}>Try Again</button>
      </div>
    </section>
  );
}

export default LoseModal;
