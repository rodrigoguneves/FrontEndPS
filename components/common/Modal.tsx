import React, { useEffect, useRef } from 'react';
import { XIcon } from '../icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleIcon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
  maxWidth?: string; // e.g., 'max-w-lg', 'max-w-xl', 'max-w-2xl'
  titleIconBgClass?: string; // New prop for icon background
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  titleIcon,
  title,
  subtitle,
  children,
  footerContent,
  maxWidth = 'max-w-lg',
  titleIconBgClass = 'bg-pink-100', // Default value
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      } else {
        dialog.close();
        document.body.style.overflow = '';
      }
    }
    return () => {
        document.body.style.overflow = ''; // Ensure scroll is restored on component unmount
    }
  }, [isOpen]);

  // Handle clicks outside the modal content to close, and Esc key
  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === dialog) {
        onClose();
      }
    };
    
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    if (isOpen) {
      dialog.addEventListener('click', handleClickOutside);
      dialog.addEventListener('keydown', handleKeydown);
    }

    return () => {
      dialog.removeEventListener('click', handleClickOutside);
      dialog.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, onClose]);


  if (!isOpen && !modalRef.current?.open) { // Don't render if not open and dialog is not already trying to animate close
    return null;
  }

  return (
    <dialog 
        ref={modalRef} 
        className={`bg-transparent p-0 backdrop:bg-black backdrop:bg-opacity-50 rounded-2xl shadow-xl ${maxWidth} overflow-visible`}
        onClose={onClose} // Handles closing via Esc key by default
    >
      <div className="bg-white rounded-2xl shadow-xl w-full flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${titleIconBgClass} flex items-center justify-center`} aria-hidden="true">
              {titleIcon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sorvetao-text-primary" id="modal-title">{title}</h3>
              <p className="text-sm text-sorvetao-text-secondary">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-sorvetao-text-secondary hover:text-sorvetao-primary p-1 -m-1 rounded-md focus:outline-none focus:ring-2 focus:ring-sorvetao-primary"
            aria-label="Fechar modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-2xl">
          {footerContent}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;