import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { TagIcon, SaveIcon, ChevronDownIcon } from '../icons'; // Using TagIcon for categories
import { RevenueCategory, ExpenseCategory } from '../../types';

export type CategoryType = 'revenue' | 'expense';

interface AddEditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<RevenueCategory | ExpenseCategory>, categoryType: CategoryType, parentId?: string) => void;
  existingCategory?: RevenueCategory | ExpenseCategory | null;
  categoryType: CategoryType;
  isSubcategory: boolean;
  parentCategory?: RevenueCategory | ExpenseCategory | null; // Used for displaying parent name and setting parentId
  allMainCategories: (RevenueCategory | ExpenseCategory)[]; // For selecting parent if changing
}

const AddEditCategoryModal: React.FC<AddEditCategoryModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    existingCategory,
    categoryType,
    isSubcategory,
    parentCategory,
    allMainCategories
}) => {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string | undefined>(parentCategory?.id);

  useEffect(() => {
    if (isOpen) {
      if (existingCategory) {
        setName(existingCategory.name);
        setDescription(existingCategory.description || '');
        setSelectedParentId(existingCategory.parentId || parentCategory?.id);
      } else {
        setName('');
        setDescription('');
        setSelectedParentId(parentCategory?.id);
      }
    }
  }, [isOpen, existingCategory, parentCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("O nome da categoria é obrigatório.");
      return;
    }
    if (isSubcategory && !selectedParentId && !parentCategory?.id) {
        alert("A categoria principal é obrigatória para subcategorias.");
        return;
    }

    const categoryData: Partial<RevenueCategory | ExpenseCategory> = {
      id: existingCategory?.id || `${categoryType}-cat-${Date.now()}`,
      name,
      description,
      parentId: isSubcategory ? (selectedParentId || parentCategory?.id) : undefined,
    };
    
    onSave(categoryData, categoryType, isSubcategory ? (selectedParentId || parentCategory?.id) : undefined);
    onClose();
  };
  
  let modalTitle = '';
  let modalSubtitle = '';
  const typeText = categoryType === 'revenue' ? 'Receita' : 'Despesa';

  if (existingCategory) {
    modalTitle = `Editar ${isSubcategory ? 'Subcategoria' : 'Categoria'} de ${typeText}`;
    modalSubtitle = `Atualize os detalhes da ${isSubcategory ? `subcategoria para '${parentCategory?.name || ''}'` : 'categoria'}.`;
  } else {
    modalTitle = `Nova ${isSubcategory ? 'Subcategoria' : 'Categoria'} de ${typeText}`;
    modalSubtitle = `Crie uma ${isSubcategory ? `nova subcategoria para '${parentCategory?.name || ''}'` : 'nova categoria principal'}.`;
  }


  const footerContent = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-200 hover:bg-gray-300 text-sorvetao-text-secondary font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 text-sm"
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="add-edit-category-form"
        className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2 text-sm"
      >
        <SaveIcon className="w-5 h-5" />
        <span>{existingCategory ? 'Salvar Alterações' : 'Criar Categoria'}</span>
      </button>
    </>
  );

  const filteredMainCategories = allMainCategories.filter(cat => 
    (categoryType === 'revenue' ? 'parentId' in cat === false || !cat.parentId : 'parentId' in cat === false || !cat.parentId) && // Basic check for main categories
    (existingCategory ? cat.id !== existingCategory.id : true) // Cannot be its own parent
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleIcon={<TagIcon className="w-6 h-6 text-sorvetao-primary" />}
      title={modalTitle}
      subtitle={modalSubtitle}
      footerContent={footerContent}
      maxWidth="max-w-lg"
    >
      <form id="add-edit-category-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Nome da {isSubcategory ? 'Subcategoria' : 'Categoria'}<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="categoryName"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder={isSubcategory ? "Ex: Vendas Online" : "Ex: Vendas Atacado"}
          />
        </div>
        
        {isSubcategory && (
          <div>
            <label htmlFor="parentCategoryId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                Categoria Principal<span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <select
                    id="parentCategoryId"
                    name="parentCategoryId"
                    value={selectedParentId || ''}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                    required
                    disabled={!!parentCategory && !existingCategory} // Disable if adding subcategory directly from a parent, unless editing
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                >
                    <option value="" disabled>Selecione a categoria principal</option>
                    {filteredMainCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="categoryDescription" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Descrição (Opcional)
          </label>
          <textarea
            id="categoryDescription"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Breve descrição da categoria ou subcategoria..."
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddEditCategoryModal;