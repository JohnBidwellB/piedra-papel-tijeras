import React from "react";
import Layout from "./hoc/Layout";
import { Switch, Route } from "react-router-dom";
import Error404 from "./components/Errors/404";
import * as actions from "./actions";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import { connect } from "react-redux";
import Game from "./containers/Game";
import Movements from "./components/Game/Movements";

const Routes = props => {
  return (
    <div className="app">
      <ConnectedRouter history={history}>
        <Layout>
          <Switch>
            <Route exact path={["/", "/game"]} component={Game} />
            <Route path="/movements" component={Movements} />
            <Route component={Error404} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: ""
  };
};

export default connect(mapStateToProps, actions)(Routes);
