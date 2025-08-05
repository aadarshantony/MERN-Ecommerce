import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    modalName: null,
    productId: null,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
    console.log("Cart toggled", isCartOpen);
  };

  const openModal = (modalName, productId = null) => {
    setModalConfig({ modalName, productId });
  };

  const closeModal = () => {
    setModalConfig({ modalName: null, productId: null });
  };

  return (
    <ModalContext.Provider
      value={{ modalConfig, openModal, closeModal, isCartOpen, toggleCart }}
    >
      {children}
    </ModalContext.Provider>
  );
};


export const useModal = () => useContext(ModalContext);
