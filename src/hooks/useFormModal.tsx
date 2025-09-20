import { useModal } from '../components/ModalContext';

export const useFormModal = () => {
  const { openModal } = useModal();

  const openFormModal = () => {
    return openModal();
  };

  return { openFormModal };
};
