import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import Item from './Item';

class Register extends React.Component {
  state = {
    total_price: null,
    price: null,
    weight: null,
    name: "",
  }

  handleInput = event => {
    let inputName = event.target.name;
    inputName = event.target.value;
    this.setState({ name: inputName })
  }

  handleSubmit = event => {
    event.preventDefault();
    // this 👇 is the form data (captured above in handleChange) that we are sending to our rails api
    new Item(this.state.name)
    console.log(Item)
    // this 👇 clears inputTitle of the input field form
    this.setState({ name: "" });
  };



  render() {
    return(
      <Form
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <Input
          type="text"
          name="inputName"
          required
          value={this.state.name}
          onChange={this.handleInput}
        />
        <div className="Button">
            <Button className="submitButton" type="submit">Add New Item</Button>
          </div>
      </Form>
    )
  }

}

export default Register;
