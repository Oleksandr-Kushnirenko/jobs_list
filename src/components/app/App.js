import {lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import("../pages/MainPage"));

function App() {
    return (
        <Router>
            <div className="app">
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;