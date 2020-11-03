import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    //head 내의 <title> => 브라우저 title
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  // 초기 컴포넌트가 mount 되었을 때 초기값("Loading...")을 title로 변경
  // 이후 title 이 업데이트 될때마다 updateTitle함수 호출.
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home"), 5000); //5초뒤에 title 변경.

  return (
    <div className="App">
      <h1>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
