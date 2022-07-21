import React from "react";
import PropTypes from "prop-types";
import "./Board.css";

const Board = ({
  boardId, 
  title,
  owner,
  onSelectBoard,
  color,
  selectedBoardId,
}) => {
  const onBoardClick = () => {
    console.log(title); //where are these 3 console log inside our UI display?
    console.log(boardId);
    console.log(color);
    onSelectBoard(boardId);
  };

  return (
    <>
      <section className="board-bubble">
        <button
          onClick={onBoardClick}
          style={{
            backgroundColor: color, //how does this background color work? I mean how can it know where to get the color info?
            height: selectedBoardId === boardId ? "10rem" : "5rem",
          }}
        > 
          <h1 className="boardId">{boardId}</h1>  
          <h3>By {owner} </h3>
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
  color: PropTypes.string.isRequired,
  onSelectBoard: PropTypes.func,
  isSelected: PropTypes.bool, 
}
export default Board;
