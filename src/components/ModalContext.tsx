import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

interface ModalContextType {
  isOpen: boolean;
  openModal: () => Promise<FormData | null>;
  closeModal: (result?: FormData | null) => void;
  modalProps: {
    resolve?: (value: FormData | null) => void;
  };
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<{ resolve?: (value: FormData | null) => void }>({});

  const openModal = (): Promise<FormData | null> => {
    return new (window as any).Promise((resolve: (value: FormData | null) => void) => {
      setModalProps({ resolve });
      setIsOpen(true);
    });
  };

  const closeModal = (result: FormData | null = null) => {
    setIsOpen(false);
    if (modalProps.resolve) {
      modalProps.resolve(result);
    }
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
};

// 편의 함수 - 전역에서 사용 가능
export const openFormModal = () => {
  // 이 함수는 hook 외부에서 사용할 수 있도록 별도 구현이 필요
  throw new Error('openFormModal must be called within a component that has access to ModalContext');
};