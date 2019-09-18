import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { Location } from "history";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import HomeScreen from "./pages/Homepage";
import AboutScreen from "./pages/Aboutpage";
import ContactScreen from "./pages/ContactScreen";

function App(props: RouteComponentProps): JSX.Element {
  const timeout: number = 400;
  const [depth, setDepth] = useState<number>(getDepth(props.location));

  function getDepth(location: Location) {
    return location.pathname.split("/").filter((n: String) => n !== "").length;
  }

  useEffect(() => {
    setDepth(getDepth(props.location));
  }, [getDepth(props.location)]);

  return (
    <TransitionGroup component="div" className="App">
      <CSSTransition
        key={props.location.key}
        timeout={timeout}
        classNames={
          (getDepth(props.location) - depth >= 0 ? "left" : "right") + " swipe"
        }
        mountOnEnter={false}
        unmountOnExit={true}
      >
        <Switch location={props.location}>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/about" component={AboutScreen} />
          <Route path="/contact" component={ContactScreen} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(App);
