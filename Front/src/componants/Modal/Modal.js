import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from '../../containers/Modal';

const Modal = ({ modalWidth, modalHeight,noAnimation }) => {
  const { displayModal, modal } = useContext(ModalContext);
  const [displayAnimation, setDisplayAnimation] = useState("animate-scale-zero");
  
  useEffect(() => {
    if (displayModal) {
      setDisplayAnimation("scale-0");

      setTimeout(() => {
        setDisplayAnimation("animate-scale");
      }, 50);

    }
    else {
      setDisplayAnimation("animate-sc");
    }
  }, [displayModal]);

  return (
    <div
      className={`${modalWidth ? modalWidth : "w-full"}
      ${modalHeight ? modalHeight : "h-[95%]"}
      relative p-5 ${!noAnimation && displayAnimation}`}
    >
      <div className="h-full w-full flex align-middle justify-center items-center content-center">{modal}</div>
      
    </div>
  );
};

export default Modal;
