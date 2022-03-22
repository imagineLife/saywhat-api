import React from "react";
import ReactDOM from "react-dom";
import ThisRouter from "./Router";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should not render when no doc", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require(".");
    expect(ReactDOM.render).toHaveBeenCalledWith(<ThisRouter />, div);
  });
});