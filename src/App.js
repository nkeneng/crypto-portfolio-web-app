import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));
// Pages 
const Home = React.lazy(() => import("./components/pages/Home"));
// prebuilt-pages
const Comingsoon = React.lazy(() => import("./components/pages/prebuilt-pages/Comingsoon"));
const Defaultlogin = React.lazy(() => import("./components/pages/prebuilt-pages/Defaultlogin"));
const Defaultregister = React.lazy(() => import("./components/pages/prebuilt-pages/Defaultregister"));

const Lockscreen = React.lazy(() => import("./components/pages/prebuilt-pages/Lockscreen"));




function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/prebuilt-pages/coming-soon" component={Comingsoon} />
          <Route path="/prebuilt-pages/default-login" component={Defaultlogin} />
          <Route path="/prebuilt-pages/default-register" component={Defaultregister} />
          <Route path="/prebuilt-pages/lock-screen" component={Lockscreen} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
