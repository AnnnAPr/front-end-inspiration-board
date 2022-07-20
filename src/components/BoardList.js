import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

const BoardList = ({ boards, onSelectBoard, selectedBoardId }) => {
  const boardComponents = boards.map((board) => {
    return (
      <ul key={board.boardId}>
        <Board
          boardId={board.boardId}
          title={board.title}
          owner={board.owner}
          cards={board.cards}
          color={board.color}
          onSelectBoard={onSelectBoard}
          selectedBoardId={selectedBoardId}
          boards={boards}
        />
      </ul>
    );
  });

  return (
    <section className="boardsContainer">
      <h2 className="boardsTitle">Boards</h2>
      <ul>{boardComponents}</ul>
    </section>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectBoard: PropTypes.func.isRequired,
  selectedBoardId: PropTypes.func,
};

export default BoardList;
