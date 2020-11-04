export const useConfirm = (message = "", onConfirm, onCancel) => {
  //onConfirm 필수
  if (!onConfirm && typeof onConfirm !== "function") {
    return;
  }
  //onCancel 필수 아님(선택). 따라서 존재하는데 function이 아니면 return.
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};
