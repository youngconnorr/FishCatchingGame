import { useState, useEffect, useRef } from "react";
import DANCE from "./assets/dancing-cat-dance.gif";

type Fish = {
  id: number;
  left: number;
};

const Game = () => {
  const [maxScore, setMaxScore] = useState<number>(8);
  const [fish, setFish] = useState<Fish[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const gameInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const MAX_FISH = 2 + maxScore;

  const startGame = () => {
    if (gameInterval.current) clearInterval(gameInterval.current);
    setFish([]);
    setScore(0);
    setIsGameRunning(true);
    gameInterval.current = setInterval(() => {
      setFish((prevFish) => {
        if (prevFish.length < MAX_FISH) {
          spawnFish(prevFish);
        }
        return prevFish;
      });
    }, 1000);
  };

  const restartGame = () => {
    clearFish();
    startGame();
  };

  const goToHome = () => {
    console.log(isGameRunning);
    if (gameInterval.current) {
      console.log("inside");
      clearInterval(gameInterval.current);
      gameInterval.current = null;
      setIsGameRunning(false);
      console.log(gameInterval.current);
    }
  };

  const spawnFish = (prevFish: Fish[]) => {
    const newFish: Fish = {
      id: Date.now(),
      left: Math.random() * 100 + 1,
    };
    setFish([...prevFish, newFish]);
  };

  const catchFish = (id: number) => {
    setFish((prevFish) => prevFish.filter((fish) => fish.id !== id));
    setScore((prevScore) => prevScore + 1);
  };

  const clearFish = () => {
    setFish([]);
  };

  useEffect(() => {
    if (score >= maxScore) {
      clearFish();
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
    }
  }, [score]);

  return (
    <>
      <div className="screen-img layer1"></div>
      <div className="screen-img layer2"></div>

      {isGameRunning ? (
        <div className="norm-website">
          <div>
            {score >= maxScore ? (
              <>
                <div className="congrats-message">
                  <img src={DANCE} alt="" width="80px" />
                  <br />
                  <p style={{ marginBottom: "20px" }}>
                    Good catching {maxScore} fish!
                  </p>
                  <p>Ginger still wants more fish though...</p>
                  <div className="congrats-btns">
                    {/* <button
                      onClick={() =>
                        gameInterval.current ? restartGame() : startGame()
                      }
                      style={{ marginRight: "10px" }}
                    >
                      {gameInterval.current ? "Restart game" : "Start game"}
                    </button> */}
                    <button onClick={goToHome}>Home</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="ingame-text-container">
                  <div className="ingame-text">
                    <h1>Help Ginger catch {maxScore} fish!!</h1>
                    <p>Score: {score}</p>
                    <div style={{ display: "flex" }}>
                      <button
                        onClick={() =>
                          gameInterval.current ? restartGame() : startGame()
                        }
                        style={{ marginRight: "10px" }}
                      >
                        {gameInterval.current ? "Restart game" : "Start game"}
                      </button>
                      <button onClick={goToHome}>Home</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {score >= maxScore ? null : (
            <div className="game-container custom-cursor">
              <div className="fish-container">
                {fish.map((fish) => (
                  <div
                    key={fish.id}
                    className="fish"
                    style={{ left: `${fish.left}%` }}
                    onMouseEnter={() => catchFish(fish.id)}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="title-container">
            <div className="title-text">
              <h1>Catch fish to feed Ginger!</h1>
              <div className="set-fish-score">
                Ginger's hunger
                <button
                  onClick={() =>
                    setMaxScore((prev) => (prev - 1 > 2 ? prev - 1 : 2))
                  }
                  style={{ marginRight: "30px" }}
                >
                  😿
                </button>
                <p>{maxScore} Fishes</p>
                <button
                  onClick={() =>
                    setMaxScore((prev) => (prev + 1 > 15 ? prev : prev + 1))
                  }
                >
                  😺
                </button>
              </div>
              <button onClick={startGame} className="start">
                Start Game!
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Game;
