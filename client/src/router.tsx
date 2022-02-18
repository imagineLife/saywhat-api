import React from "react"
import { BrowserRouter as Router,
  Routes,
  Route } from "react-router-dom";
  // Redirect
// import './index.css';

const Together = React.lazy(() =>  import('./routes/Together/ContextWrapper'))
const DashboardUI = React.lazy(() =>  import('./routes/DashboardUI/ContextWrapper'))

const ThisRouter = (): JSX.Element => {
  const [themeClass] = React.useState('dark');

  return(
    <React.Suspense fallback={<div>loading...</div>}>
        <div id="parent-div" className={`${themeClass}`}>
          <Router>
            <Routes>
              <Route path="/dashboardUI">
                <DashboardUI />
              </Route>
              <Route path="/">  
                <Together />
              </Route>
              {/* <Route path="/*" render={() => <Redirect to="/" noThrow/>} /> */}
              </Routes>
          </Router>
        </div>
    </React.Suspense>
  )
} 

export default ThisRouter