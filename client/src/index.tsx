import * as React from "react";
import * as ReactDOM from "react-dom";

const Header = (): JSX.Element => (
  <h1>Text Here</h1>
)

ReactDOM.render(<Header />, document.getElementById("root"));

export default Header;