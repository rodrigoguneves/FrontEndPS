import React, { useState } from 'react';
import { RevenueCategory, ExpenseCategory } from '../../../types';
import { PencilIcon, TrashIcon, PlusCircleIcon, ChevronDownIcon, ChevronRightIcon } from '../../../components/icons';
import { CategoryType } from '../../../components/modals/AddEditCategoryModal';


interface CategoryListProps {
  categories: (RevenueCategory | ExpenseCategory)[];
  categoryType: CategoryType;
  onAddSubcategory: (parentCategory: RevenueCategory | ExpenseCategory) => void;
  onEditCategory: (category: RevenueCategory | ExpenseCategory, isSubcategory: boolean, parent?: RevenueCategory | ExpenseCategory) => void;
  onDeleteCategory: (categoryId: string, categoryName: string, hasSubcategories: boolean) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  categoryType,
  onAddSubcategory,
  onEditCategory,
  onDeleteCategory 
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const mainCategories = categories.filter(cat => !cat.parentId);

  if (mainCategories.length === 0) {
    return <p className="text-center text-sorvetao-text-secondary py-6">Nenhuma categoria principal cadastrada para {categoryType === 'revenue' ? 'Receitas' : 'Despesas'}.</p>;
  }

  return (
    <div className="space-y-4">
      {mainCategories.map(mainCat => {
        const subCategories = categories.filter(subCat => subCat.parentId === mainCat.id);
        const isExpanded = expandedCategories.has(mainCat.id);
        return (
          <div key={mainCat.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Main Category Item */}
            <div 
                className={`flex items-center justify-between p-4 border-b border-sorvetao-gray-light ${isExpanded && subCategories.length > 0 ? 'bg-sorvetao-pink-light' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="flex items-center">
                <button onClick={() => subCategories.length > 0 && toggleExpand(mainCat.id)} className="mr-2 p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={subCategories.length === 0}
                    aria-expanded={isExpanded}
                    aria-controls={`subcategories-${mainCat.id}`}
                    title={isExpanded ? "Recolher subcategorias" : "Expandir subcategorias"}
                >
                  {subCategories.length > 0 ? (
                    isExpanded ? <ChevronDownIcon className="w-5 h-5 text-sorvetao-primary" /> : <ChevronRightIcon className="w-5 h-5 text-sorvetao-text-secondary" />
                  ) : (
                    <span className="w-5 h-5 inline-block"></span> // Placeholder for alignment
                  )}
                </button>
                <div>
                    <h3 className="font-semibold text-sorvetao-text-primary">{mainCat.name}</h3>
                    {mainCat.description && <p className="text-xs text-sorvetao-text-secondary">{mainCat.description}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onAddSubcategory(mainCat)} 
                  title="Adicionar Subcategoria"
                  className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onEditCategory(mainCat, false)} 
                  title="Editar Categoria Principal"
                  className="p-2 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDeleteCategory(mainCat.id, mainCat.name, subCategories.length > 0)} 
                  title="Excluir Categoria Principal"
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subcategories List */}
            {isExpanded && subCategories.length > 0 && (
              <ul id={`subcategories-${mainCat.id}`} className="pl-8 pr-4 py-2 bg-white divide-y divide-sorvetao-gray-light">
                {subCategories.map(subCat => (
                  <li key={subCat.id} className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm text-sorvetao-text-primary">{subCat.name}</p>
                        {subCat.description && <p className="text-xs text-sorvetao-text-secondary">{subCat.description}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onEditCategory(subCat, true, mainCat)} 
                        title="Editar Subcategoria"
                        className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteCategory(subCat.id, subCat.name, false)} 
                        title="Excluir Subcategoria"
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
             {isExpanded && subCategories.length === 0 && (
                <p className="pl-12 py-3 text-sm text-sorvetao-text-secondary">Nenhuma subcategoria cadastrada.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;