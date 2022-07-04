import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
    cardId,
    message,
    likesCount,
    boardId,
    onLikeCallback,
    onDeleteCallback,
    deleteCard,
    addLike
}) => {

    return (
        <div className="card__item">
            <p>
                {message}
            </p>
            <button
                className="liked"
                onClick={() => addLike(cardId)}
            >
                {likesCount} ❤️
            </button>
            <button
                className="delete"
                onClick={() => deleteCard(cardId)}
            >
            delete
            </button>
        </div>
    );
};

Card.propTypes = {
    cardId: PropTypes.number.isRequired,
    boardId: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    onLikeCallback: PropTypes.func.isRequired,
    onDeleteCallback: PropTypes.func.isRequired,
};
export default Card;