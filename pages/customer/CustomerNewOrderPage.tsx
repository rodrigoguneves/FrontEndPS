import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CubeIcon, SearchIcon, MugHotIcon, ArchiveBoxIcon, QuestionMarkCircleIcon, PuzzlePieceIcon,
  PlusIcon, MinusIcon, ShoppingCartIcon, ArrowRightCircleIcon, ChevronDownIcon, ChevronUpIcon, IconProps, XIcon
} from '../../components/icons';
import { ProductCategoryUIData, ProductInfo, CartItem, SaleUnitOption } from '../../types';
import Modal from '../../components/common/Modal'; // Import Modal

// Mock Data (assuming it's the same as before)
const mockProductCategories: ProductCategoryUIData[] = [
  {
    id: 'cat1', name: 'Potes e Copos', icon: MugHotIcon, itemCountBadge: 2,
    products: [
      { id: 'prod_copo_baunilha_120ml', baseId: 'copo_baunilha', name: 'Copo Baunilha 120ml', price: 2.50, unitLabel: 'R$2,50/un', categoryId: 'cat1', baseUnitMultiplier: 1 },
      { id: 'prod_copo_chocolate_120ml', baseId: 'copo_chocolate', name: 'Copo Chocolate 120ml', price: 2.80, unitLabel: 'R$2,80/un', categoryId: 'cat1', baseUnitMultiplier: 1 },
    ].sort((a,b) => a.price - b.price || a.name.localeCompare(b.name)),
  },
  {
    id: 'cat2', name: 'Baldes', icon: ArchiveBoxIcon, itemCountBadge: 1,
    products: [
      { id: 'prod_balde_flocos_2l', baseId: 'balde_flocos', name: 'Balde Flocos 2L', price: 22.00, unitLabel: 'R$22,00/un', categoryId: 'cat2', baseUnitMultiplier: 1 },
    ].sort((a,b) => a.price - b.price || a.name.localeCompare(b.name)),
  },
  {
    id: 'cat3', name: 'Picolés de Fruta', icon: QuestionMarkCircleIcon, itemCountBadge: 2, // 2 base products
    isPopsicleCategory: true,
    saleUnitOptions: [
      { id: 'unidades', label: 'Unidades', multiplier: 1 },
      { id: 'meias_caixas_12un', label: 'Meias Caixas (12un)', multiplier: 12 },
      { id: 'caixas_completas_24un', label: 'Caixas Completas (24un)', multiplier: 24 },
    ],
    products: [ // These are base products; price is per single unit
      { id: 'prod_picole_morango', baseId: 'picole_morango', name: 'Morango', price: 1.10, unitLabel: 'R$1,10/un', categoryId: 'cat3', baseUnitMultiplier: 1 },
      { id: 'prod_picole_abacaxi', baseId: 'picole_abacaxi', name: 'Abacaxi', price: 1.20, unitLabel: 'R$1,20/un', categoryId: 'cat3', baseUnitMultiplier: 1 },
    ].sort((a,b) => a.price - b.price || a.name.localeCompare(b.name)),
  },
  {
    id: 'cat4', name: 'Outros', icon: PuzzlePieceIcon, itemCountBadge: 0,
    products: [],
  },
];

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

const CustomerNewOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // Desktop accordion state
  const [activeAccordionCategory, setActiveAccordionCategory] = useState<string | null>('cat3');
  // Mobile tab state
  const [activeMobileCategoryTabId, setActiveMobileCategoryTabId] = useState<string>(mockProductCategories[0]?.id || '');
  
  const [activePopsicleTabs, setActivePopsicleTabs] = useState<{ [categoryId: string]: string }>({ 'cat3': 'unidades' });
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAccordionToggle = (categoryId: string) => {
    setActiveAccordionCategory(prev => (prev === categoryId ? null : categoryId));
  };
  
  const handleMobileCategoryTabChange = (categoryId: string) => {
    setActiveMobileCategoryTabId(categoryId);
  };

  const handlePopsicleTabChange = (categoryId: string, tabId: string) => {
    setActivePopsicleTabs(prev => ({ ...prev, [categoryId]: tabId }));
  };

  const getProductKey = (product: ProductInfo, saleUnitOption?: SaleUnitOption): string => {
    return saleUnitOption ? `${product.baseId}_${saleUnitOption.id}` : product.id;
  };

  const handleQuantityChange = (product: ProductInfo, category: ProductCategoryUIData, increment: number) => {
    const saleUnitOption = category.isPopsicleCategory ? category.saleUnitOptions?.find(su => su.id === activePopsicleTabs[category.id]) : undefined;
    const productKey = getProductKey(product, saleUnitOption);
    
    const currentCartItem = cart[productKey];
    const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;
    let newQuantity = currentQuantity + increment;
    newQuantity = Math.max(0, newQuantity); 

    const effectiveMultiplier = saleUnitOption ? saleUnitOption.multiplier : 1;
    const unitPriceForCart = product.price * (category.isPopsicleCategory && !saleUnitOption ? 1 : effectiveMultiplier);

    if (newQuantity > 0) {
      setCart(prevCart => ({
        ...prevCart,
        [productKey]: {
          productId: productKey,
          name: saleUnitOption ? `${product.name} (${saleUnitOption.label})` : product.name,
          quantity: newQuantity,
          unitPrice: unitPriceForCart / effectiveMultiplier, 
          baseUnitMultiplier: effectiveMultiplier,
          categoryId: category.id,
          categoryName: category.name,
        },
      }));
    } else {
      setCart(prevCart => {
        const updatedCart = { ...prevCart };
        delete updatedCart[productKey];
        return updatedCart;
      });
    }
  };
  
  const cartItemsByCategory = useMemo(() => {
    return Object.values(cart).reduce((acc, item) => {
      if (!acc[item.categoryId]) {
        acc[item.categoryId] = {
          categoryName: item.categoryName,
          items: [],
          totalQuantity: 0,
          subtotal: 0,
        };
      }
      acc[item.categoryId].items.push(item);
      acc[item.categoryId].totalQuantity += item.quantity * item.baseUnitMultiplier;
      acc[item.categoryId].subtotal += item.quantity * item.unitPrice * item.baseUnitMultiplier;
      return acc;
    }, {} as { [catId: string]: { categoryName: string; items: CartItem[]; totalQuantity: number; subtotal: number } });
  }, [cart]);

  const orderSubtotal = useMemo(() => {
    return Object.values(cartItemsByCategory).reduce((sum, group) => sum + group.subtotal, 0);
  }, [cartItemsByCategory]);
  
  const totalCartQuantity = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + (item.quantity * item.baseUnitMultiplier), 0);
  }, [cart]);


  const filteredDesktopCategories = useMemo(() => {
    if (!searchTerm) return mockProductCategories;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return mockProductCategories
      .map(category => ({
        ...category,
        products: category.products.filter(product =>
          product.name.toLowerCase().includes(lowerSearchTerm)
        ),
      }))
      .filter(category => category.products.length > 0);
  }, [searchTerm]);

  const currentMobileCategory = useMemo(() => {
    return mockProductCategories.find(cat => cat.id === activeMobileCategoryTabId);
  }, [activeMobileCategoryTabId]);
  
  const filteredMobileProducts = useMemo(() => {
    if (!currentMobileCategory) return [];
    if (!searchTerm) return currentMobileCategory.products;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return currentMobileCategory.products.filter(product =>
      product.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm, currentMobileCategory]);


  // Initialize activeMobileCategoryTabId if not set and categories exist
  useState(() => {
    if (!activeMobileCategoryTabId && mockProductCategories.length > 0) {
      setActiveMobileCategoryTabId(mockProductCategories[0].id);
    }
  });
  
  const renderProductsForCategory = (category: ProductCategoryUIData, productsToList: ProductInfo[]) => (
    <div className="p-3 md:p-4">
        {category.isPopsicleCategory && category.saleUnitOptions && (
          <div className="mb-3 flex flex-wrap gap-1 border-b border-gray-200 pb-2">
            {category.saleUnitOptions.map(tab => (
              <button
                key={tab.id}
                onClick={() => handlePopsicleTabChange(category.id, tab.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors
                  ${activePopsicleTabs[category.id] === tab.id
                    ? 'bg-sorvetao-primary text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        {productsToList.length > 0 ? (
          <div className="space-y-2.5">
            {productsToList.map(product => {
              const saleUnitOption = category.isPopsicleCategory ? category.saleUnitOptions?.find(su => su.id === activePopsicleTabs[category.id]) : undefined;
              const productKey = getProductKey(product, saleUnitOption);
              const cartQuantity = cart[productKey]?.quantity || 0;
              return (
                <div key={product.id} className="flex justify-between items-center p-2.5 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.unitLabel}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleQuantityChange(product, category, -1)} disabled={cartQuantity === 0} className="p-1.5 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 disabled:opacity-50">
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{cartQuantity}</span>
                    <button onClick={() => handleQuantityChange(product, category, 1)} className="p-1.5 bg-sorvetao-primary text-white rounded-full hover:bg-opacity-90">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center py-2">Nenhum produto encontrado nesta categoria com o filtro atual.</p>
        )}
      </div>
  );


  return (
    <div className="pb-28 md:pb-10"> {/* Added padding-bottom for "Ver Carrinho" button */}
      <h1 className="text-2xl md:text-3xl font-bold text-sorvetao-text-primary mb-1">Novo Pedido</h1>
      <p className="text-sm text-sorvetao-text-secondary mb-6 md:mb-8">
        Selecione produtos autorizados para seu perfil e monte seu pedido.
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Product Catalog */}
        <div className="lg:w-[calc(65%-0.75rem)] w-full space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-5">
              <div className="bg-pink-100 p-2 rounded-full mr-3 md:mr-4"> {/* Adjusted padding for mobile */}
                <CubeIcon className="w-5 h-5 md:w-6 md:h-6 text-sorvetao-primary" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-sorvetao-text-primary">Catálogo de Produtos</h2>
            </div>
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Mobile Category Tabs */}
            <div className="md:hidden mb-4 overflow-x-auto whitespace-nowrap pb-2 border-b border-gray-200">
              <div className="flex space-x-1">
                {mockProductCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleMobileCategoryTabChange(category.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap
                      ${activeMobileCategoryTabId === category.id
                        ? 'bg-sorvetao-pink-light text-sorvetao-primary border border-sorvetao-primary'
                        : 'bg-gray-100 text-sorvetao-text-secondary hover:bg-gray-200'
                      }`}
                  >
                    <category.icon className={`w-4 h-4 ${activeMobileCategoryTabId === category.id ? 'text-sorvetao-primary' : 'text-gray-500'}`} />
                    <span>{category.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium
                      ${activeMobileCategoryTabId === category.id ? 'bg-sorvetao-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {category.itemCountBadge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile Product Listing */}
            <div className="md:hidden">
                {currentMobileCategory && renderProductsForCategory(currentMobileCategory, filteredMobileProducts)}
                {!currentMobileCategory && mockProductCategories.length > 0 && 
                  renderProductsForCategory(mockProductCategories[0], mockProductCategories[0].products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())))}
            </div>


            {/* Desktop Accordion Categories */}
            <div className="hidden md:block space-y-3">
              {filteredDesktopCategories.map(category => (
                <div key={category.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <button
                    onClick={() => handleAccordionToggle(category.id)}
                    className="w-full flex justify-between items-center p-3 md:p-4 bg-slate-100 hover:bg-slate-200 transition-colors"
                    aria-expanded={activeAccordionCategory === category.id}
                    aria-controls={`category-products-${category.id}`}
                  >
                    <div className="flex items-center">
                      <category.icon className="w-5 h-5 text-sorvetao-primary mr-2.5" />
                      <span className="font-medium text-sm text-sorvetao-text-primary">{category.name}</span>
                      <span className="ml-2 text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full font-medium">
                        {category.itemCountBadge}
                      </span>
                    </div>
                    {activeAccordionCategory === category.id ? <ChevronUpIcon className="w-5 h-5 text-gray-600" /> : <ChevronDownIcon className="w-5 h-5 text-gray-600" />}
                  </button>

                  {activeAccordionCategory === category.id && renderProductsForCategory(category, category.products)}
                </div>
              ))}
              {filteredDesktopCategories.length === 0 && (
                <p className="text-center py-6 text-gray-500">Nenhum produto encontrado.</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary (Desktop) */}
        <div className="hidden lg:block lg:w-[calc(35%-0.75rem)] sticky top-28">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-5">
              <div className="bg-pink-100 p-2.5 rounded-full mr-3 md:mr-4">
                <ShoppingCartIcon className="w-5 h-5 md:w-6 md:h-6 text-sorvetao-primary" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-sorvetao-text-primary">Resumo do Pedido</h2>
            </div>
            
            {Object.keys(cartItemsByCategory).length > 0 ? (
              <div className="space-y-3 mb-4 max-h-[40vh] overflow-y-auto pr-1">
                {Object.entries(cartItemsByCategory).map(([catId, categoryGroup]) => (
                  <div key={catId} className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-sm font-medium text-gray-700">{categoryGroup.categoryName}</p>
                      <span className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {categoryGroup.items.reduce((acc, item) => acc + item.quantity, 0)} {categoryGroup.items.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'item' : 'itens'}
                      </span>
                    </div>
                    {categoryGroup.items.map(item => (
                      <div key={item.productId} className="flex justify-between items-center text-xs text-gray-600 py-1">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">{formatCurrency(item.quantity * item.unitPrice * item.baseUnitMultiplier)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-700 pt-1.5 border-t border-blue-200 mt-1.5">
                      <span>Subtotal {categoryGroup.categoryName}</span>
                      <span>{formatCurrency(categoryGroup.subtotal)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">Seu carrinho está vazio.</p>
            )}

            {Object.keys(cartItemsByCategory).length > 0 && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center text-md font-bold text-sorvetao-text-primary">
                        <span>Subtotal do Pedido</span>
                        <span>{formatCurrency(orderSubtotal)}</span>
                    </div>
                </div>
            )}

            <button
              onClick={() => alert('Ir para o Checkout (Funcionalidade pendente)')}
              disabled={Object.keys(cart).length === 0}
              className="mt-6 w-full bg-sorvetao-primary text-white py-3 px-4 rounded-xl hover:bg-opacity-90 transition-colors text-base font-medium flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRightCircleIcon className="w-5 h-5" />
              <span>Ir para o Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {/* "Ver Carrinho" Button (Mobile) */}
      {Object.keys(cart).length > 0 && (
        <div className="md:hidden fixed bottom-[80px] left-4 right-4 z-30"> {/* bottom-16 + 8px margin approx */}
            <button
            onClick={() => setIsCartModalOpen(true)}
            className="w-full bg-sorvetao-primary text-white py-3.5 px-4 rounded-2xl hover:bg-opacity-90 transition-colors text-base font-semibold flex items-center justify-center space-x-2 shadow-lg"
            >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Ver Carrinho</span>
            {totalCartQuantity > 0 && (
                <span className="bg-white text-sorvetao-primary text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                {totalCartQuantity}
                </span>
            )}
            </button>
        </div>
      )}
      
      {/* Order Summary Modal (Mobile) */}
      <Modal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        title="Resumo do Pedido"
        titleIcon={<ShoppingCartIcon className="w-6 h-6 text-sorvetao-primary" />}
        subtitle="Confira os itens do seu pedido."
        maxWidth="max-w-md" // Good for mobile
        footerContent={
          <>
            <button
              type="button"
              onClick={() => setIsCartModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-sorvetao-text-secondary font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
            >
              Continuar Comprando
            </button>
            <button
              onClick={() => {setIsCartModalOpen(false); alert('Ir para o Checkout (Funcionalidade pendente)');}}
              disabled={Object.keys(cart).length === 0}
              className="bg-sorvetao-primary text-white py-2.5 px-4 rounded-xl hover:bg-opacity-90 transition-colors text-sm font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>Ir para o Checkout</span> <ArrowRightCircleIcon className="w-4 h-4" />
            </button>
          </>
        }
      >
        {Object.keys(cartItemsByCategory).length > 0 ? (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {Object.entries(cartItemsByCategory).map(([catId, categoryGroup]) => (
              <div key={catId} className="bg-blue-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1.5">
                  <p className="text-sm font-medium text-gray-700">{categoryGroup.categoryName}</p>
                  <span className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {categoryGroup.items.reduce((acc, item) => acc + item.quantity, 0)} {categoryGroup.items.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'item' : 'itens'}
                  </span>
                </div>
                {categoryGroup.items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center text-xs text-gray-600 py-1">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium">{formatCurrency(item.quantity * item.unitPrice * item.baseUnitMultiplier)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700 pt-1.5 border-t border-blue-200 mt-1.5">
                  <span>Subtotal {categoryGroup.categoryName}</span>
                  <span>{formatCurrency(categoryGroup.subtotal)}</span>
                </div>
              </div>
            ))}
             <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center text-base font-bold text-sorvetao-text-primary">
                    <span>Subtotal do Pedido</span>
                    <span>{formatCurrency(orderSubtotal)}</span>
                </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">Seu carrinho está vazio.</p>
        )}
      </Modal>
      <footer className="mt-10 py-4 text-center text-xs text-gray-500">
        Sorvetão © {new Date().getFullYear()}. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default CustomerNewOrderPage;
