import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import Navigation from "./components/Navigation/container";
import CalendarBoard from "./components/calendarBoard/container";
import AddScheduleDialog from "./components/addScheduleDialog/container";
import CurrentScheduleDialog from "./components/currentScheduleDialog/container";
import rootReducer from "./redux/rootReducer";
import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware( thunk )));


const App = () => (
  <Provider store={ store }>
    <MuiPickersUtilsProvider utils={ DayjsUtils }>
      <Navigation/>
      <CalendarBoard/>
      <AddScheduleDialog/>
      <CurrentScheduleDialog/>
    </MuiPickersUtilsProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));