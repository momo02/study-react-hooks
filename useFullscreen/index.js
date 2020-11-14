import React, { useRef } from "react";
import ReactDOM from "react-dom";

/**
 * 특정 element를 fullscreen으로 만들어주는 기능 제공.
 * - fullscreen 으로 만들고(triggerFull), 빠져나오는(exitFull) 함수 제공 및 각 함수에 대한 callback 수행.
 * @param callback
 */
const useFullscreen = (callback) => {
  const element = useRef();
  const runCb = (isFull) => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };
  // browser 에 따라 fullscreen, close fullscreen 요청 함수명이 다르다.
  /* View in fullscreen */
  const openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullSreen) {
      /* firefox */
      elem.mozRequestFullSreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* Microsoft(IE11) */
      elem.msRequestFullscreen();
    }
  };
  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullSreen) {
      /* firefox */
      document.mozCancelFullSreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* Microsoft(IE11) */
      document.msExitFullscreen();
    }
  };
  const triggerFull = () => {
    //해당 element가 존재한다면
    if (element.current) {
      openFullscreen(element.current);
    }
    runCb(true);
  };
  const exitFull = () => {
    //cf. fullscreen을 요청할땐 element와 함께 requestFullScreen을 사용.
    // fullscreen에서 빠져나올땐 document를 사용해서 빠져나온다.
    closeFullscreen();
    runCb(false);
  };
  return { element, triggerFull, exitFull };
};

const App = () => {
  // callback 함수를 전달하여 각 이벤트(fullscreen, exit fullscreen)에 어떻게 반응할지,
  // 각 이벤트 이후 수행할 작업을 처리할수 있다.
  const onFulls = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen(onFulls);
  return (
    <div className="App" style={{ height: "1000vh" }}>
      {/* 원하는 모든 element를 가져와서 full screen으로 만들수 있다. */}
      <div ref={element}>
        <img
          src="https://omgcheckitout.com/wp-content/uploads/2016/12/http-akns-images-eonline-com-eol_images-entire_s-1.jpeg"
          alt="demoImg"
        />
        <button onClick={exitFull}>Exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make fullscreen</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
