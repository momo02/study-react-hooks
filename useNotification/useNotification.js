export const useNotification = (title, options) => {
    //cf. https://developer.mozilla.org/ko/docs/Web/API/notification
    //Notification을 이용하면 브라우저에서 시스템 알람을 보내도록 할 수 있다.
    if (!("Notification" in window)) {
      return;
    }
    const fireNotif = () => {
      //알람 표시를 허용하지않은 상태이면
      if (Notification.permission !== "granted") {
        //시스템 알람이 울리도록 권한을 요청.
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        new Notification(title, options);
      }
    };
    return fireNotif;
  };
  