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
    // inventory could equal the results that come back from an API call to our database FYI
    let inventory = [
      {name: 'riesling', price: 2},
      {name: 'chardonnay', price: 10},
      {name: 'sauvignon blanc', price: 5},
      {name: 'syrah', price: 15},
      {name: 'merlot', price: 8},
      {name: 'pinot noir', price: 12},
    ]
    const result = inventory.find( wine => wine.name === name );
    console.log("result!", result)
    if(price > 0) {
      this.setState( prevState => ({
        total_price: parseFloat(prevState.total_price) + parseFloat(price)
      }))
    }
    else if(weight > 0 && result != undefined) {
        this.setState( (prevState) => ({
          total_price: parseFloat(prevState.total_price) + parseFloat( weight * result.price )
        }))
    }
    else{
      alert("Whoopsie! Something went terribly terribly wrong...you need to enter a price OR a wine name + weight OR you didn't enter anything at all!! It could also be the case that the wine you entered isn't in our inventory :(");
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
