import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import Item from './Item';

class Register extends React.Component {
  state = {
    total_price: 0,
    price: "",
    name: "",
    weight: "",
  }

  handlePriceInput = (event) => {
    let inputPrice = event.target.name;
    console.log("First call", inputPrice)
    inputPrice = event.target.value;
    console.log("Second call", inputPrice)
    this.setState({ price: inputPrice })
    console.log("price state", this.state.price)
  }

  handleNameInput = (event) => {
    let inputName = event.target.name;
    inputName = event.target.value;
    this.setState({ name: inputName })
    console.log("name state", this.state.name)
  }

  handleWeightInput = (event) => {
    let inputWeight = event.target.name;
    console.log("First call", inputWeight)
    inputWeight = event.target.value;
    console.log("Second call", inputWeight)
    this.setState({ weight: inputWeight })
    console.log("weight state", this.state.weight)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // this 👇 is the form data (captured above in handleChange) that we are sending to our rails api
    let item = new Item(this.state.price, this.state.name, this.state.weight)
    item.scan()
    console.log(item)
    // this 👇 clears inputTitle of the input field form
    this.setState({
      price: 0,
      name: "",
      weight: 0,
    });
  };



  render() {
    return(
      <Form
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <Input
          type="number"
          name="inputPrice"
          placeholder="enter the price"
          required
          value={this.state.price}
          onChange={this.handlePriceInput}
        />
        <Input
          type="text"
          name="inputName"
          placeholder="enter item name"
          required
          value={this.state.name}
          onChange={this.handleNameInput}
        />
        <Input
          type="number"
          name="inputWeight"
          placeholder="enter the weight"
          placeholder="enter item weight"
          required
          value={this.state.weight}
          onChange={this.handleWeightInput}
        />
        <div className="Button">
            <Button className="submitButton" type="submit">Add New Item</Button>
          </div>
      </Form>
    )
  }

}

export default Register;
