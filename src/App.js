import { useState, useEffect } from "react";
import axios from "axios";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import "./App.css";

function App() {
  // STATE(boardsData: ListOfObjects, selectedBoard: id)
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardTitle, setBoardTitle] = useState();
  const [selectedCards, setSelectedCards] = useState([]);

  const URL = "https://inspo-board-server.herokuapp.com";
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
            };
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL + "/boards/" + selectedBoard + "/cards")
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
  }, [selectedBoard, boardsData]);

  //When currently selected board changes use useEffect with selectedBoard state as the dependency to make API call get CARDS from our GET cards enpoint in backend. The more data you have to display on your website, the less you want to store in the front end as state. It would be better to make more API calls for more specific data than to keep a giant nested object of data in the front end.

  const getBoardDataAndIndex = (selectedBoard) => {
    let selectedBoardData;
    let boardIndex;
    for (const [index, board] of boardsData.entries()) {
      if (board.boardId === selectedBoard) {
        selectedBoardData = board;
        boardIndex = index;
      }
    }
    return [selectedBoardData, boardIndex];
  };

  const addCard = (newCard) => {
    axios
      .post(URL + "/boards/" + selectedBoard + "/cards", newCard)
      .then((response) => {
        const [selectedBoardData, boardIndex] =
          getBoardDataAndIndex(selectedBoard);
        const updatedBoard = {
          ...selectedBoardData,
          cards: [
            ...selectedBoardData.cards,
            {
              boardId: response.data.board_id,
              cardId: response.data.card_id,
              message: response.data.message,
              likesCound: response.data.likes_count,
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

  const deleteBoard = (id) => {
    axios
      .delete(URL + "/boards/" + id)
      .then(() => {
        const newBoards = boardsData.filter((board) => board.id !== id);
        setBoardsData(newBoards);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Calling our API to update all of the data in front end as opposed to updating directly is more expensive(takes more time), but will show the most current data. This a design choice. Setting state directly in the front end with one board is faster, but might give an inconsistent view of list of boards if multiple users are interacting with it at once. You won't see current list of boards unless you refresh the browser.

  const getCurrentBoard = (id) => {
    const currentBoard = boardsData.filter((board) => board.boardId === id);
    setSelectedBoard(currentBoard[0].boardId);
    setBoardTitle(currentBoard[0].title);
  };

  const getCardIndex = (cardId) => {
    for (const [index, card] of selectedCards.entries()) {
      if (card.cardId === cardId) {
        return index;
      }
    }
  };

  // const onLikeCallback = (cardId) => {
  //   axios
  //   .put(URL + "/cards/" + cardId + "/like",
  //   {likes_count: selectedCards[getCardIndex(cardId)].likesCount + 1})
  //   .then((response) => {
  //     console.log(response.data);
  //     const updatedCardsData = [...selectedCards];
  //     updatedCardsData[getCardIndex(cardId)] = {...updatedCardsData[getCardIndex(cardId)], likesCount: updatedCardsData[getCardIndex(cardId).likesCount + 1};
  //     setSelectedCards(updatedCardsData);
  //     console.log(response);
  //     console.log(selectedCards);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  return (
    <main className="App">
      <nav>
        <h1>Inspiration Boards</h1>
        <NewBoardForm onAddBoard={addBoard} />
        <NewCardForm onAddCard={addCard} />
      </nav>
      <section className="boards__cards">
        <BoardList
          boards={boardsData}
          onSelectBoard={getCurrentBoard}
          deleteBoardCallback={deleteBoard}
        />
        <CardList selectedCards={selectedCards} boardTitle={boardTitle} />
      </section>
    </main>
  );
}

export default App;
