import React, { Component, lazy, Suspense } from "react";
import { Route,  Switch} from "react-router-dom"
import NotFound from "./views/notfound/NotFound"
import { HeaderNav } from "./components/HeaderNav/HeaderNav"
import routes from "./services/routes"

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
            <Route exact path={routes.homePage} component={HomeView} />
            <Route exact path={routes.movies} component={Movies} />
            <Route path={routes.moviesOverview} component={OverView} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App
