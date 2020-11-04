import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();

  useEffect(() => {
    //useEffect 내부 function은 componentDidMount, componentDidUpdate때 호출.
    // 2번째 인자인 dependency가 [](없음) 이면 componentDidMount 일때만 호출.
    if (element.current) {
      //component가 mount되었을때(componentDidMount) event를 등록. dependency가 없기 때문에 이건 영원하다.
      element.current.addEventListener("click", onClick);
    }
    //componentWillUnmount 일때는 return 을 수행.
    //이떄 함수을 리턴한다면 해당 함수는 componentWillUnmount일 떄 호출된다.
    // 즉 component가 Unmount될때 (componentWillUnmount) 처리할 일을 return 함수에 구현하면 된다.
    return () => {
      if (element.current) {
        //componentWillUnMount 될 때 등록한 eventListener를 제거
        //(component가 mount되지 않았을때 eventListener가 있을 필요 X)
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); //dependency 없음
  return element;
};

const App = () => {
  const sayHello = () => console.log("say Hello");
  const title = useClick(sayHello);

  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
