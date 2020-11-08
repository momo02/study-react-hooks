export const usePreventLeave = () => {
    //chrome에서 창을 닫으려 하면 "사이트에서 나가시겠습니까?"묻는 컨펌창이 뜬다.
    const listener = (event) => {
      event.preventDefault();
      return (event.returnValue = ""); //chrome의 경우에는 이렇게 해야 작동한다.
    };
    // cf. beforeunload 이벤트 -> window가 닫히기 전에 등록한 funtion이 실행됨.
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () =>
      window.removeEventListener("beforeunload", listener);
    return { enablePrevent, disablePrevent };
  };
  