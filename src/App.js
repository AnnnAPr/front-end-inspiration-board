import { useState, useEffect } from "react";
import axios from "axios";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoardId, setselectedBoardId] = useState(null);
  const [boardTitle, setBoardTitle] = useState();
  const [boardColor, setBoardColor] = useState();
  const [selectedCards, setSelectedCards] = useState([]);

  const URL = process.env.REACT_APP_BACKEND_URL;

  // GET all boards and set boards data
  useEffect(() => {
    axios
      .get(URL + "/boards")
      .then((response) => {
        setBoardsData(() => {
          return response.data.map((board) => {
            return {
              title: board.title,
              boardId: board.board_id,
              owner: board.owner,
              cards: board.cards,
              color: board.color,
            };
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // GET all Cards for selected board
  useEffect(() => {
    axios
      .get(URL + "/boards/" + selectedBoardId + "/cards")
      .then((response) => {
        setSelectedCards(() => {
          return response.data.cards.map((card) => {
            return {
              cardId: card.card_id,
              message: card.message,
              likesCount: card.likes_count,
              boardId: card.board_id,
            };
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedBoardId, boardsData]);


  // GET selected Board ID
  const getBoardDataAndIndex = (selectedBoardId) => {
    let selectedBoardIdData;
    let boardIndex;
    for (const [index, board] of boardsData.entries()) {
      if (board.boardId === selectedBoardId) {
        selectedBoardIdData = board;
        boardIndex = index;
      }
    }
    return [selectedBoardIdData, boardIndex];
  };

  // POST a New Card to Selected Board
  const addCard = (newCard) => {
    axios
      .post(URL + "/boards/" + selectedBoardId + "/cards", newCard)
      .then((response) => {
        const [selectedBoardIdData, boardIndex] =
          getBoardDataAndIndex(selectedBoardId);
        const updatedBoard = {
          ...selectedBoardIdData,
          cards: [
            ...selectedBoardIdData.cards,
            {
              boardId: response.data.board_id,
              cardId: response.data.card_id,
              message: response.data.message,
              likesCount: response.data.likes_count,
            },
          ],
        };
        const updatedBoardsData = [...boardsData];
        updatedBoardsData[boardIndex] = updatedBoard;
        setBoardsData(updatedBoardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // POST a new Board
  const addBoard = (newBoard) => {
    axios
      .post(URL + "/boards", newBoard)
      .then((response) => {
        console.log(response.data);
        setBoardsData((oldBoards) => [
          ...oldBoards,
          {
            ...newBoard,
            boardId: response.data.board.board_id,
            cards: response.data.board.cards,
          },
        ]);
        console.log(response);
        console.log(boardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GET current Board ID
  const getCurrentBoard = (id) => {
    const currentBoard = boardsData.filter((board) => board.boardId === id);
    setselectedBoardId(currentBoard[0].boardId);
    setBoardTitle(currentBoard[0].title);
    setBoardColor(currentBoard[0].color);
  };

  // DELETE Card
  const deleteCard = (cardId) => {
    console.log("cardId >", cardId);
    axios
      .delete(URL + "/cards/" + cardId)
      .then((response) => {
        console.log("delete response", response.data);
        const newCardList = selectedCards.filter(
          (cardInList) => cardInList.cardId !== cardId
        );
        setSelectedCards(newCardList);
      })
      .catch((error) => console.log(error));
  };

  // UPDATE Likes of Card
  const addLike = (cardId) => {
    console.log("cardId", cardId);
    axios
      .put(URL + "/cards/" + cardId + "/like")
      .then((response) => {
        console.log("response >", response.data);
        const newCardList = selectedCards.map((cardInList) => {
          return cardInList.cardId === cardId
            ? { ...cardInList, likesCount: cardInList.likesCount + 1 }
            : cardInList;
        });
        console.log("newCardList", newCardList);

        setSelectedCards(newCardList);
      })
      .catch((error) => console.log(error));
  };

  // SORT Cards
  const sortById = (arr) => {
    const sorted = [...arr].sort((a, b) => {
      return a.cardId - b.cardId;
    });
    setSelectedCards(sorted);
  };

  const sortAlphabetically = (arr) => {
    const sorted = [...arr].sort((a, b) => {
      let lowerA = a.message.toLowerCase(),
        lowerB = b.message.toLowerCase();

      if (lowerA < lowerB) {
        return -1;
      }
      if (lowerA > lowerB) {
        return 1;
      }
      return 0;
    });
    setSelectedCards(sorted);
  };

  const sortByLikes = (arr) => {
    const sorted = [...arr].sort((a, b) => {
      return b.likesCount - a.likesCount;
    });
    setSelectedCards(sorted);
  };

  // Pass down Props
  return (
    <main className="App">
      <nav>
        <h1>Inspiration Boards</h1>
        <NewBoardForm onAddBoard={addBoard} />
        <NewCardForm onAddCard={addCard} />
      </nav>
      <nav>
        <h2>Sort Cards</h2>
        <Button variant="secondary" onClick={() => sortById(selectedCards)}>
          by Oldest to Newest
        </Button>
        <Button
          variant="secondary"
          onClick={() => sortAlphabetically(selectedCards)}
        >
          Alphabetically
        </Button>
        <Button variant="secondary" onClick={() => sortByLikes(selectedCards)}>
          by Number of "Likes"
        </Button>
      </nav>
      <section className="boards__cards">
        <BoardList
          boards={boardsData}
          onSelectBoard={getCurrentBoard}
          selectedBoardId={selectedBoardId}
        />
        <CardList
          selectedCards={selectedCards}
          boardTitle={boardTitle}
          boardColor={boardColor}
          deleteCard={deleteCard}
          addLike={addLike}
          sortById={sortById}
          sortAlphabetically={sortAlphabetically}
          sortByLikes={sortByLikes}
        />
      </section>
    </main>
  );
}

export default App;
