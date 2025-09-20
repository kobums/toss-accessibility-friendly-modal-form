import { useRef } from 'react';
import { ModalProvider } from './components/ModalContext';
import { useFormModal } from './hooks/useFormModal';
import FormModal from './components/FormModal';

const ModalFormContent = () => {
  const { openFormModal } = useFormModal();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    openFormModal()
      .then((result) => {
        if (result) {
          console.log('폼 제출 완료:', result);
          // 성공적으로 제출된 경우의 처리
        } else {
          console.log('폼 제출 취소됨');
          // 취소된 경우의 처리
        }
        // 모달이 닫힌 후 원래 버튼으로 포커스 복귀
        buttonRef.current?.focus();
      })
      .catch((error) => {
        console.error('모달 에러:', error);
        buttonRef.current?.focus();
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpenModal}
        style={{
          background: 'linear-gradient(135deg, #4285f4 0%, #343ea8ff 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          (e.target as HTMLButtonElement).style.background =
            'linear-gradient(135deg, #3367d6 0%, #2d3190 100%)';
        }}
        onMouseOut={(e) => {
          (e.target as HTMLButtonElement).style.background =
            'linear-gradient(135deg, #4285f4 0%, #343ea8ff 100%)';
        }}
        onFocus={(e) => {
          (e.target as HTMLButtonElement).style.background =
            'linear-gradient(135deg, #3367d6 0%, #2d3190 100%)';
        }}
        onBlur={(e) => {
          (e.target as HTMLButtonElement).style.background =
            'linear-gradient(135deg, #4285f4 0%, #343ea8ff 100%)';
        }}
        aria-label="신청 폼 작성하기 모달 열기"
      >
        🚀 신청 폼 작성하기
      </button>
    </div>
  );
};

const ModalFormPage = () => {
  return (
    <ModalProvider>
      <ModalFormContent />
      <FormModal />
    </ModalProvider>
  );
};

export default ModalFormPage;
