import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

const BoardList = ({ boards, onSelectBoard, deleteBoardCallback }) => {
  const boardComponents = boards.map((board) => {
    return (
      <ul key={board.boardId}>
        <Board
          boardId={board.boardId}
          title={board.title}
          owner={board.owner}
          cards={board.cards}
          onSelectBoard={onSelectBoard}
          deleteBoardCallback={deleteBoardCallback}
        />
      </ul>
    );
  });

  return (
    <section className='boardsContainer'>
      <h2 className='boardsTitle'>Boards</h2>
      <ul>{boardComponents}</ul>
    </section>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectBoard: PropTypes.func.isRequired,
  deleteBoardCallback: PropTypes.func.isRequired,
};

export default BoardList;
