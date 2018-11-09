import React from 'react';
import { Form, Input, Button } from 'reactstrap';

class Register extends React.Component {
  state = {
    total_price: 0,
    price: "",
    name: "",
    weight: "",
    discount_applied: false,
    receipt: [],
  }

  apply_discount = (event) => {
    event.preventDefault();
    this.setState({
      total_price: parseFloat(this.state.total_price) - parseFloat( this.state.total_price * .10 ),
      discount_applied: true,
    })
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
      {name: 'beaujolais', price: 7},
    ]
    // this is the result of a match search of inventory with the inputName
    const result = inventory.find( (wine) => wine.name === name );

    if(price > 0) {
      this.setState( prevState => ({
        total_price: parseFloat(prevState.total_price) + parseFloat(price),
        receipt: [...prevState.receipt, {name: "unknown", price: price} ],
      }))
    }
    else if(weight > 0 && result !== undefined) {
      let unit_price = parseFloat( weight * result.price )
      this.setState( (prevState) => ({
        total_price: parseFloat(prevState.total_price) + unit_price,
        receipt: [...prevState.receipt, {name: result.name, price: unit_price}  ]
      }))
    }
    else{
      alert("Whoopsie! Something went terribly terribly wrong...you need to enter a price OR a wine name + weight OR you didn't enter anything at all!! It could also be the case that the wine you entered isn't in our inventory :(");
    }
  }


  // These next three functions handle the inputs from the form-fields and do a setState
  // Could prob refactor into a single function via if-statements
  handlePriceInput = (event) => {
    let inputPrice = event.target.value;
    // console.log("Second call", inputPrice)
    this.setState({ price: inputPrice })
    // console.log("price state", this.state.price)
  }

  handleNameInput = (event) => {
    let inputName = event.target.value;
    this.setState({ name: inputName })
  }

  handleWeightInput = (event) => {
    let inputWeight = event.target.value;
    this.setState({ weight: inputWeight })
  }

  // Once the inputs have been handled and the Submit button is pressed, we call the scan() function and re-setState
  handleSubmit = (event) => {
    event.preventDefault();
    // scan()👇 is defined above and does much of the heavy lifting
    this.scan(this.state.price, this.state.name, this.state.weight)
    // this 👇 clears the form fields
    this.setState({
      price: "",
      name: "",
      weight: "",
    });
  };



  render() {
    const ten_percent_discount_threshold = 200

    if( this.state.total_price >= ten_percent_discount_threshold && this.state.discount_applied === false ) {
      return(
        <Form
          className="register-form"
          onSubmit={this.apply_discount}
        >
          <div className="Button">
            <Button className="submitButton" type="submit">Apply 10% discount!</Button>
          </div>
        </Form>
      )
    }
    else{
      return(
        <div className="register-form">
          <h5>🍷 WINE DIRECT BILL CALCULATOR 🍷</h5>
          <Form
            className="register-inputs"
            onSubmit={this.handleSubmit}
          >
            <Input
              type="number"
              className="input-box"
              name="inputPrice"
              placeholder="enter unit price"
              value={this.state.price}
              onChange={this.handlePriceInput}
            />
            <h2>OR</h2>
            <Input
              type="text"
              className="input-box"
              name="inputName"
              placeholder="enter item name"
              value={this.state.name}
              onChange={this.handleNameInput}
            />
            <span>
              <h2>+</h2>
            </span>
            <Input
              type="number"
              className="input-box"
              name="inputWeight"
              placeholder="bulk weight"
              value={this.state.weight}
              onChange={this.handleWeightInput}
            />
            <h1>👇 THEN 👇</h1>
            <div className="Button">
              <Button
                className="submitButton"
                type="submit"
              >
                Add Item
              </Button>
            </div>

            <div className="total-price-display">
              <h2>
                Receipt:
              </h2>
              {this.state.receipt.map( (item, index) => {
                return (<li key={index}>{item.name}: {item.price}</li>)
              })}

              <h2>
                Your Total:
              </h2>
              <h2>
                { this.state.total_price }
              </h2>
            </div>

          </Form>
        </div>
      )
    }
  }

}

export default Register;
