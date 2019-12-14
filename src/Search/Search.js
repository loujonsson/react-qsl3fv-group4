import React, { Component } from "react";
import "./Search.css";

class Welcome extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
    };
  }

  render() {
    return (
      <div className="Search">
        <h3 class="text3">FIND A DISH</h3>

        <form>
          <input class="searchBar" type="text" placeholder = "Enter key words">
          </input>
        </form>

        <select class = "list">
          <option value=""></option>
          <option value="All">All</option>
          <option value="Main course">Main course</option>
          <option value="Side Dish">Side Dish</option>
          <option value="Dessert">Dessert</option>
          <option value="Appetizer">Appetizer</option>
        </select>

        <input class="submit" type="submit" value="search"></input>

      </div>
    );
  }
}

export default Welcome;
