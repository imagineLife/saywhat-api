import React, { Suspense } from "react"
import { BrowserRouter as Router,
  Routes,
  Route,
  Outlet 
} from "react-router-dom";
  // Redirect
// import './index.css';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Together = React.lazy(() =>  import("../Routes/Together/ContextWrapper"))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RootWrapper = (): any => <main id="main"><Outlet /></main>;

const ThisRouter = (): JSX.Element => (
    <div id="parent-div">
      <Router>
        <Routes>
          {/* ROOT wrapper */}
          <Route path="/" element={<RootWrapper />}>
            <Route index element={<Suspense fallback={<span />}>
              <Together />
              </Suspense>} 
            /> 
          </Route>
        </Routes>
      </Router>
    </div>
  ) 

export default ThisRouter