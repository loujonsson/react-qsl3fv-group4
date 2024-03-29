import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      totalPrice: this.props.model.getTotalMenuPrice()
      //totalPrice: this.props.model.getTotalMenuPrice()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      totalPrice: this.props.model.getTotalMenuPrice()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div className="Sidebar">
        <h3 class="text">My dinner</h3>
        <p class="text">
          People:
          <input class="input"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>

        <div class="sectionDiv">
          <p class="left">Dish name</p>
          <p class="right">Cost</p>
        </div>

        <div class="dishList">

        </div>

      <p class="totalPrice right">SEK</p>

      <div class="buttonDiv">
        <a class="confirmBtn">Confirm Dinner</a>
      </div>

      </div>
    );
  }
}

export default Sidebar;
