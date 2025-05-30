import "./popup.css";

const Popup = ({
  show,
  onClose,
  onStart,
  matches,
  score,
  setPopupState,
  setScore,
}) => {
  const handleButtonWin = () => {
    setPopupState(1);
    setScore(0);
    localStorage.setItem("gameEnd", true);
  };

  const handleButtonGameOver = () => {
    setPopupState(1);
    setScore(0);
    localStorage.setItem("gameEnd", true);
  };

  return (
    <div className="popup" data-show={show}>
      <div>
        <h1>New Game</h1>
        <hr />
        <div className="level-button" onClick={() => onStart(2)}>
          Match 2
        </div>
        <div className="level-button" onClick={() => onStart(3)}>
          Match 3
        </div>
        <div className="level-button" onClick={() => onStart(4)}>
          Match 4
        </div>
        <hr />
        {/* <div className="close-button" onClick={onClose}>
          <svg viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              d="M0 0 l20 20 M0 20 l20 -20"
            />
          </svg>
        </div> */}
      </div>
      <div>
        <h1>Game Over</h1>
        <hr />
        <div className="title">Match {matches}</div>
        <div className="score-board">Score: {score}</div>
        <hr />
        <div className="next-button" onClick={handleButtonGameOver}>
          <svg viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              d="M5 0 l10 10 l-10 10"
            />
          </svg>
        </div>
      </div>

      <div>
        <h1>You Win!</h1>
        <hr />
        <div className="title">Match {matches}</div>
        <div className="score-board">Score: {score}</div>
        <hr />
        <div className="next-button" onClick={handleButtonWin}>
          <svg viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              d="M5 0 l10 10 l-10 10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Popup;
