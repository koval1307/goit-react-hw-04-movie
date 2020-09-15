import React, { Component, lazy, Suspense } from "react";
import Spinner from "./components/Loader/Loader";

// import Movies from "./views/Movies/Movies"
import { Route,  Switch} from "react-router-dom"
import NotFound from "./views/notfound/NotFound"
// import HomeView from "./views/Home/Home"
// import { OverView } from "./views/movieOverview/MovieOverview";
import {HeaderNav} from "./components/HeaderNav/HeaderNav"

const Movies = lazy(() =>
  import("./views/Movies/Movies" /* webpackChunkName: "movies" */)
);
const HomeView = lazy(() =>
  import("./views/Home/Home" /* webpackChunkName: "home" */)
);
 
const OverView = lazy(() =>
  import("./views/movieOverview/MovieOverview" /* webpackChunkName: "overView" */)
);
export class App extends Component {
 


  render() {
    return (
      <>
        <Suspense fallback={<p>Still loading</p>}>
          <HeaderNav/>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/movies" component={Movies} />
            <Route path="/movies/:id" component={OverView} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App
