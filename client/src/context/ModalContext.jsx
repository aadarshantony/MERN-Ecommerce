import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    modalName: null,
    productId: null,
  });

  const openModal = (modalName, productId = null) => {
    setModalConfig({ modalName, productId });
  };

  const closeModal = () => {
    setModalConfig({ modalName: null, productId: null });
  };

  return (
    <ModalContext.Provider value={{ modalConfig, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
