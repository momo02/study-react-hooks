import React, { useRef } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // * useRef
  //기본적으로 component의 어떤 부분(dom element)을 선택(참조)할 수 있는 방법.
  // document.getElementByID()를 사용하는것과 같다.
  const potato = useRef(); //input element를 참조. -> 즉 input dom element 에 접근할 수 있게 된다.
  //setTimeout(() => console.log(potato.current), 5000);
  setTimeout(() => potato.current.focus(), 5000);

  return (
    <div className="App">
      <h1>Hi</h1>
      <input ref={potato} placeholder="la" />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
