import React, {useState} from 'react';
import {DropdownButton, Form, Button} from 'react-bootstrap';
import './NewCardForm.css'
import PropTypes from 'prop-types';

const NewCardForm = ({onAddCard}) => {

  const [newCardData, setNewCardData] = useState({message: ''});

  const [isInvalidInput, setIsInvalidInput] = useState(
    {message: false});

  const handleChange = (event) => {setNewCardData({message: event.target.value})};

  const handleClick = (e) => {
    setIsInvalidInput({
      message: newCardData.message !== '' ? false : true
    })
  }

  const addNewCard = (e) => {
    e.preventDefault();
    if (!isInvalidInput.message) {
      onAddCard(newCardData)
      setNewCardData({message: ''})
    } else{
      console.log('Please input valid data')
    }
  };


  return (
    <>
    <DropdownButton align="end" title="New Card" id="dropdown-menu-align-end" variant="secondary">
        <Form onSubmit={addNewCard}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control placeholder="Enter message"
                          as="textarea"
                          className={newCardData.message.length === 0 || newCardData.message.length > 40 ? "input_more_40" : ""}
                          onChange={handleChange}
                          value={newCardData.message}/>

            <Form.Text className={isInvalidInput.message ? "show text-muted": "hide"}>   
              Please enter a message!
            </Form.Text>
          </Form.Group>
          <Button variant="success" type="submit" id="submit" onClick={handleClick}>
            Add
          </Button>

    </Form>
    </DropdownButton>
  </>
  )

}

NewCardForm.propTypes = {
  onAddCard: PropTypes.func.isRequired,
};

export default NewCardForm;