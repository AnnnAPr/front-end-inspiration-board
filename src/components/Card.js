import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ cardId, message, likesCount, deleteCard, addLike, color }) => {
  return (
    <div className="card__item" style={{ backgroundColor: color }}>
      <p className="message">{message}</p>
      {/* <p>{`Card ID: ${cardId}`}</p> */}
      <button
        className="liked"
        style={{ backgroundColor: color }}
        onClick={ ()=> addLike(cardId)}
      >
        {likesCount} ❤️
      </button>
      <button
        className="delete"
        style={{ backgroundColor: color }}
        onClick={() => deleteCard(cardId)}
      >
        delete
      </button>
    </div>
  );
};

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  addLike: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
};
export default Card;
