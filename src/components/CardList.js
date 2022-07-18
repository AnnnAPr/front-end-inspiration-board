import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CardList.css';

const CardList = ({selectedCards, boardTitle, onLikeCallback, onDeleteCallback}) => {
  const cardList = (selectedCards) => {
    return selectedCards.map((card) => {
      return (
        <Card
          key={card.cardId}
          boardId={card.boardId}
          cardId={card.cardId}
          message={card.message}
          likesCount={card.likesCount}
          onLikeCallback={onLikeCallback}
          onDeleteCallback={onDeleteCallback}
        />
      );
    });
  };
  return (
    <section className="cards">
      <h2 className="cardsTitle">Cards for {boardTitle}</h2>
      {cardList(selectedCards)}
    </section>
  )
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      boardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onLikeCallback: PropTypes.func.isRequired,
  onDeleteCallback: PropTypes.func.isRequired,
}; 

export default CardList;