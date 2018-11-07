function Item(price, weight, name) {
  // constructor(price, weight, name) {
    this.price = price;
    this.weight = weight;
    this.name = name;
    this.scan = function() {
      if(this.price) {
        return this.price
      }
      else if(this.weight) {
        if(this.name === "apples"){
          return (this.weight * 2.49)
        }
        if(this.name === "Beaujolais"){
          return (this.weight * 15)
        }
      }
      else{
        alert("item not recognized");
      }
    }
    console.log("the name is " + this.price)
  // }
}

// to implement we would go
// new Item(8.99).scan

module.exports = Item;
