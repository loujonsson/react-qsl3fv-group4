import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import Search from "../Search/Search";
import "./SelectDish.css";

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">

        <div id="flexRow">
          <div>
            {/* We pass the model as property to the Sidebar component */}
            <Sidebar model={this.props.model} />
          </div>

          <div id="flexColumn">
            <Search />
            <h2>This is the Select Dish screen</h2>
            <Dishes />

          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
