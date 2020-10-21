import React, { Component } from 'react';
import MainMenu from "./Components/MainMenu/MainMenu";
import Tetris from "./Components/Tetris/Tetris";
import "./App.scss";




export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleComponent: "MainMenu",
    }
  }



  setVisibleComponent(componentName) { this.setState({ ...this.state, visibleComponent: componentName }) }



  render() {
    return (
      <div className="App">
        {this.state.visibleComponent === "MainMenu" && <MainMenu setVisibleComponent={this.setVisibleComponent.bind(this)} />}

        {this.state.visibleComponent === "Tetris" && <Tetris />}
      </div>
    );
  }
}