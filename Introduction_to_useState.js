import React, { useState } from "react";
import ReactDOM from "react-dom";

/**
 * hooks은 react의 state machine에 연결하는 기본적인 방법.
 * hooks은 함수형 프로그래밍(Funtional component)을 권장한다.
 *
 * 첫번째 hooks 인 useState에 대해서 알아보자.
 *
 * 이 hooks가 생기기전에는 state를 함수형 component에서 사용할 수 없었지만
 * hooks는 함수형 component에서도 state에 접근 가능하도록하며 사용 방법 또한 훨씬 편리해졌다.
 * */

const App = () => {
  const [item, setItem] = useState(1); //초기값 1로 설정
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>Increment</button>
      <button onClick={decrementItem}>Decrement</button>
    </div>
  );
};

/**
 * 기존의 Class component 방식으로 구현한 것과 비교.
 *  -> Class component는 this와 같은 문장 규칙과 Render와 같은 사용하는 방법을 고려해야 하지만
 *  hooks를 사용한다면 그런것을 신경안써도 된다. 코드가 훨씬 깔끔하고 간결해진다.
 */
class AppUgly extends React.Component {
  state = {
    item: 1
  };
  render() {
    const { item } = this.state;
    return (
      <div className="App">
        <h1>Hello {item}</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.incrementItem}>Increment</button>
        <button onClick={this.decrementItem}>Decrement</button>
      </div>
    );
  }
  incrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item + 1
      };
    });
  };
  decrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item - 1
      };
    });
  };
}
const rootElement = document.getElementById("root");
// ReactDOM.render(<AppUgly />, rootElement);
ReactDOM.render(<App />, rootElement);
