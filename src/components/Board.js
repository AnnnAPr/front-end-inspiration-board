import React from "react";
import PropTypes from "prop-types";
import "./Board.css";

const Board = ({
  boardId,
  title,
  owner,
  cards,
  onSelectBoard,
  deleteBoardCallback,
}) => {
  const onBoardClick = () => {
    console.log(title);
    console.log(boardId);
    onSelectBoard(boardId);
  };

  const onDeleteBoard = () => {
    deleteBoardCallback(boardId);
  };

  return (
    <>
      <section className="board-bubble">
        <button onClick={onBoardClick}>
          <h1>{boardId}</h1>
          <h2>Title: {title}</h2>
          <h3>Owner: {owner} </h3>
          <button className="remove-button" onClick={onDeleteBoard}>
            Remove
          </button>
        </button>
      </section>
    </>
  );
};

Board.propTypes = {
  boardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  cards: PropTypes.array,
  onSelectBoard: PropTypes.func.isRequired,
  deleteBoardCallback: PropTypes.func.isRequired,
};

export default Board;
