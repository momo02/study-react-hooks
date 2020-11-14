import { useRef } from "react";

/**
 * 특정 element를 fullscreen으로 만들어주는 기능 제공.
 * - fullscreen 으로 만들고(triggerFull), 빠져나오는(exitFull) 함수 제공 및 각 함수에 대한 callback 수행.
 * @param callback
 */
export const useFullscreen = (callback) => {
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
