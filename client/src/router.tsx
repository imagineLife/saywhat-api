import React from "react"
import { BrowserRouter as Router,
  Switch,
  Route, 
  Redirect } from "react-router-dom";
// import './index.css';

const Together = React.lazy(() =>  import('./routes/Together/ContextWrapper'))
const DashboardUI = React.lazy(() =>  import('./routes/DashboardUI/ContextWrapper'))

const ThisRouter = (): JSX.Element => {
  const [themeClass] = React.useState('dark');

  return(
    <React.Suspense fallback={<div>loading...</div>}>
        <div id="parent-div" className={`${themeClass}`}>
          <Router>
            <Route path="/dashboardUI">
              <DashboardUI />
            </Route>
            <Route path="/">  
              <Together />
              </Route>
            <Redirect from="/*" to="/" noThrow/>
          </Router>
        </div>
    </React.Suspense>
  )
} 

export default ThisRouter