// src/components/Game.jsx
import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import FooterMenu from "./FooterMenu";
import Popup from "./Popup";
import "./game.css";

const types = ["0", "1", "2"];
const specials = ["bomb"];

const Game = () => {
  const stacksRef = useRef(null);
  const checkGameOverTimeout = useRef(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(null);
  const [undoHist, setUndoHist] = useState(null);
  const [popupState, setPopupState] = useState(1); //  0: new game, 1: game over, 2: win
  const [footerMenuState, setFooterMenuState] = useState(0);
  const [blocksBox, setBlocksBox] = useState([]);

  useEffect(() => {
    initStacks(3);

    return () => {
      clearTimeout(checkGameOverTimeout.current);
    };
  }, []);

  const initStacks = (n) => {
    console.log("level", n);

    setMatches(n);
    let localScore = 0;
    setScore(localScore);
    console.log("score", score);

    let localBlocksBox = [];
    for (let i = 0; i < 128 - 2; i++) {
      localBlocksBox.push(types[Math.floor(Math.random() * types.length)]);
    }
    for (let i = 0; i < 2; i++) {
      localBlocksBox.push(
        specials[Math.floor(Math.random() * specials.length)]
      );
    }
    localBlocksBox.sort(() => 0.5 - Math.random());
    setBlocksBox([...localBlocksBox]);

    if (stacksRef.current) {
      stacksRef.current.innerHTML = "";
      for (let s = 0; s < 8; s++) {
        const stack = document.createElement("div");
        stack.className = "stack";
        stack.dataset.extra = 8;
        stack.dataset.total = 8;
        stack.style.setProperty("--pct", 1);

        const svg = `<svg class="pie" viewBox="0 0 14 14"><circle cx="7" cy="7" r="3" stroke='rgba(255,255,255,.25)' fill='none' stroke-width='6' stroke-dasharray='18.85px'/></svg>`;
        stack.innerHTML = svg;

        for (let b = 0; b < 8; b++) {
          const face = document.createElement("div");
          const block = document.createElement("div");
          block.appendChild(face);
          block.className = "block";
          block.dataset.type = localBlocksBox.pop();
          stack.appendChild(block);
        }

        stacksRef.current.appendChild(stack);
      }
    }
  };

  const undo = () => {
    if (!undoHist) return;
    stacksRef.current.innerHTML = undoHist.stacks;
    setScore(undoHist.score);
    setUndoHist(null);
    updateScore(undoHist.score);
  };

  const recordUndo = () => {
    setUndoHist({
      stacks: stacksRef.current.innerHTML,
      score,
    });
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const getNeighbors = (
    block,
    rc = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
  ) => {
    const blocks = [];
    const si = Array.from(block.parentNode.parentNode.children).indexOf(
      block.parentNode
    );
    const bi = Array.from(block.parentNode.children).indexOf(block);

    for (let i = 0; i < rc.length; i++) {
      const ts = block.parentNode.parentNode.children[si + rc[i][0]];
      if (ts) {
        const tbi = bi - rc[i][1];
        if (tbi > 0 && ts.children[tbi]) {
          blocks.push(ts.children[tbi]);
        }
      }
    }
    return blocks;
  };

  const getMatchingBlocks = (block) => {
    const type = block.dataset.type;
    const blocks = [block];

    const addMatchingNeighbors = (b) => {
      const neighbors = getNeighbors(b);
      neighbors.forEach((n) => {
        if (!blocks.includes(n) && n.dataset.type === type) {
          blocks.push(n);
          addMatchingNeighbors(n);
        }
      });
    };

    addMatchingNeighbors(block);
    return blocks;
  };

  const getBombBlocks = (block) => {
    const rc = [
      [-2, -1],
      [-2, 0],
      [-2, 1],
      [-1, -2],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [-1, 2],
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
      [1, -2],
      [1, -1],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, -1],
      [2, 0],
      [2, 1],
    ];
    return getNeighbors(block, rc);
  };

  const changeBlockType = (blocks, type) => {
    blocks.forEach((block) => {
      block.dataset.type = type;
    });
  };

  const removeBlocks = (blocks) => {
    const stacksRec = stacksRef.current.getBoundingClientRect();

    const newScore = score + Math.pow(blocks.length * 5, 2);
    updateScore(newScore);

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const parent = block.parentNode;
      const index = Array.from(parent.children).indexOf(block);

      const rec = block.getBoundingClientRect();
      const dist = rec.height * 8 - (rec.y - stacksRec.y);
      const d = Math.random() * rec.height * 10 - rec.height * 5;
      const r = (d / (rec.height * Math.PI)) * 360;

      const fallBlock = block.cloneNode(true);
      fallBlock.className = "fall";
      fallBlock.style.left = `${rec.x}px`;
      fallBlock.style.top = `${rec.y}px`;
      fallBlock.style.setProperty("--ty", `${dist}px`);
      fallBlock.style.setProperty("--tx", `${d}px`);
      fallBlock.style.setProperty("--trz", `${r}deg`);
      fallBlock.style.setProperty("--del", `${Math.random() * 0.125}`);
      fallBlock.style.setProperty("--dur", `${0.125 + index * 0.125}`);

      document.body.appendChild(fallBlock);
      block.remove();

      if (parent.dataset.extra > 0) {
        const localBlocksBoxCopy = [...blocksBox];
        const newBlock = document.createElement("div");
        const newFace = document.createElement("div");
        newBlock.appendChild(newFace);
        newBlock.className = "block";
        newBlock.dataset.type = localBlocksBoxCopy.pop();
        parent.appendChild(newBlock);
        setBlocksBox(localBlocksBoxCopy);

        parent.dataset.extra -= 1;
        const pct = parent.dataset.extra / parent.dataset.total;
        parent.style.setProperty("--pct", pct);
      }

      block.remove();

      if (parent.children.length <= 1) {
        parent.classList.add("remove");
        parent.addEventListener("transitionend", (e) => {
          e.currentTarget.parentNode.removeChild(e.currentTarget);
        });
      }
    }

    clearTimeout(checkGameOverTimeout.current);
    checkGameOverTimeout.current = setTimeout(checkGameOver, 800);
  };

  const checkGameOver = () => {
    const stacks = stacksRef.current;

    if (!stacks || !stacks.children || stacks.children.length === 0) {
      setPopupState(3); // You Win!
      setFooterMenuState(0);
      return;
    }

    let blocks = Array.from(stacks.getElementsByClassName("block"));
    let gameOver = true;
    for (let i = 0; i < blocks.length; i++) {
      const current = blocks[i];

      if (current.dataset.type === "bomb") {
        gameOver = false;
        break;
      }

      const neighbors = getMatchingBlocks(current);
      if (neighbors.length >= matches) {
        gameOver = false;
        break;
      }
    }

    if (gameOver) {
      setPopupState(2); // Game Over
      setFooterMenuState(0);
    }
  };

  const removeStuff = (event) => {
    if (event.target.parentNode !== event.currentTarget) {
      recordUndo();

      const clickedBlock = event.target.parentNode;

      if (clickedBlock.dataset.type === "bomb") {
        const bombBlocks = getBombBlocks(clickedBlock);
        if (bombBlocks.length >= 1) {
          changeBlockType(bombBlocks, "explode");
          setTimeout(() => {
            changeBlockType(bombBlocks, "smoke");
            setTimeout(() => {
              changeBlockType(bombBlocks, "skull");
              removeBlocks(bombBlocks);
            }, 66);
          }, 66);
        }
      } else {
        const matchingBlocks = getMatchingBlocks(clickedBlock);
        if (matchingBlocks.length >= matches) {
          removeBlocks(matchingBlocks);
        }
      }
    }
  };

  return (
    <div id="game" className="game" data-blur={popupState ? "true" : "false"}>
      <Header score={score} onUndo={undo} disabled={!undoHist} />
      <div className="title"></div>
      <div ref={stacksRef} className="stacks" onClick={removeStuff}></div>
      <FooterMenu show={footerMenuState} />
      <Popup
        show={popupState}
        onClose={() => setPopupState(0)}
        onStart={(level) => {
          initStacks(level);
          setPopupState(0);
        }}
        setPopupState={setPopupState}
        matches={matches}
        score={score}
        setScore={setScore}
      />
    </div>
  );
};

export default Game;
