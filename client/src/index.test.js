import React from "react";
import ReactDOM from "react-dom";
import Header from "./index.tsx";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should not render when no doc", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("./index.tsx");
    expect(ReactDOM.render).toHaveBeenCalledWith(<Header />, null);
  });
});