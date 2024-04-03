"use client";

import React, { useEffect } from "react";
import styles from "../page.module.css";
import { ModalContext } from "../page";

function WinModal() {
  const { value } = React.useContext(ModalContext);
  const { value2 } = React.useContext(ModalContext);
  const { value3 } = React.useContext(ModalContext);
  const { value4 } = React.useContext(ModalContext);
  const { value5 } = React.useContext(ModalContext);

  const [gameMode, setGameMode] = value;
  const [timerIsRunning, setTimerIsRunning] = value2;
  const [count, setCount] = value3;
  const [time, setTime] = value4;
  const [howfast, setHowfast] = value5;

  useEffect(() => {
    function onstartup() {
      document.getElementById("openModal").style.display = "block";
    }
    onstartup();
  }, []);

  function leave() {
    const successmodal = document.getElementById("successModal");
    successmodal.style.display = "none";
    setCount(0);
    setTime(60);
    setTimerIsRunning(true);
  }

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

  return (
    <section id="successModal" className={styles.modal}>
      <div className={styles.modal_win}>
        <h6>You saved them all! </h6>
        <div className={styles.success_words}>
          <p className={styles.success_words_individual}>
            And it only took you {howfast} seconds.
          </p>
          <p className={styles.success_words_individual}>
            Phew. Now they get to go home and rest.
          </p>
        </div>
        <div>
          <p className={styles.faster}>Think you can do faster?</p>
          <button onClick={leave}>Try Again</button>
        </div>
      </div>
    </section>
  );
}

export default WinModal;
