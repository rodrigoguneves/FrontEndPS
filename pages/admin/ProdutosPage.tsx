import React, { useState, useMemo } from 'react';
import { PlusIcon, CubeIcon, PencilIcon, TrashIcon, SearchIcon, ChevronDownIcon, TagIcon, LeafIcon, IceCreamConeIcon, DotsHorizontalIcon } from '../../components/icons';
import AddProductModal from '../../components/modals/AddProductModal';
import AddCategoryModal from '../../components/modals/AddCategoryModal';

// Mock Data Structures
interface ProductEntry {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
}

interface ProductGroup {
  groupTitle: string;
  products: ProductEntry[];
}

const mockProductGroups: ProductGroup[] = [
  {
    groupTitle: 'Balde 10 Litros',
    products: [
      { id: 'p1_b10', name: 'Abacaxi', category: 'Picolé de Fruta', unit: 'Balde (10L)', price: 38.40 },
      { id: 'p2_b10', name: 'Amendoim', category: 'Potes', unit: 'Balde (10L)', price: 25.00 },
      { id: 'p3_b10', name: 'Amor em Pedaço', category: 'Baldes', unit: 'Balde (10L)', price: 120.00 },
      { id: 'p4_b10', name: 'Bombom', category: 'Picolé ao Leite', unit: 'Balde (10L)', price: 45.00 },
    ]
  },
  {
    groupTitle: 'Picolé Fruta',
    products: [
      { id: 'p5_pf', name: 'Abacaxi', category: 'Picolé de Fruta', unit: 'Unidade', price: 3.50 },
      { id: 'p6_pf', name: 'Morango', category: 'Picolé de Fruta', unit: 'Unidade', price: 3.50 },
      { id: 'p7_pf', name: 'Limão', category: 'Picolé de Fruta', unit: 'Unidade', price: 3.50 },
      { id: 'p8_pf', name: 'Uva', category: 'Picolé de Fruta', unit: 'Caixa c/10', price: 32.00 },
    ]
  },
  {
    groupTitle: 'Picolé Leite',
    products: [
      { id: 'p9_pl', name: 'Chocolate', category: 'Picolé ao Leite', unit: 'Unidade', price: 4.00 },
      { id: 'p10_pl', name: 'Coco', category: 'Picolé ao Leite', unit: 'Unidade', price: 4.00 },
      { id: 'p11_pl', name: 'Milho Verde', category: 'Picolé ao Leite', unit: 'Caixa c/10', price: 38.00 },
    ]
  }
];

const allCategoriesForFilter = [
  { id: 'all', name: 'Todas as Categorias' },
  { id: 'picole_fruta', name: 'Picolé de Fruta' },
  { id: 'picole_leite', name: 'Picolé ao Leite' },
  { id: 'potes', name: 'Potes' },
  { id: 'baldes', name: 'Baldes' },
];

interface ProductCategoryCardData {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string; strokeWidth?: string | number; }>;
}

const mockCategoriesForDisplay: ProductCategoryCardData[] = [
  { id: 'cat_balde_10l', name: 'Balde 10 Litros', description: 'Sorvete em massa', icon: LeafIcon },
  { id: 'cat_pote_1l', name: 'Pote 1 Litro', description: 'Sorvete em massa', icon: CubeIcon },
  { id: 'cat_pote_18l', name: 'Pote 1.8 Litros', description: 'Sorvete em massa', icon: IceCreamConeIcon },
  { id: 'cat_itens_avulsos', name: 'Itens Avulsos', description: 'Produtos Diversos', icon: DotsHorizontalIcon },
  { id: 'cat_picole_fruta', name: 'Picolé de Fruta', description: 'Refrescantes e naturais', icon: LeafIcon }, // Example
  { id: 'cat_picole_leite', name: 'Picolé ao Leite', description: 'Cremosos e saborosos', icon: IceCreamConeIcon }, // Example
];


const ProdutosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'produtos' | 'categorias'>('produtos'); // Default to 'produtos'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);


  const handleAddNew = () => {
    if (activeTab === 'produtos') {
      setIsAddProductModalOpen(true);
    } else {
      setIsAddCategoryModalOpen(true);
    }
  };

  const handleEditProduct = (productId: string) => alert(`Editar produto ID: ${productId}`);
  const handleDeleteProduct = (productId: string) => alert(`Excluir produto ID: ${productId}`);
  const handleEditCategory = (catId: string) => alert(`Editar categoria ID: ${catId}`);
  const handleDeleteCategory = (catId: string) => alert(`Excluir categoria ID: ${catId}`);

  const filteredProductGroups = useMemo(() => {
    if (!searchTerm && selectedCategoryFilter === 'all') {
      return mockProductGroups;
    }
    return mockProductGroups.map(group => {
      const filteredProducts = group.products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = selectedCategoryFilter === 'all' || product.category.toLowerCase().replace(/\s+/g, '_') === selectedCategoryFilter;
        return nameMatch && categoryMatch;
      });
      return { ...group, products: filteredProducts };
    }).filter(group => group.products.length > 0);
  }, [searchTerm, selectedCategoryFilter]);

  return (
    <>
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sorvetao-text-primary mb-4 sm:mb-0">
          {activeTab === 'produtos' ? 'Produtos' : 'Categorias'}
        </h1>
        <button 
          onClick={handleAddNew}
          className="bg-sorvetao-primary text-white px-5 py-3 rounded-xl hover:bg-opacity-90 transition-colors duration-150 flex items-center space-x-2 text-sm font-medium"
        >
          <PlusIcon className="w-5 h-5" />
          <span>{activeTab === 'produtos' ? 'Novo Produto' : 'Nova Categoria'}</span>
        </button>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-sorvetao-gray-medium">
          <button
            onClick={() => setActiveTab('produtos')}
            aria-current={activeTab === 'produtos' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
              ${activeTab === 'produtos' ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
          >
            <CubeIcon className={`w-5 h-5 ${activeTab === 'produtos' ? 'text-sorvetao-primary' : ''}`} />
            <span>Produtos</span>
          </button>
          <button
            onClick={() => setActiveTab('categorias')}
            aria-current={activeTab === 'categorias' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
              ${activeTab === 'categorias' ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
          >
            <TagIcon className={`w-5 h-5 ${activeTab === 'categorias' ? 'text-sorvetao-primary' : ''}`} />
            <span>Categorias</span>
          </button>
        </div>
      </div>

      {activeTab === 'produtos' && (
        <div>
          {/* Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Pesquisar Produto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-sorvetao-gray-medium rounded-xl focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow duration-150"
                aria-label="Pesquisar Produto"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SearchIcon className="text-sorvetao-text-secondary" />
              </div>
            </div>
            <div className="relative sm:min-w-[200px]">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-sorvetao-gray-medium rounded-xl उपस्थिति-none appearance-none focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow duration-150 bg-white"
                aria-label="Filtrar por Categoria"
              >
                {allCategoriesForFilter.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDownIcon className="text-sorvetao-text-secondary" />
              </div>
            </div>
          </div>

          {/* Product Groups */}
          <div className="space-y-8">
            {filteredProductGroups.map((group) => (
              <div key={group.groupTitle} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="bg-sorvetao-gray-medium text-sorvetao-text-primary font-semibold px-6 py-3 text-lg rounded-t-xl">
                   {group.groupTitle}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-sorvetao-pink-light">
                      <tr>
                        {['Produto', 'Categoria', 'Unidade', 'Preço', 'Ações'].map(header => (
                          <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sorvetao-gray-light">
                      {group.products.map((product) => (
                        <tr key={product.id} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sorvetao-text-primary">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">{product.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">{product.unit}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-2">
                              <button onClick={() => handleEditProduct(product.id)} title="Editar" className="p-2 rounded-full text-sorvetao-text-secondary hover:bg-sorvetao-pink-light hover:text-sorvetao-primary transition-colors">
                                <PencilIcon className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleDeleteProduct(product.id)} title="Excluir" className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors">
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                 {group.products.length === 0 && (
                    <p className="text-center py-6 text-sorvetao-text-secondary">Nenhum produto encontrado neste grupo com os filtros atuais.</p>
                  )}
              </div>
            ))}
             {filteredProductGroups.length === 0 && (
                <p className="text-center py-10 text-sorvetao-text-secondary text-lg">Nenhum produto encontrado com os filtros atuais.</p>
              )}
          </div>
        </div>
      )}

      {activeTab === 'categorias' && (
        <div className="bg-sorvetao-secondary-bg p-4 sm:p-6 rounded-2xl mt-[-1px]"> {/* Applied light blue background here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategoriesForDisplay.map((category) => (
              <div 
                key={category.id} 
                className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-between transition-all hover:shadow-xl"
                role="listitem"
                aria-labelledby={`category-name-${category.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center" aria-hidden="true">
                    <category.icon className="w-6 h-6 text-sorvetao-primary" strokeWidth={category.icon === LeafIcon || category.icon === DotsHorizontalIcon ? 1.5 : 2} />
                  </div>
                  <div>
                    <h3 id={`category-name-${category.id}`} className="text-lg font-semibold text-sorvetao-text-primary">{category.name}</h3>
                    <p className="text-sm text-sorvetao-text-secondary mt-0.5">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    onClick={() => handleEditCategory(category.id)} 
                    title={`Editar categoria ${category.name}`}
                    aria-label={`Editar categoria ${category.name}`}
                    className="p-2 rounded-full text-sorvetao-text-secondary hover:bg-sorvetao-pink-light hover:text-sorvetao-primary transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)} 
                    title={`Excluir categoria ${category.name}`}
                    aria-label={`Excluir categoria ${category.name}`}
                    className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {mockCategoriesForDisplay.length === 0 && (
            <div className="text-center py-10">
                <TagIcon className="w-12 h-12 text-sorvetao-gray-medium mx-auto mb-3" />
                <p className="text-sorvetao-text-secondary text-lg">Nenhuma categoria encontrada.</p>
                <p className="text-sm text-sorvetao-text-secondary mt-1">Clique em "Nova Categoria" para adicionar a primeira.</p>
            </div>
          )}
        </div>
      )}
    </div>

    <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} />
    <AddCategoryModal isOpen={isAddCategoryModalOpen} onClose={() => setIsAddCategoryModalOpen(false)} />
    </>
  );
};

export default ProdutosPage;