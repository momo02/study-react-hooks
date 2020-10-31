import { useState } from "react";

//useInput hooks에  검증 기능 추가.
export const useInput = (initialValue, validator) => {
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
