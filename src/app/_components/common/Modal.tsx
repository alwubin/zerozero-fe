import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="absolute left-7 top-9 z-10 flex cursor-pointer items-center">
        <X onClick={onClose} className="text-white" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Modal;
