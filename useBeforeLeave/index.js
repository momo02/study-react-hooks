import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== "function") {
    return;
  }
  const handle = (event) => {
    //console.log(event);
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
    onBefore();
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    // componentWillUnMount 때는 이 이벤트를 지운다.
    return () => document.removeEventListener("mouseleave", handle);
  }, []); // 계속해서 이벤트가 추가되는것을 막기위해 2번째 파라미터로 [](빈 dependency) 추가.
  // component가 mount 되었을 때 단 1번만 실행.
};

const App = () => {
  const begForLife = () => console.log("Pls dont leave");
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
