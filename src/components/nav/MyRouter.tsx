import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import NavBar from "./NavBar";

interface MyRouterProps {}

const MyRouter: React.FC<MyRouterProps> = ({}) => {
  return (
    <Router>
      <div className="w-full h-full flex flex-col bg-primary dark:bg-gray-600 text-gray-500 dark:text-primary">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default MyRouter;
