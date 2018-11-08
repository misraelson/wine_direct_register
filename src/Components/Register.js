import React from 'react';
import { Form, Input, Button } from 'reactstrap';
// import Item from './Item';

class Register extends React.Component {
  state = {
    total_price: 0,
    price: "",
    name: "",
    weight: "",
  }

  scan = (price, name, weight) => {
    if(price > 0) {
      this.setState( prevState => ({
        total_price: parseFloat(prevState.total_price) + parseFloat(price)
      }))
    }
    else if(weight > 0) {
      if(name === "apples"){
        this.setState( (prevState) => ({
          total_price: parseFloat(prevState.total_price) + parseFloat( weight * 2.49 )
        }))
      }
      if(name === "beaujolais"){
        this.setState( (prevState) => ({
          total_price: parseFloat(prevState.total_price) + parseFloat( weight * 15 )
        }))
      }
    }
    else{
      alert("item not recognized");
    }
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
    this.scan(this.state.price, this.state.name, this.state.weight)
    // this 👇 clears inputTitle of the input field form
    this.setState({
      price: "",
      name: "",
      weight: "",
    });
  };



  render() {
    return(
      <div className="register-main">
        <Form
          className="Form"
          onSubmit={this.handleSubmit}
          >
            <Input
              type="number"
              name="inputPrice"
              placeholder="enter the price"
              value={this.state.price}
              onChange={this.handlePriceInput}
            />
            <Input
              type="text"
              name="inputName"
              placeholder="enter item name"
              value={this.state.name}
              onChange={this.handleNameInput}
            />
            <Input
              type="number"
              name="inputWeight"
              placeholder="enter the weight"
              value={this.state.weight}
              onChange={this.handleWeightInput}
            />
            <div className="Button">
              <Button className="submitButton" type="submit">Add New Item</Button>
            </div>
          </Form>
          <div>
            <h1>
              Total:
            </h1>
            <h2>
              { this.state.total_price }
            </h2>
          </div>
      </div>
    )
  }

}

export default Register;
