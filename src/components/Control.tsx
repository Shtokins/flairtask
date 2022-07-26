import { useContext, useEffect, useRef } from "react";
import { Input, Popconfirm, Button } from "antd";
import { useState } from "react";
import { AppContext } from "../store/appContext";

const Control = () => {
  const [knockedPins, setKnockedPins] = useState("");
  const {
    currentFrameScore,
    currentFrame,
    currentThrow,
    knockPins,
    startNewGame,
    lastExtraThrow
  } = useContext(AppContext);

  const inputField: any = useRef(null);

  const [failedInput, setFailedInput] = useState("");

  useEffect(() => {
    if (failedInput) setTimeout(() => setFailedInput(""), 100);
  }, [failedInput]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const reg = /^\d{0,2}?$/;

    if (
      (reg.test(value) || value === "") &&
      (((!currentFrameScore || lastExtraThrow) && Number(value) <= 10) ||
        (currentFrameScore && Number(value) <= 10 - currentFrameScore))
    ) {
      setKnockedPins(value);
    } else {
      setFailedInput(value[value.length - 1]);
    }
  };

  const newGameDisabled = false;

  const knockPinsStart = () => {
    if (knockedPins !== "" && currentFrame <= 10) {
      knockPins(knockedPins);
      setKnockedPins("");
    }
  };

  const endGame: boolean = currentFrame > 10;

  const newGame = () => {
    startNewGame();
    if (inputField.current) inputField.current.focus();
  };

  return (
    <div className="main-control">
      {!endGame && (
        <>
          <div className="title">
            Current Frame:{" "}
            <strong>{currentFrame < 10 ? currentFrame : 10}</strong>
          </div>
          <div className="title">
            Current Frame Score: <strong>{currentFrameScore}</strong>
          </div>
          <div className="title">
            Ball #<strong>{currentThrow}</strong>
            {lastExtraThrow ? (
              <span className="extra-throw">EXTRA BALL!</span>
            ) : null}
          </div>
        </>
      )}
      <div className="user-control">
        {endGame ? (
          <div className="end-game">Game Over</div>
        ) : (
          <><div className="input-title">Knocked Pins: </div>
            <Input
              onChange={onChange}
              value={knockedPins + failedInput}
              onPressEnter={knockPinsStart}
              disabled={endGame}
              autoFocus
              ref={inputField}
              style={{ backgroundColor: failedInput ? "pink" : "transparent" }}
            />
            <Button
              onClick={knockPinsStart}
              disabled={knockedPins === "" || endGame}
            >
              Knock!
            </Button>
          </>
        )}
        <Popconfirm
          onConfirm={newGame}
          disabled={newGameDisabled}
          title="Are you sure you want to start a new game?"
        >
          <Button type="primary" disabled={newGameDisabled}>
            New Game
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Control;
