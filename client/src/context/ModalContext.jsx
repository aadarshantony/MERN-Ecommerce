import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => setModalType(type);
    const closeModal = () => setModalType(null);

    const values = {
        modalType,
        openModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
