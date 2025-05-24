
import React, { useState } from 'react';
import { useNavigate }
  from 'react-router-dom';
import {
  UserCircleIcon, SearchIcon, BuildingStorefrontIcon, MapPinIcon, ChatBubbleOvalLeftEllipsisIcon, TruckIcon, BanknotesIcon, CalendarDaysIcon,
  ShoppingBagIcon, MugHotIcon, ArchiveBoxIcon, QuestionMarkCircleIcon, PuzzlePieceIcon, PlusIcon, MinusIcon, ChevronDownIcon, ChevronUpIcon,
  AlertTriangleIcon, CreditCardIcon, ShoppingCartIcon, TagIcon, CheckCircleSolidIcon, SaveIcon, XIcon, CalendarIcon, CheckIcon
} from '../../components/icons';

// Helper Components (can be moved to separate files later)
interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ icon, title, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg ${className}`}>
    <div className="flex items-center mb-5">
      <div className="bg-pink-100 p-2.5 rounded-full mr-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-sorvetao-text-primary">{title}</h2>
    </div>
    {children}
  </div>
);

interface QuantityInputProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}
const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center">
    <button type="button" onClick={onDecrease} className="p-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50" disabled={quantity <=0}>
      <MinusIcon className="w-4 h-4" />
    </button>
    <span className="px-3 w-10 text-center text-sm font-medium">{quantity}</span>
    <button type="button" onClick={onIncrease} className="p-1.5 bg-sorvetao-primary text-white rounded-md hover:bg-opacity-90">
      <PlusIcon className="w-4 h-4" />
    </button>
  </div>
);

// Fix: Define a local interface for icon props to be used with React.ReactElement type for icons
// This makes the type more specific for React.cloneElement regarding 'className'.
interface LocalIconProps {
  className?: string;
  // Add other common props if needed by cloneElement and are part of your IconProps
}

interface ProductItem {
  id: string;
  name: string;
  price: string; // e.g. R$ 2,50/un
  icon: React.ReactElement<LocalIconProps>;
}
interface ProductCategory {
  id: string;
  name: string;
  itemCount: number;
  icon: React.ReactElement<LocalIconProps>;
  products: ProductItem[];
  tabs?: string[]; // for Picolés
}

const mockProducts: ProductCategory[] = [
  { id: 'cat1', name: 'Potes e Copos', itemCount: 5, icon: <MugHotIcon className="w-5 h-5 text-sorvetao-primary" />, products: [
      { id: 'p1', name: 'Copo Baunilha 120ml', price: 'R$ 2,50/un', icon: <MugHotIcon className="w-5 h-5 text-pink-500" /> },
  ]},
  { id: 'cat2', name: 'Baldes', itemCount: 3, icon: <ArchiveBoxIcon className="w-5 h-5 text-sorvetao-primary" />, products: [
      { id: 'p2', name: 'Balde Chocolate 1L', price: 'R$ 6,90/un', icon: <ArchiveBoxIcon className="w-5 h-5 text-pink-500" /> },
  ]},
  { id: 'cat3', name: 'Picolés de Fruta', itemCount: 10, icon: <QuestionMarkCircleIcon className="w-5 h-5 text-sorvetao-primary" />, tabs: ['Unidades', 'Meias Caixas (12un)', 'Caixas Completas (24un)'], products: [
      { id: 'p3', name: 'Morango', price: 'R$ 1,10/un', icon: <QuestionMarkCircleIcon className="w-5 h-5 text-pink-500" /> },
      { id: 'p4', name: 'Abacaxi', price: 'R$ 1,20/un', icon: <QuestionMarkCircleIcon className="w-5 h-5 text-pink-500" /> },
  ]},
  { id: 'cat4', name: 'Outros', itemCount: 2, icon: <PuzzlePieceIcon className="w-5 h-5 text-sorvetao-primary" />, products: []},
];


const CriarNovoPedidoPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState<any | null>(null); // Replace any with client type
  const [productQuantities, setProductQuantities] = useState<{[productId: string]: number}>({});
  const [openAccordion, setOpenAccordion] = useState<string | null>('cat3'); // Picolés de Fruta open by default
  const [activePicoleTab, setActivePicoleTab] = useState<string>('Unidades');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setProductQuantities(prev => ({ ...prev, [productId]: Math.max(0, newQuantity) }));
  };
  
  const toggleAccordion = (categoryId: string) => {
    setOpenAccordion(prev => prev === categoryId ? null : categoryId);
  };

  // Mock selected client data
  const clientData = {
    name: 'Gelados da Vila Ltda.',
    address: 'Rua das Flores, 1200 - Centro, São Paulo/SP',
    deliveryNote: 'Entregar no horário comercial',
    deliveryCost: 'R$ 18,00',
    minOrder: 'R$ 100,00',
    deliveryDays: 'Seg a Sex'
  };

  const orderSummaryItems = [
    { category: 'Potes e Copos', items: [{ name: 'Copo Baunilha 120ml', qty: 2, price: 2.50, total: 5.00 }, { name: 'Copo Chocolate 120ml', qty: 3, price: 2.80, total: 8.40 }], subtotal: 13.40, badgeCount: 2 },
    { category: 'Picolés de Fruta', items: [{ name: 'Morango', qty: 5, price: 1.10, total: 5.50 }], subtotal: 5.50, badgeCount: 3 }
  ];
  const orderTotal = 36.90; // Mock

  return (
    <div className="pb-10">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-sorvetao-text-primary">Criar Novo Pedido</h1>
          <p className="text-sorvetao-text-secondary">Registrar pedido em nome do cliente</p>
        </div>
        <button
          onClick={() => navigate('/admin/pedidos')}
          className="bg-sorvetao-primary text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors duration-150 text-sm font-medium shadow-md"
        >
          Voltar
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column */}
        <div className="lg:w-[65%] space-y-6 w-full">
          {/* Cliente Section */}
          <FormSection icon={<UserCircleIcon className="w-6 h-6 text-sorvetao-primary" />} title="Cliente">
            <div className="relative mb-4">
              <input type="text" placeholder="Buscar cliente por nome ou CNPJ..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {/* Mocked client details */}
            <div className="bg-blue-50 p-4 rounded-xl space-y-2.5">
              <div className="flex items-center">
                <BuildingStorefrontIcon className="w-5 h-5 text-sorvetao-primary mr-2.5" />
                <span className="font-medium text-sorvetao-text-primary">{clientData.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPinIcon className="w-5 h-5 text-gray-500 mr-2.5 flex-shrink-0" />
                <span className="text-gray-600">{clientData.address}</span>
              </div>
              <div className="flex items-center text-sm">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-gray-500 mr-2.5 flex-shrink-0" />
                <span className="text-gray-600">{clientData.deliveryNote}</span>
              </div>
              <div className="pt-2 border-t border-blue-200 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center"><TruckIcon className="w-4 h-4 text-gray-500 mr-1.5"/>Custo Fixo Entrega: <span className="font-semibold ml-1">{clientData.deliveryCost}</span></div>
                  <div className="flex items-center"><BanknotesIcon className="w-4 h-4 text-gray-500 mr-1.5"/>Mínimo p/ Entrega: <span className="font-semibold ml-1">{clientData.minOrder}</span></div>
                  <div className="flex items-center"><CalendarDaysIcon className="w-4 h-4 text-gray-500 mr-1.5"/>Dias de Entrega: <span className="font-semibold ml-1">{clientData.deliveryDays}</span></div>
              </div>
            </div>
          </FormSection>

          {/* Produtos Section */}
          <FormSection icon={<ShoppingBagIcon className="w-6 h-6 text-sorvetao-primary" />} title="Produtos">
            <input type="text" placeholder="Buscar produtos no catálogo..." className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl mb-5 focus:ring-sorvetao-primary focus:border-sorvetao-primary" />
            <div className="space-y-3">
              {mockProducts.map(category => (
                <div key={category.id} className="bg-gray-50 rounded-xl overflow-hidden">
                  <button onClick={() => toggleAccordion(category.id)} className="w-full flex justify-between items-center p-4 bg-slate-100 hover:bg-slate-200 transition-colors">
                    <div className="flex items-center">
                      {React.cloneElement(category.icon, { className: "w-5 h-5 text-sorvetao-primary mr-3" })}
                      <span className="font-medium text-sorvetao-text-primary">{category.name}</span>
                      <span className="ml-2 text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full">{category.itemCount} itens</span>
                    </div>
                    {openAccordion === category.id ? <ChevronUpIcon className="w-5 h-5 text-gray-600"/> : <ChevronDownIcon className="w-5 h-5 text-gray-600"/>}
                  </button>
                  {openAccordion === category.id && (
                    <div className="p-4">
                      {category.tabs && (
                        <div className="mb-3 flex space-x-1 border-b">
                          {category.tabs.map(tab => (
                            <button key={tab} onClick={() => setActivePicoleTab(tab)} 
                                    className={`px-3 py-2 text-sm font-medium rounded-t-md ${activePicoleTab === tab ? 'bg-sorvetao-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                              {tab}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="space-y-3">
                        {category.products.map(product => (
                          <div key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center">
                              {React.cloneElement(product.icon, {className: "w-6 h-6 text-pink-400 mr-3 opacity-70"})}
                              <div>
                                <p className="text-sm font-medium text-sorvetao-text-primary">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.price}</p>
                              </div>
                            </div>
                            <QuantityInput 
                              quantity={productQuantities[product.id] || 0}
                              onDecrease={() => handleQuantityChange(product.id, (productQuantities[product.id] || 0) -1)}
                              onIncrease={() => handleQuantityChange(product.id, (productQuantities[product.id] || 0) +1)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FormSection>
          
          {/* Opções de Entrega Section */}
          <FormSection icon={<TruckIcon className="w-6 h-6 text-sorvetao-primary" />} title="Opções de Entrega">
            <div className="flex space-x-2 mb-4 border border-gray-300 rounded-xl p-1 bg-gray-100">
              <button onClick={() => setDeliveryOption('pickup')} className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all ${deliveryOption === 'pickup' ? 'bg-sorvetao-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}>
                <BuildingStorefrontIcon className={`w-5 h-5 ${deliveryOption === 'pickup' ? 'text-white' : 'text-gray-500'}`} /> <span>Retirar na Fábrica</span>
              </button>
              <button onClick={() => setDeliveryOption('delivery')} className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all ${deliveryOption === 'delivery' ? 'bg-sorvetao-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}>
                <TruckIcon className={`w-5 h-5 ${deliveryOption === 'delivery' ? 'text-white' : 'text-gray-500'}`} /> <span>Entrega</span>
              </button>
            </div>
            {deliveryOption === 'delivery' && (
              <>
                <div className="bg-blue-50 p-3 rounded-lg text-sm mb-3">
                  <p>Custo Fixo Entrega: <span className="font-semibold">{clientData.deliveryCost}</span></p>
                  <p>Pedido Mínimo p/ Entrega: <span className="font-semibold">{clientData.minOrder}</span></p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700 flex items-start mb-4">
                  <AlertTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Atenção: Faltam <span className="font-bold">R$ 16,00</span> para atingir o pedido mínimo de {clientData.minOrder} para entrega deste cliente.</span>
                </div>
                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Data de Entrega Solicitada</label>
                  <div className="relative">
                    <input type="text" id="deliveryDate" placeholder="mm/dd/yyyy" className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Datas disponíveis: {clientData.deliveryDays}</p>
                </div>
              </>
            )}
             {deliveryOption === 'pickup' && (
                <div className="bg-blue-50 p-3 rounded-lg text-sm mb-3">
                  <p>O pedido estará disponível para retirada na fábrica.</p>
                   <p className="text-xs text-gray-500 mt-1">Horário de retirada: Seg a Sex, 08:00 - 17:00</p>
                </div>
            )}
          </FormSection>

          {/* Pagamento Inicial Section */}
          <FormSection icon={<CreditCardIcon className="w-6 h-6 text-sorvetao-primary" />} title="Registrar Pagamento Inicial (Opcional)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700 mb-1">Valor Pago</label>
                <input type="text" id="paidAmount" placeholder="R$ 0,00" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary"/>
              </div>
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Método de Pagamento</label>
                <select id="paymentMethod" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary bg-white">
                  <option>PIX</option>
                  <option>Dinheiro</option>
                  <option>Cartão de Crédito</option>
                  <option>Cartão de Débito</option>
                </select>
              </div>
              <div>
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">Data do Pagamento</label>
                <input type="text" id="paymentDate" placeholder="mm/dd/yyyy" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary"/>
              </div>
              <div>
                <label htmlFor="paymentRef" className="block text-sm font-medium text-gray-700 mb-1">Referência/Obs.</label>
                <input type="text" id="paymentRef" placeholder="Opcional" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary"/>
              </div>
            </div>
          </FormSection>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-[35%] space-y-6 w-full sticky top-28"> {/* Sticky for desktop */}
          <FormSection icon={<ShoppingCartIcon className="w-6 h-6 text-sorvetao-primary" />} title="Resumo do Pedido">
            <div className="space-y-3 mb-4">
              {orderSummaryItems.map(group => (
                <div key={group.category} className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-sorvetao-text-primary">{group.category}</p>
                    <span className="text-xs bg-blue-200 text-blue-700 px-1.5 py-0.5 rounded-full">{group.badgeCount} itens</span>
                  </div>
                  {group.items.map(item => (
                    <div key={item.name} className="flex justify-between items-center text-xs text-gray-600 py-0.5">
                      <span>{item.qty} x {item.name}</span>
                      <span>R$ {item.total.toFixed(2).replace('.',',')}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-xs font-medium text-sorvetao-text-primary pt-1 border-t border-blue-200 mt-1">
                    <span>Subtotal</span>
                    <span>R$ {group.subtotal.toFixed(2).replace('.',',')}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-1 text-sm border-t pt-3">
              <div className="flex justify-between text-gray-600"><span>Subtotal Produtos:</span><span>R$ 18,90</span></div>
              <div className="flex justify-between text-gray-600"><span>Entrega:</span><span>R$ 18,00</span></div>
              <div className="flex justify-between text-gray-600"><span>Desconto:</span><span className="text-red-600">- R$ 0,00</span></div>
              <div className="flex justify-between text-lg font-bold text-sorvetao-text-primary pt-1"><span>Total:</span><span>R$ {orderTotal.toFixed(2).replace('.',',')}</span></div>
            </div>
          </FormSection>

          <FormSection icon={<TagIcon className="w-6 h-6 text-sorvetao-primary" />} title="Aplicar Desconto">
            <div>
              <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">Valor do Desconto</label>
              <input type="text" id="discountValue" placeholder="R$ 0,00" className="w-full p-2.5 border border-gray-300 rounded-xl mb-3 focus:ring-sorvetao-primary focus:border-sorvetao-primary"/>
            </div>
            <div>
              <label htmlFor="discountReason" className="block text-sm font-medium text-gray-700 mb-1">Justificativa do Desconto</label>
              <textarea id="discountReason" rows={2} placeholder="Informe o motivo do desconto..." className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-sorvetao-primary focus:border-sorvetao-primary"></textarea>
            </div>
          </FormSection>
          
          <div className="space-y-3">
             <button className="w-full bg-sorvetao-primary text-white py-3 rounded-xl hover:bg-opacity-90 transition-colors text-base font-medium flex items-center justify-center space-x-2 shadow-lg">
              <CheckCircleSolidIcon className="w-5 h-5" /> <span>Finalizar Pedido</span>
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors text-base font-medium flex items-center justify-center space-x-2">
              <SaveIcon className="w-5 h-5" /> <span>Salvar Rascunho</span>
            </button>
            <button className="w-full text-gray-600 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center space-x-1.5">
              <XIcon className="w-4 h-4" /> <span>Cancelar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarNovoPedidoPage;
