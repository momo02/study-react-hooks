import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useHover = (onHover) => {
  if (typeof onHover !== "function") {
    return;
  }
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("mouseenter", onHover);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("mouseenter", onHover);
      }
    };
  }, []); //dependency 없음
  return element;
};

const App = () => {
  const sayHello = () => console.log("say Hello");
  const title = useHover(sayHello);

  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
