import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

const BoardList = ({ boards, onSelectBoard, selectedBoardId }) => {
  const boardComponents = boards.map((board) => {
    return (
      <ul key={board.boardId}>  {/*we don't ned this ul line right?*/}
        <Board
          boardId={board.boardId}
          title={board.title}
          owner={board.owner}
          cards={board.cards} //cards is not a board props, why can we use it here?
          color={board.color}
          onSelectBoard={onSelectBoard} //why in board.js, this function need a boardID para but here no?
          selectedBoardId={selectedBoardId}
          boards={boards} //how can we put boards when we map single board?
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
  selectedBoardId: PropTypes.number,
};

export default BoardList;
