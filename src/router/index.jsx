import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from '../pages/Home'
import ImageDetails from '../pages/ImageDetails'

const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/image/:id",
      component: ImageDetails,
    }
];

const MainRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    { routes.map((route, i) => (
                        <Route exact key={i} path={route.path} component={route.component}/>
                    ))}
                </Switch>
            </div>
        </Router>
    )
  
}


export default MainRouter;