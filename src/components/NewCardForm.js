import React, {useState} from 'react';
import {DropdownButton, Form, Button, Row, Col} from 'react-bootstrap';
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
                          className={newCardData.message.length === 0 || newCardData.message.length > 5 ? "input input_more_40" : "input text-muted"}
                          onChange={handleChange}
                          value={newCardData.message}/>

            <Form.Text>   
            {/* className="text-muted" */}
              Please enter a card message!
            </Form.Text>
          </Form.Group>

          <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={100}>
              Select Card Color
            </Form.Label>
            <Col sm={100}>
              <Form.Check
                type="radio"
                label="green"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                className="green"
              />
              <Form.Check
                type="radio"
                label="orange"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                className='orange'
              />
              <Form.Check
                type="radio"
                label="blue"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                className="blue"
              />
            </Col>
          </Form.Group>
          </fieldset>
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