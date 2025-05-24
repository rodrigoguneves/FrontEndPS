
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, PaymentStatus, FulfillmentStatus, TableAction } from '../../types';
import { 
  PlusIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SearchIcon, 
  ArrowPathIcon, 
  CalendarIcon, 
  ChevronDownIcon,
  ArrowRightCircleIcon,
  CheckCircleSolidIcon,
  ClockIcon,
  XCircleIcon,
  InformationCircleIcon,
  CogIcon,
  TruckIcon,
  // Fix: Import IconProps for strong typing of icon components
  IconProps
} from '../../components/icons';

// Mock Data with new structure
const mockOrders: Order[] = [
  { pedidoId: '#100234', customerName: 'John Carter', customerAvatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', orderDate: '2024-05-09', valorTotal: 245.00, paymentStatus: PaymentStatus.PAID, fulfillmentStatus: FulfillmentStatus.NEW },
  { pedidoId: '#100233', customerName: 'Sandra Lee', customerAvatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg', orderDate: '2024-05-08', valorTotal: 128.50, paymentStatus: PaymentStatus.PENDING, fulfillmentStatus: FulfillmentStatus.PROCESSING },
  { pedidoId: '#100232', customerName: 'Olivia Brown', customerAvatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg', orderDate: '2024-05-07', valorTotal: 399.99, paymentStatus: PaymentStatus.PAID, fulfillmentStatus: FulfillmentStatus.SHIPPED },
  { pedidoId: '#100231', customerName: 'Michael Smith', customerAvatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg', orderDate: '2024-05-06', valorTotal: 59.90, paymentStatus: PaymentStatus.UNPAID, fulfillmentStatus: FulfillmentStatus.DELIVERED },
  { pedidoId: '#100230', customerName: 'William Lee', customerAvatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg', orderDate: '2024-05-05', valorTotal: 175.35, paymentStatus: PaymentStatus.CANCELED, fulfillmentStatus: FulfillmentStatus.CANCELED },
  { pedidoId: '#100229', customerName: 'Sophia Williams', customerAvatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg', orderDate: '2024-05-04', valorTotal: 88.00, paymentStatus: PaymentStatus.PAID, fulfillmentStatus: FulfillmentStatus.DELIVERED },
  { pedidoId: '#100228', customerName: 'James Johnson', customerAvatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg', orderDate: '2024-05-03', valorTotal: 312.00, paymentStatus: PaymentStatus.PENDING, fulfillmentStatus: FulfillmentStatus.PROCESSING },
];

const ITEMS_PER_PAGE = 10; // Increased items per page as per design

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Ensure UTC date is used to prevent timezone shifts
  return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).format(date);
};

interface StatusBadgeProps {
  text: string;
  // Fix: Use React.ReactElement<IconProps> to ensure the icon accepts className
  icon: React.ReactElement<IconProps>;
  bgColorClass: string;
  textColorClass: string;
  iconColorClass?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text, icon, bgColorClass, textColorClass, iconColorClass }) => {
  const ClonedIcon = React.cloneElement(icon, { className: `w-3.5 h-3.5 mr-1.5 ${iconColorClass || textColorClass}`});
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColorClass} ${textColorClass}`}>
      {ClonedIcon}
      {text}
    </span>
  );
};

const getPaymentStatusBadgeProps = (status: PaymentStatus): StatusBadgeProps => {
  switch (status) {
    case PaymentStatus.PAID:
      return { text: 'Paid', icon: <CheckCircleSolidIcon />, bgColorClass: 'bg-green-100', textColorClass: 'text-green-700', iconColorClass: 'text-green-600' };
    case PaymentStatus.PENDING:
      return { text: 'Pending', icon: <ClockIcon />, bgColorClass: 'bg-yellow-100', textColorClass: 'text-yellow-700', iconColorClass: 'text-yellow-600' };
    case PaymentStatus.UNPAID:
      return { text: 'Unpaid', icon: <XCircleIcon />, bgColorClass: 'bg-gray-100', textColorClass: 'text-gray-700', iconColorClass: 'text-gray-500' };
    case PaymentStatus.CANCELED:
      return { text: 'Canceled', icon: <XCircleIcon />, bgColorClass: 'bg-red-100', textColorClass: 'text-red-700', iconColorClass: 'text-red-600' };
    default:
      return { text: status, icon: <InformationCircleIcon />, bgColorClass: 'bg-gray-100', textColorClass: 'text-gray-700' };
  }
};

const getFulfillmentStatusBadgeProps = (status: FulfillmentStatus): StatusBadgeProps => {
  switch (status) {
    case FulfillmentStatus.NEW:
      return { text: 'New', icon: <InformationCircleIcon />, bgColorClass: 'bg-blue-100', textColorClass: 'text-blue-700', iconColorClass: 'text-blue-600' };
    case FulfillmentStatus.PROCESSING:
      return { text: 'Processing', icon: <CogIcon />, bgColorClass: 'bg-purple-100', textColorClass: 'text-purple-700', iconColorClass: 'text-purple-600' };
    case FulfillmentStatus.SHIPPED:
      return { text: 'Shipped', icon: <TruckIcon />, bgColorClass: 'bg-indigo-100', textColorClass: 'text-indigo-700', iconColorClass: 'text-indigo-600' };
    case FulfillmentStatus.DELIVERED:
      return { text: 'Delivered', icon: <CheckCircleSolidIcon />, bgColorClass: 'bg-green-100', textColorClass: 'text-green-700', iconColorClass: 'text-green-600' };
    case FulfillmentStatus.CANCELED:
      return { text: 'Canceled', icon: <XCircleIcon />, bgColorClass: 'bg-red-100', textColorClass: 'text-red-700', iconColorClass: 'text-red-600' };
    default:
      return { text: status, icon: <InformationCircleIcon />, bgColorClass: 'bg-gray-100', textColorClass: 'text-gray-700' };
  }
};


const PedidosPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [filterCliente, setFilterCliente] = useState('');
  const [filterDataDe, setFilterDataDe] = useState('');
  const [filterDataAte, setFilterDataAte] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');

  const handleSearch = () => {
    // Implement actual search logic here
    console.log({ filterCliente, filterDataDe, filterDataAte, filterEstado });
    // For now, just log filters. In a real app, this would filter `mockOrders`.
  };

  const handleResetFilters = () => {
    setFilterCliente('');
    setFilterDataDe('');
    setFilterDataAte('');
    setFilterEstado('Todos');
    // Add logic to reset table to full data if it's filtered
  };

  const totalPages = Math.ceil(mockOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = mockOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCreateNewOrder = () => navigate('/admin/pedidos/novo');
  const handleViewOrder = (pedidoId: string) => alert(`Visualizar/Gerenciar pedido ID: ${pedidoId}`);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-sorvetao-text-primary mb-4 sm:mb-0">Pedidos</h1>
        <button
          onClick={handleCreateNewOrder}
          className="bg-sorvetao-primary text-white px-5 py-3 rounded-xl hover:bg-opacity-90 transition-colors duration-150 flex items-center space-x-2 text-sm font-medium"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Novo Pedido</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6 p-5 bg-sorvetao-gray-light rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="filterCliente" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Cliente</label>
            <input 
              type="text" 
              id="filterCliente"
              placeholder="Procurar por nome" 
              value={filterCliente}
              onChange={(e) => setFilterCliente(e.target.value)}
              className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm" 
            />
          </div>
          <div>
            <label htmlFor="filterDataDe" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">De</label>
            <div className="relative">
              <input 
                type="text" 
                id="filterDataDe"
                placeholder="mm/dd/yyyy" 
                value={filterDataDe}
                onChange={(e) => setFilterDataDe(e.target.value)}
                className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm" 
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label htmlFor="filterDataAte" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Até</label>
            <div className="relative">
              <input 
                type="text" 
                id="filterDataAte"
                placeholder="mm/dd/yyyy" 
                value={filterDataAte}
                onChange={(e) => setFilterDataAte(e.target.value)}
                className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm" 
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="filterEstado" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Estado</label>
            <div className="relative">
              <select 
                id="filterEstado" 
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm"
              >
                <option>Todos</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Canceled</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex space-x-2 items-center h-full pt-5">
            <button 
              onClick={handleSearch}
              className="bg-sorvetao-primary text-white px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center space-x-1.5 text-sm font-medium flex-grow h-full">
              <SearchIcon className="w-4 h-4" />
              <span>Pesquisar</span>
            </button>
            <button 
              onClick={handleResetFilters}
              title="Resetar filtros"
              className="p-2.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition h-full">
              <ArrowPathIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-sorvetao-gray-medium">
          <thead className="bg-sorvetao-pink-light">
            <tr>
              {['Pedido', 'Cliente', 'Data Pedido', 'Valor Total', 'Status', 'Pagamento', 'Ações'].map(header => (
                <th key={header} scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sorvetao-gray-light">
            {paginatedOrders.map((order) => {
              const paymentBadge = getPaymentStatusBadgeProps(order.paymentStatus);
              const fulfillmentBadge = getFulfillmentStatusBadgeProps(order.fulfillmentStatus);
              return (
                <tr key={order.pedidoId} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm font-medium text-sorvetao-primary">{order.pedidoId}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-sorvetao-text-secondary">
                    <div className="flex items-center">
                      <img 
                        src={order.customerAvatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customerName)}&background=random&size=32`} 
                        alt={order.customerName} 
                        className="w-7 h-7 rounded-full mr-2.5 object-cover" 
                      />
                      {order.customerName}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(order.orderDate)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatCurrency(order.valorTotal)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm">
                    <StatusBadge {...paymentBadge} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm">
                    <StatusBadge {...fulfillmentBadge} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-center">
                    <button 
                      onClick={() => handleViewOrder(order.pedidoId)} 
                      title="Ver detalhes do pedido"
                      className="text-sorvetao-primary hover:opacity-80 transition-opacity"
                    >
                      <ArrowRightCircleIcon className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              );
            })}
             {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-sorvetao-text-secondary">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {mockOrders.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-sorvetao-text-secondary">
            Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, mockOrders.length)}</span> de <span className="font-medium">{mockOrders.length}</span> resultados
          </p>
          <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-sorvetao-gray-medium bg-white text-sm font-medium text-sorvetao-text-secondary hover:bg-sorvetao-gray-light disabled:opacity-50 transition"
              aria-label="Página anterior"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                className={`relative inline-flex items-center px-4 py-2 border border-sorvetao-gray-medium text-sm font-medium transition
                  ${pageNumber === currentPage ? 'z-10 bg-sorvetao-pink-light text-sorvetao-primary' : 'bg-white text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-sorvetao-gray-medium bg-white text-sm font-medium text-sorvetao-text-secondary hover:bg-sorvetao-gray-light disabled:opacity-50 transition"
              aria-label="Próxima página"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
