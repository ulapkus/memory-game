"use client";

import React, { useEffect } from "react";
import styles from "../page.module.css";
import { ModalContext } from "../page";

function GameModal() {
  const { value } = React.useContext(ModalContext);
  const { value2 } = React.useContext(ModalContext);

  const [gameMode, setGameMode] = value;
  const [timerIsRunning, setTimerIsRunning] = value2;

  useEffect(() => {
    function onstartup() {
      document.getElementById("openModal").style.display = "block";
    }
    onstartup();
  }, []);

  const exit = (mode) => {
    setGameMode(mode);
    const modemodal = document.getElementById("openModal");
    modemodal.style.display = "none";
    setTimerIsRunning(true);
  };

  return (
    <section id="openModal" className={styles.modal}>
      <div className={styles.intro_modal}>
        <h3>Oops!</h3>
        <h4>
          You fell asleep on your first day working at the museum and someone
          jumbled up all the art!
        </h4>
        <p className={styles.intro_modal_words}>
          Make sure all paintings are accounted for by clicking each one
           ONCE before your boss finds out what happened. Don't click the
          same one twice!
        </p>
        <p className={styles.difficulty_page}>Choose your level of difficulty:</p>
        <div className={styles.difficulty_container}>
          <button className={styles.buttons_page} onClick={() => exit("easy")}>
            Easy
          </button>
          <button
            className={styles.buttons_page}
            onClick={() => exit("medium")}
          >
            Medium
          </button>
          <button className={styles.buttons_page} onClick={() => exit("hard")}>
            Hard
          </button>
        </div>
      </div>
    </section>
  );
}

export default GameModal;
