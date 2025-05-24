import React, { useState } from 'react';
import Modal from '../common/Modal';
import { CubeIcon, SaveIcon } from '../icons'; // CubeIcon for title, SaveIcon for button

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ categoryName, description });
    onClose(); // Close modal after submission
  };

  const footerContent = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="bg-slate-400 hover:bg-slate-500 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 text-sm"
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="add-category-form" // Link to the form
        className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2 text-sm"
      >
        <SaveIcon className="w-5 h-5" />
        <span>Criar Categoria</span>
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleIcon={<CubeIcon className="w-6 h-6 text-sorvetao-primary" />}
      title="Adicionar Nova Categoria"
      subtitle="Create New Product Category"
      footerContent={footerContent}
      maxWidth="max-w-lg"
    >
      <form id="add-category-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Nome da Categoria<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-gray-100 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="e.g., Picolés Premium, Embalagens"
          />
        </div>

        <div>
          <label htmlFor="catDescription" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Descrição
          </label>
          <textarea
            id="catDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-gray-100 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Descrição opcional da categoria..."
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
