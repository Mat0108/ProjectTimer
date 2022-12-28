import React, { useState, createContext } from "react";

// create the Modal context with default selected Modal
export const ModalContext = createContext({
  displayModal: false,
  modal: <div/>,
});

// it provides the Modal context to app
export function ModalProvider({ children }) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modal, setModal] = useState(<div/>);
  const provider = {
    displayModal,
    modal,
    displayModalChange: (selected) => {
      setDisplayModal(selected);
    },
    modalChange: (modalComponent) => {
      setTimeout(() => {
        setModal(modalComponent);
      }, 100);
    },
  };

  return (
    <ModalContext.Provider value={provider}>{children}</ModalContext.Provider>
  );
}
