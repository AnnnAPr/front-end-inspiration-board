import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./CardList.css";

const CardList = ({
  selectedCards,
  boardTitle,
  deleteCard,
  addLike,
  boardColor,
}) => {
  const cardList = (selectedCards) => {
    return selectedCards.map((card) => {
      return (
        <Card
          key={card.cardId}
          boardId={card.boardId}
          cardId={card.cardId}
          message={card.message}
          likesCount={card.likesCount}
          deleteCard={deleteCard}
          addLike={addLike}
          color={boardColor}
        />
      );
    });
  };
  return (
    <section className="cards">
      <h2 className="cardsTitle">
        Cards for <span style={{ color: boardColor }}>{boardTitle}</span>
      </h2>
      {cardList(selectedCards)}
    </section>
  );
};

CardList.propTypes = {
  selectedCards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      boardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  boardTitle: PropTypes.string,
  addLike: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  boardColor: PropTypes.string,
};

export default CardList;
