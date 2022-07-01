import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CardList.css';

const CardList = ({boardsData, onDelete, onLikeCallback, selectedBoard}) => {
  const chosenBoard = boardsData.filter(board => board.boardId === selectedBoard)
  const getCardList = () => {
    return chosenBoard.cards.map((card) => {
      return (
        <Card
          key={card.card_id}
          boardId={card.board_id}
          cardId={card.card_id}
          message={card.title}
          countLike={card.count_like}
          selectedBoard={card.selectedBoard}
          onLikeCallback={onLikeCallback}
          onDelete={onDelete}
        />
      );
    });
  }
  return (
    <>
      <h2>Display cards for {Card.board_id}</h2>;
      <ul> {getCardList}</ul>;
    </>
    

  )
};

CardList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number.isRequired,
      board_id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      count_like: PropTypes.number.isRequired,
    })
  ).isRequired,
  onLikeCallback: PropTypes.func.isRequired,
  onDeleteCallback: PropTypes.func.isRequired,
}; 

export default CardList;