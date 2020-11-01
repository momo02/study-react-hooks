import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// 클래스 컴포넌트에서의 componentDidMount, componentDidUpdate, componentWillUnmount가 useEffect로 실행된다.

// render가 발생할 때 마다(componentDidMount: 초기, componentDidUpdate: 매번) effect가 실행된다.
// useEffect의 첫번째 인자는 effect function, 두번째 인자는 deps(dependency) list 인데
// 만약 두번째 파라미터인 deps가 있다면 deps 리스트에 있는 값이 변경될 경우에만 effect가 활성화(실행) 된다.

const App = () => {
  // useEffect가 componentDidMount의 역할을 해서 새로고침을 하면 sayHello()를 실행하고
  // componentDidUpdate의 역할도 하기 때문에 버튼을 클릭하여 state의 값을 변경하면 sayHello()를 실행한다.
  const sayHello = () => console.log("hello");

  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);

  //useEffect(sayHello);
  // number값이 변경될 경우에만 effect함수를 실행시킴.
  useEffect(sayHello, [number]);

  // 만약 함수를 component가 Mount되었을때 1번만 실행시키고, 그리고나서 어떤 경우에도 실행시키고 싶지 않다면
  // 아래와 같이 빈 dependency를 전달해주면 된다.
  // useEffect(sayHello, []);

  return (
    <div className="App">
      <h1>Hi</h1>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
