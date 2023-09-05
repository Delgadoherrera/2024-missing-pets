import React, { useEffect } from "react";
import { IonToast } from "@ionic/react";

const Toast = (setShowToast: any, message: any) => {
  console.log("TOAST");
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setShowToast]);

  return (
    <IonToast
      isOpen={true}
      message={message}
      position="bottom"
      duration={2000}
    />
  );
};

export default Toast;
