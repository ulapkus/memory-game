"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

function Game() {
  const [gameArr, setGameArr] = useState([
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

  const renderEasyMode = () => {
    return (
      <div>
        <section className={styles.all_content}>
          <section id="openModal" className={styles.modal}>
            <div className={styles.intro_modal}>
              <div className={styles.headings}>
                <h3>Oops!</h3>
                <h4>All the art got jumbled up.</h4>
              </div>
              <p className={styles.intro_modal_words}>
                Re-organize the paintings by clicking each one ONCE before
                someone finds out what happened.
              </p>
              <button onClick={exit}>Begin</button>
            </div>
          </section>
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
            <p className={styles.newgame} onClick={newgame}>
              New Game
            </p>
            <p className={styles.newgame} onClick={chooseMode}>
              Game Mode
            </p>
          </div>
          <div className={styles.time_and_count}>
            <h2>Time left: {time} seconds</h2>
            <p className={styles.current_count}>Art collected: {count}</p>
          </div>

          <section className={styles.images_easy} onClick={shuffleArray}>
            <img className={styles.neopet_img_easy} src={gameArr[0]} />
            <img className={styles.neopet_img_easy} src={gameArr[1]} />
            <img className={styles.neopet_img_easy} src={gameArr[2]} />
            <img className={styles.neopet_img_easy} src={gameArr[3]} />
            <img className={styles.neopet_img_easy} src={gameArr[4]} />
            <img className={styles.neopet_img_easy} src={gameArr[5]} />
            {/* <img className={styles.neopet_img} src={gameArr[6]} /> */}
            {/* <img className={styles.neopet_img} src={gameArr[7]} />
            <img className={styles.neopet_img} src={gameArr[8]} />
            <img className={styles.neopet_img} src={gameArr[9]} />
            <img className={styles.neopet_img} src={gameArr[10]} />
            <img className={styles.neopet_img} src={gameArr[11]} /> */}
          </section>

          <section id="loseModal" className={styles.modal} onClick={begintimer}>
            <div className={styles.modal_lose}>
              <div className={styles.lose_all}>
                <div className={styles.modal_lose_all_words}>
                  <h5>Evil Thade found them!</h5>
                  <p className={styles.modal_lose_words}>
                    You only saved {count} Neopet(s).
                  </p>
                  <button onClick={tryagain}>Try Again</button>
                </div>
              </div>
            </div>
          </section>
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
        </section>
      </div>
    );
  };

  const renderMediumMode = () => {
    return (
      <div>
        <section className={styles.all_content}>
          <section id="openModal" className={styles.modal}>
            <div className={styles.intro_modal}>
              <div className={styles.headings}>
                <h3>Oops!</h3>
                <h4>
                  It's your first day working at the museum and you fell asleep!
                </h4>
                <p className={styles.intro_modal_words_two}>
                  On top of that, you just discovered someone jumbled up all the
                  art.
                </p>
              </div>
              <p className={styles.intro_modal_words}>
                Make sure all the paintings are accounted for by clicking each
                one ONCE before your boss finds out what happened.
              </p>
              <button className={styles.button_intro} onClick={exit}>
                Begin
              </button>
            </div>
          </section>
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
              <p className={styles.newgame} onClick={newgame}>
                New Game
              </p>
              <p className={styles.newgame} onClick={chooseMode}>
                Game Mode
              </p>
            </div>
          </div>
          <div className={styles.time_and_count}>
            <p className={styles.time_medium}>Time left: {time} seconds</p>
            <p className={styles.current_count_medium}>
              Art collected: {count}
            </p>
          </div>

          <section className={styles.images} onClick={shuffleArray}>
            <img className={styles.neopet_img_medium} src={gameArr[0]} />
            <img className={styles.neopet_img_medium} src={gameArr[1]} />
            <img className={styles.neopet_img_medium} src={gameArr[2]} />
            <img className={styles.neopet_img_medium} src={gameArr[3]} />
            <img className={styles.neopet_img_medium} src={gameArr[4]} />
            <img className={styles.neopet_img_medium} src={gameArr[5]} />
            <img className={styles.neopet_img_medium} src={gameArr[6]} />
            <img className={styles.neopet_img_medium} src={gameArr[7]} />
            {/* <img className={styles.neopet_img} src={gameArr[8]} />
            <img className={styles.neopet_img} src={gameArr[9]} /> */}
            {/* <img className={styles.neopet_img} src={gameArr[10]} />
            <img className={styles.neopet_img} src={gameArr[11]} /> */}
          </section>

          <section id="loseModal" className={styles.modal} onClick={begintimer}>
            <div className={styles.modal_lose}>
              <h5>You got caught!</h5>
              <p className={styles.modal_lose_words}>
                You only accounted for {count} art piece(s).
              </p>
              <button onClick={tryagain}>Try Again</button>
            </div>
          </section>
          <section id="successModal" className={styles.modal}>
            <div className={styles.modal_win}>
              <h6>You did it!</h6>
              <div className={styles.success_words}>
                <p className={styles.success_words_individual}>
                  And it only took you {howfast} seconds.
                </p>
                <p className={styles.success_words_individual}>
                  Phew. That was close.
                </p>
              </div>
              <div>
                <p className={styles.faster}>Think you can do faster?</p>
                <button onClick={leave}>Try Again</button>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  };

  const renderHardMode = () => {
    return (
      <div>
        <section className={styles.all_content}>
          <section id="openModal" className={styles.modal}>
            <div className={styles.intro_modal}>
              <div className={styles.headings}>
                <h3>Oops!</h3>
                <h4>All the art got jumbled up.</h4>
              </div>
              <p className={styles.intro_modal_words}>
                Re-organize the paintings by clicking each one ONCE before
                someone finds out what happened.
              </p>
              <button onClick={exit}>Begin</button>
            </div>
          </section>
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
              <p className={styles.newgame} onClick={newgame}>
                New Game
              </p>
              <p className={styles.newgame} onClick={chooseMode}>
                Game Mode
              </p>
            </div>
          </div>
          <div className={styles.time_and_count}>
            <h2>Time left: {time} seconds</h2>
            <p className={styles.current_count}>Art collected: {count}</p>
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
              <div className={styles.lose_all}>
                <img
                  className={styles.evil_thade}
                  src="https://i.ibb.co/YhNbr74/Screenshot-2023-09-14-at-4-15-42-PM-removebg-preview-1.png"
                />
                <div className={styles.modal_lose_all_words}>
                  <h5>Evil Thade found them!</h5>
                  <p className={styles.modal_lose_words}>
                    You only saved {count} Neopet(s).
                  </p>
                  <button onClick={tryagain}>Try Again</button>
                </div>
              </div>
            </div>
          </section>
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
