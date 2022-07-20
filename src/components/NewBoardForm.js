import {React, useState} from 'react';
import PropTypes from 'prop-types';
import {DropdownButton, Form, Button} from 'react-bootstrap';
import './NewBoardForm.css'


const NewBoardForm = ({onAddBoard}) => {
  const [newBoardData, setNewBoardData] = useState({
    title: '',
    owner: '',
    color: '#fbf3bc'
  });

  const [isInvalidInput, setIsInvalidInput] = useState(
    {title: false,
    owner: false,
    color: false
    })

  const handleChange = (event) => {
    setNewBoardData({...newBoardData, [event.target.name]: event.target.value
    });
  };

  const handleClick = (event) => {
    setIsInvalidInput(
    {title: newBoardData.title !=='' ? false : true,
    owner: newBoardData.owner !=='' ? false : true,
    color: newBoardData.color !=='' ? false : true})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isInvalidInput.title && !isInvalidInput.owner){
      onAddBoard(newBoardData);
      setNewBoardData({
        title: '',
        owner: '',
        color: '#fbf3bc'
      });
    }else{
      console.log("Input Valid Data!")
    }

  };
  return (
    <>
      <DropdownButton align="end" title="New Board" id="dropdown-menu-align-end" variant="secondary">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" placeholder="Enter title" onChange={handleChange} value={newBoardData.title}/>
              <Form.Text className={isInvalidInput.title ? "show text-muted": "hide"}>
                Please enter a title!
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control name="owner"placeholder="Enter owner" onChange={handleChange} value={newBoardData.owner}/>
              <Form.Text className={isInvalidInput.owner ? "show text-muted": "hide"}>
                Please enter an owner!
              </Form.Text>
            </Form.Group>

            <fieldset>
            <Form.Group className="mb-3 color-picker">
              <Form.Label htmlFor="exampleColorInput">Select Color</Form.Label>
              <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue="#fbf3bc"
                title="Choose your color"
                onChange={handleChange}
                name="color"
              />
            </Form.Group>
            </fieldset>
            <Button onClick={handleClick} variant="success" type="submit" id="submit">
              Add
            </Button>
      </Form>
      </DropdownButton>
    </>
  );
};

NewBoardForm.propTypes = {
  onAddBoard: PropTypes.func.isRequired
};

export default NewBoardForm;