import React, { useState } from "react";
import ReactDOM from "react-dom";

//useInput hooks에  검증 기능 추가.
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    //In ES6, is the same as : const value = event.target.value
    const {
      target: { value }
    } = event;
    //validator 함수의 결과(true/false)에 따라 값을 업데이트 할지 결정.
    //validator 함수에는 모든 검증기능을 사용할 수 있다!
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  //입력 글자수가 10보다 작거나 같을 경우에만 update.
  //const maxLen = (value) => value.length <= 10;
  //입력 값이 "@"를 포함하지 않으면 update. -> "@" 입력을 막는다.
  const excludeChar = (value) => !value.includes("@");

  const name = useInput("Mr.", excludeChar);
  console.log("name", { ...name });
  /**
   * cf)
   * <input placeholder="Name" {...name} />
   * {...name} -> 이렇게 쓰면 name 안에 있는 모든 것들을 풀어준다.
   * 즉 {...name} 는 {value: "Mr.", onChange: function(){~}} 가 되고
   * dom element(html 태그)에 사용할 경우, value="Mr." onChange="~" 인 것과 동일.
   */
  return (
    <div className="App">
      <h1>Hello</h1>
      {/* <input placeholder="Name" value={name.value} /> */}
      <input placeholder="Name" {...name} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
