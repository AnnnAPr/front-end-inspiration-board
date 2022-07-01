import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
        boardId,
        cardId,
        message,
        countLike,
        selectedBoard,
        onLikeCallback,
        onDelete
}) => {

    return (
        <div className="card__item">
            <p>
                {message}
            </p>
            <button
                className="liked"
                onClick={() => onLikeCallback(cardId)}
            >
                {countLike} like
            </button>
            <button
                className="delete card"
                onClick={() => onDelete(cardId)}
            >
            delete card
            </button>
        </div>
    );
};

Card.propTypes = {
    card_id: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    count_like: PropTypes.number.isRequired,
    onLikeCallback: PropTypes.func.isRequired,
    onDeleteCallback: PropTypes.func.isRequired,
};
export default Card;