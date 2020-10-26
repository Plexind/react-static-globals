import React from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col } from "react-flexbox-grid";

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <StaticComponent />
        </Row>
        <Row>
          <StaticComponent />
        </Row>
      </Grid>
    );
  }
}

class StaticComponent extends React.Component {
  static _phrase = "hi there";

  static _phraseListeners = [];

  static _registerListener(listener) {
    StaticComponent._phraseListeners.push(listener);
  }

  static set phrase(newPhrase) {
    StaticComponent._phrase = newPhrase;
    StaticComponent._phraseListeners.forEach((listener) => listener());
  }

  static get phrase() {
    return StaticComponent._phrase;
  }

  constructor(props) {
    super(props);

    StaticComponent._registerListener(() => {
      this.forceUpdate();
    });
  }

  render() {
    return StaticComponent.phrase;
  }
}

ReactDOM.render(<App />, document.getElementById("container"));

setTimeout(() => {
  StaticComponent.phrase = "goodbye";
}, 1000);
