import { useEffect, useId, useRef, useState } from 'react';
import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import Button from './components/Button';

const ModalFormPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    github: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const experienceOptions = [
    { value: '0', label: '0-3년' },
    { value: '1', label: '4-7년' },
    { value: '2+', label: '8년 이상' },
  ];

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalTitleRef = useRef<HTMLHeadingElement>(null);
  const errorAnnouncementRef = useRef<HTMLDivElement>(null);
  const modalTitleId = useId();
  const modalDescId = useId();
  const nameId = useId();
  const emailId = useId();
  const experienceId = useId();
  const githubId = useId();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setIsSubmitting(false);
    buttonRef.current?.focus();
  };

  const validateForm = (data: typeof formData) => {
    const newErrors: Record<string, string> = {};

    // 이름 검증
    if (!data.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (data.name.trim().length < 2) {
      newErrors.name = '이름은 최소 2글자 이상 입력해주세요.';
    }

    // 이메일 검증
    if (!data.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = '올바른 이메일 형식을 입력해주세요.';
      }
    }

    // 경력 검증
    if (!data.experience) {
      newErrors.experience = '경력 연차를 선택해주세요.';
    }

    // GitHub 링크 검증 (선택사항이지만 입력했을 경우)
    if (data.github.trim()) {
      const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-_]+\/?$/;
      if (!githubRegex.test(data.github)) {
        newErrors.github = '올바른 GitHub 링크 형식을 입력해주세요. (예: https://github.com/username)';
      }
    }

    return newErrors;
  };

  const announceErrors = (errorMessages: string[]) => {
    if (errorAnnouncementRef.current && errorMessages.length > 0) {
      errorAnnouncementRef.current.textContent = `입력 오류가 있습니다. ${errorMessages.join(', ')}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const errorMessages = Object.keys(validationErrors).map(key => validationErrors[key]);
      announceErrors(errorMessages);

      // 첫 번째 에러가 있는 필드로 포커스 이동
      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldElement = document.getElementById(
        firstErrorField === 'name' ? nameId :
        firstErrorField === 'email' ? emailId :
        firstErrorField === 'experience' ? experienceId :
        githubId
      );
      fieldElement?.focus();

      setIsSubmitting(false);
      return;
    }

    // 유효성 검사 통과 시
    setErrors({});
    console.log('Form submitted:', formData);

    // 성공 메시지 알림
    if (errorAnnouncementRef.current) {
      errorAnnouncementRef.current.textContent = '신청이 성공적으로 제출되었습니다.';
    }

    setTimeout(() => {
      closeModal();
      setFormData({ name: '', email: '', experience: '', github: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // 모달이 DOM에 렌더링된 후 포커스 이동
      setTimeout(() => {
        modalTitleRef.current?.focus();
      }, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      // Tab 키 포커스 트랩
      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.prototype.slice.call(focusableElements) as HTMLElement[];
        const firstElement = focusableArray[0];
        const lastElement = focusableArray[focusableArray.length - 1];

        if (e.shiftKey) {
          // Shift + Tab (역방향)
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab (정방향)
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
        onClick={openModal}
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
          (e.target as HTMLButtonElement).style.backgroundColor = '#3367d6';
        }}
        onMouseOut={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#4285f4';
        }}
        onFocus={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#3367d6';
        }}
        onBlur={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#4285f4';
        }}
        aria-label="신청 폼 작성하기 모달 열기"
      >
        🚀 신청 폼 작성하기
      </button>

      {isModalOpen && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          aria-hidden="true"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={modalDescId}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <h2
                ref={modalTitleRef}
                id={modalTitleId}
                tabIndex={-1}
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#333',
                  outline: 'none',
                }}
              >
                신청 폼
              </h2>
            </div>

            <p
              id={modalDescId}
              style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px' }}
            >
              이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
            </p>

            {/* ARIA 라이브 영역 - 스크린리더 알림용 */}
            <div
              ref={errorAnnouncementRef}
              aria-live="polite"
              aria-atomic="true"
              style={{
                position: 'absolute',
                left: '-10000px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
              }}
            />

            <form onSubmit={handleSubmit}>
              <FormInput
                ref={firstInputRef}
                id={nameId}
                label="이름 / 닉네임"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                error={errors.name}
              />

              <FormInput
                id={emailId}
                label="이메일"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={errors.email}
              />

              <FormSelect
                id={experienceId}
                label="FE 경력 연차"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                options={experienceOptions}
                required
                error={errors.experience}
              />

              <FormInput
                id={githubId}
                label="GitHub 링크 (선택)"
                name="github"
                type="url"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
                error={errors.github}
              />

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                }}
              >
                <Button variant="secondary" onClick={closeModal} disabled={isSubmitting}>
                  취소
                </Button>
                <Button type="submit" variant="primary" loading={isSubmitting}>
                  제출하기
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalFormPage;
