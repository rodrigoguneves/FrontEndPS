import React, { useState, useMemo } from 'react';
import { RevenueCategory, ExpenseCategory } from '../../../types';
import { PlusIcon, TagIcon, ClipboardListIcon as RevenueIcon, ClipboardListIcon as ExpenseIcon } from '../../../components/icons'; // Assuming you want specific icons
import AddEditCategoryModal, { CategoryType } from '../../../components/modals/AddEditCategoryModal';
import CategoryList from './CategoryList';

// Mock Data (replace with actual data fetching logic)
const mockInitialRevenueCategories: RevenueCategory[] = [
  { id: 'revCat1', name: 'Vendas de Produtos', description: 'Receitas provenientes da venda de sorvetes e açaí.' },
  { id: 'revCat1_sub1', name: 'Vendas Atacado', parentId: 'revCat1', description: 'Para revendedores e grandes volumes.' },
  { id: 'revCat1_sub2', name: 'Vendas Varejo Eventos', parentId: 'revCat1', description: 'Vendas diretas em feiras e eventos.' },
  { id: 'revCat2', name: 'Serviços', description: 'Aluguel de freezers, consultoria.' },
  { id: 'revCat3', name: 'Rendimentos Financeiros', description: 'Juros de aplicações, etc.' },
];

const mockInitialExpenseCategories: ExpenseCategory[] = [
  { id: 'expCat1', name: 'Custos de Produção', description: 'Matéria-prima, embalagens.' },
  { id: 'expCat1_sub1', name: 'Matéria Prima Direta', parentId: 'expCat1' },
  { id: 'expCat1_sub2', name: 'Embalagens', parentId: 'expCat1' },
  { id: 'expCat2', name: 'Despesas Operacionais', description: 'Aluguel, energia, água, manutenção.' },
  { id: 'expCat2_sub1', name: 'Aluguel Fábrica', parentId: 'expCat2' },
  { id: 'expCat3', name: 'Despesas Administrativas', description: 'Salários adm., material de escritório.' },
];


const CategoriasFinanceirasContent: React.FC = () => {
  const [activeCategoryType, setActiveCategoryType] = useState<CategoryType>('revenue');
  
  const [revenueCategories, setRevenueCategories] = useState<RevenueCategory[]>(mockInitialRevenueCategories);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(mockInitialExpenseCategories);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<RevenueCategory | ExpenseCategory | null>(null);
  const [isSubcategoryModal, setIsSubcategoryModal] = useState(false);
  const [parentForSubcategory, setParentForSubcategory] = useState<RevenueCategory | ExpenseCategory | null>(null);

  const currentCategories = activeCategoryType === 'revenue' ? revenueCategories : expenseCategories;
  const currentSetCategories = activeCategoryType === 'revenue' ? setRevenueCategories : setExpenseCategories;
  
  const allMainCategoriesForModal = useMemo(() => {
    return currentCategories.filter(cat => !cat.parentId);
  }, [currentCategories]);

  const handleOpenModalForNewMain = () => {
    setEditingCategory(null);
    setIsSubcategoryModal(false);
    setParentForSubcategory(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForNewSub = (parentCat: RevenueCategory | ExpenseCategory) => {
    setEditingCategory(null);
    setIsSubcategoryModal(true);
    setParentForSubcategory(parentCat);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (category: RevenueCategory | ExpenseCategory, isSub: boolean, parent?: RevenueCategory | ExpenseCategory) => {
    setEditingCategory(category);
    setIsSubcategoryModal(isSub);
    setParentForSubcategory(parent || null); // If it's a main category being edited, parent is null
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setIsSubcategoryModal(false);
    setParentForSubcategory(null);
  };

  const handleSaveCategory = (
    categoryData: Partial<RevenueCategory | ExpenseCategory>, 
    type: CategoryType,
    parentIdFromModal?: string
  ) => {
    const setCategories = type === 'revenue' ? setRevenueCategories : setExpenseCategories;
    
    setCategories(prev => {
      const existingIndex = prev.findIndex(cat => cat.id === categoryData.id);
      if (existingIndex > -1) { // Editing existing category
        const updatedCategories = [...prev];
        updatedCategories[existingIndex] = { ...prev[existingIndex], ...categoryData, parentId: parentIdFromModal || prev[existingIndex].parentId };
        return updatedCategories;
      } else { // Adding new category
        const newCategory = {
          id: categoryData.id || `${type}-cat-${Date.now()}`, // ensure ID
          name: categoryData.name || 'Nova Categoria',
          description: categoryData.description,
          parentId: parentIdFromModal,
        };
        return [newCategory as RevenueCategory | ExpenseCategory, ...prev];
      }
    });
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string, hasSubcategories: boolean) => {
    // Basic check, in a real app, check if transactions use this category.
    let confirmationMessage = `Tem certeza que deseja excluir a categoria "${categoryName}"?`;
    if (hasSubcategories) {
      confirmationMessage += `\n\nATENÇÃO: Esta categoria possui subcategorias que também serão excluídas.`;
    }
    // Add warning if category is in use by transactions (not implemented here)

    if (window.confirm(confirmationMessage)) {
      currentSetCategories(prev => 
        prev.filter(cat => cat.id !== categoryId && cat.parentId !== categoryId) // Also remove its subcategories
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-sorvetao-text-primary mb-3 sm:mb-0">Gerenciamento de Categorias Financeiras</h2>
        <button
          onClick={handleOpenModalForNewMain}
          className="bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition flex items-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova Categoria Principal de {activeCategoryType === 'revenue' ? 'Receita' : 'Despesa'}</span>
        </button>
      </div>

      {/* Sub-tabs for Revenue/Expense Categories */}
      <div className="mb-6">
        <div className="flex border-b border-sorvetao-gray-medium">
          <button
            onClick={() => setActiveCategoryType('revenue')}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
              ${activeCategoryType === 'revenue' ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
          >
            <RevenueIcon className={`w-5 h-5 ${activeCategoryType === 'revenue' ? 'text-sorvetao-primary' : ''}`} />
            <span>Categorias de Receita</span>
          </button>
          <button
            onClick={() => setActiveCategoryType('expense')}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
              ${activeCategoryType === 'expense' ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
          >
            <ExpenseIcon className={`w-5 h-5 ${activeCategoryType === 'expense' ? 'text-sorvetao-primary' : ''}`} />
            <span>Categorias de Despesa</span>
          </button>
        </div>
      </div>

      <CategoryList
        categories={currentCategories}
        categoryType={activeCategoryType}
        onAddSubcategory={handleOpenModalForNewSub}
        onEditCategory={handleOpenModalForEdit}
        onDeleteCategory={handleDeleteCategory}
      />

      {isModalOpen && (
        <AddEditCategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCategory}
          existingCategory={editingCategory}
          categoryType={activeCategoryType}
          isSubcategory={isSubcategoryModal}
          parentCategory={parentForSubcategory}
          allMainCategories={allMainCategoriesForModal}
        />
      )}
    </div>
  );
};

export default CategoriasFinanceirasContent;