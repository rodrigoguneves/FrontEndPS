import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerPortalOrder, CustomerOrderStatus } from '../../types';
import {
  ClipboardListIcon,
  SearchIcon,
  ReceiptTextIcon,
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon, // Added EyeIcon for mobile view details
} from '../../components/icons';

const mockOrders: CustomerPortalOrder[] = [
  { id: 'order_493872', orderDisplayId: '#493872', orderDate: '2024-04-18', totalAmount: 65.80, status: CustomerOrderStatus.AGUARDANDO_PAGAMENTO },
  { id: '1', orderDisplayId: '#1011', orderDate: '2025-05-19', totalAmount: 1200.00, status: CustomerOrderStatus.EM_PROCESSAMENTO },
  { id: '2', orderDisplayId: '#1010', orderDate: '2025-05-15', totalAmount: 960.00, status: CustomerOrderStatus.ENVIADO },
  { id: '3', orderDisplayId: '#1009', orderDate: '2025-05-10', totalAmount: 1320.00, status: CustomerOrderStatus.PENDENTE_PAGAMENTO },
  { id: '4', orderDisplayId: '#1008', orderDate: '2025-05-03', totalAmount: 870.00, status: CustomerOrderStatus.ENTREGUE },
  { id: '5', orderDisplayId: '#1007', orderDate: '2025-04-30', totalAmount: 1150.00, status: CustomerOrderStatus.CANCELADO },
  { id: '6', orderDisplayId: '#1006', orderDate: '2025-04-25', totalAmount: 750.00, status: CustomerOrderStatus.ENTREGUE },
  { id: '7', orderDisplayId: '#1005', orderDate: '2025-04-20', totalAmount: 1500.00, status: CustomerOrderStatus.EM_PROCESSAMENTO },
  { id: '8', orderDisplayId: '#1004', orderDate: '2025-04-15', totalAmount: 600.00, status: CustomerOrderStatus.ENVIADO },
  { id: '9', orderDisplayId: '#1003', orderDate: '2025-04-10', totalAmount: 990.00, status: CustomerOrderStatus.PENDENTE_PAGAMENTO },
  { id: '10', orderDisplayId: '#1002', orderDate: '2025-04-05', totalAmount: 120.50, status: CustomerOrderStatus.CANCELADO },
  { id: '11', orderDisplayId: '#1001', orderDate: '2025-04-01', totalAmount: 1800.00, status: CustomerOrderStatus.ENTREGUE },
];

const ITEMS_PER_PAGE = 5;

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00'); // Ensure date is parsed as local
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

const StatusBadge: React.FC<{ status: CustomerOrderStatus, isMobile?: boolean }> = ({ status, isMobile = false }) => {
  let bgColor = '';
  let textColor = '';

  switch (status) {
    case CustomerOrderStatus.AGUARDANDO_PAGAMENTO: // Added to match new page
      bgColor = 'bg-red-100'; 
      textColor = 'text-red-700';
      break;
    case CustomerOrderStatus.EM_PROCESSAMENTO:
      bgColor = 'bg-pink-100'; 
      textColor = 'text-pink-700'; 
      break;
    case CustomerOrderStatus.ENVIADO:
      bgColor = 'bg-rose-100';
      textColor = 'text-rose-700';
      break;
    case CustomerOrderStatus.PENDENTE_PAGAMENTO:
      bgColor = 'bg-gray-200';
      textColor = 'text-gray-700';
      break;
    case CustomerOrderStatus.ENTREGUE:
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case CustomerOrderStatus.CANCELADO:
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-500';
  }
  
  const mobileClasses = isMobile ? 'whitespace-normal text-center max-w-[100px]' : 'whitespace-nowrap';

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg inline-block ${bgColor} ${textColor} ${mobileClasses}`}>
      {status}
    </span>
  );
};

const CustomerMyOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); 
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return mockOrders
      .filter(order => {
        const searchLower = searchTerm.toLowerCase();
        const productKeywordMatch = order.orderDisplayId.includes('1011') ? 'baunilha'.includes(searchLower) : false; 
        return order.orderDisplayId.toLowerCase().includes(searchLower) ||
               order.status.toLowerCase().includes(searchLower) ||
               productKeywordMatch; 
      })
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  }, [searchTerm, dateFilter, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewOrderDetails = (orderInternalId: string) => { // Changed to use internal ID
    navigate(`/portal/meus-pedidos/${orderInternalId}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; 
    const ellipsis = <span key="ellipsis..." className="px-2 py-2 text-sm text-sorvetao-text-secondary">...</span>;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`mx-1 px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
              ${currentPage === i ? 'bg-sorvetao-primary text-white' : 'bg-sorvetao-gray-light text-sorvetao-text-secondary hover:bg-sorvetao-gray-medium'}`}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`mx-1 px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
            ${currentPage === 1 ? 'bg-sorvetao-primary text-white' : 'bg-sorvetao-gray-light text-sorvetao-text-secondary hover:bg-sorvetao-gray-medium'}`}
        >
          1
        </button>
      );

      let startPage = Math.max(2, currentPage - Math.floor((maxPagesToShow - 2) / 2));
      let endPage = Math.min(totalPages - 1, currentPage + Math.ceil((maxPagesToShow - 2) / 2));
      
      if (currentPage < maxPagesToShow -1) {
        endPage = Math.min(totalPages -1, maxPagesToShow -1);
      }
      if (currentPage > totalPages - (maxPagesToShow -2) ) {
         startPage = Math.max(2, totalPages - (maxPagesToShow-2) );
      }

      if (startPage > 2) {
        pageNumbers.push(React.cloneElement(ellipsis, {key: "ellipsis-start"}));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`mx-1 px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
              ${currentPage === i ? 'bg-sorvetao-primary text-white' : 'bg-sorvetao-gray-light text-sorvetao-text-secondary hover:bg-sorvetao-gray-medium'}`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages - 1) {
         pageNumbers.push(React.cloneElement(ellipsis, {key: "ellipsis-end"}));
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`mx-1 px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
            ${currentPage === totalPages ? 'bg-sorvetao-primary text-white' : 'bg-sorvetao-gray-light text-sorvetao-text-secondary hover:bg-sorvetao-gray-medium'}`}
        >
          {totalPages}
        </button>
      );
    }
    return pageNumbers;
  };


  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title Section */}
      <div className="flex items-center mb-6 md:mb-8">
        <div className="bg-pink-100 p-2.5 rounded-full mr-3 md:mr-4"> {/* Adjusted padding */}
          <ClipboardListIcon className="w-5 h-5 md:w-6 md:h-6 text-sorvetao-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-sorvetao-text-primary">Meus Pedidos</h1>
          <p className="text-xs md:text-sm text-sorvetao-text-secondary mt-0.5 md:mt-1">
            Veja todo o seu histórico de pedidos.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <div className="relative flex-grow w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar por ID do Pedido ou Produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-sorvetao-gray-medium rounded-xl bg-gray-100 focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
              aria-label="Buscar pedido"
            />
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none" />
          </div>
          <button
            onClick={() => setDateFilter('last30days')} 
            className="w-full md:w-auto px-4 py-3 text-sm bg-gray-100 hover:bg-sorvetao-gray-medium text-sorvetao-text-secondary rounded-xl transition-colors"
          >
            Últimos 30 dias
          </button>
          <button
            onClick={() => setStatusFilter('all')} 
            className="w-full md:w-auto px-4 py-3 text-sm bg-gray-100 hover:bg-sorvetao-gray-medium text-sorvetao-text-secondary rounded-xl transition-colors"
          >
            Todos os Status
          </button>
        </div>
      </div>

      {/* Orders List - Mobile (Cards) */}
      <div className="md:hidden space-y-4 mb-6">
        {paginatedOrders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-3 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleViewOrderDetails(order.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleViewOrderDetails(order.id)}
          >
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ReceiptTextIcon className="w-5 h-5 text-sorvetao-primary" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm text-sorvetao-text-primary">{order.orderDisplayId}</span>
                <span className="font-bold text-sm text-sorvetao-text-primary">{formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-sorvetao-text-secondary">{formatDate(order.orderDate)}</span>
                <StatusBadge status={order.status} isMobile={true}/>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleViewOrderDetails(order.id); }} // Prevent card click if button is clicked directly
              title="Ver detalhes do pedido"
              className="p-2 bg-pink-100 text-sorvetao-primary rounded-full hover:bg-pink-200 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 flex-shrink-0"
              aria-label={`Detalhes do pedido ${order.orderDisplayId}`}
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Orders Table - Desktop */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-sorvetao-pink-light">
              <tr>
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Pedido</th>
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Data</th>
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Valor Total</th>
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Status</th>
                <th scope="col" className="px-5 py-4 text-center text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sorvetao-gray-light">
              {paginatedOrders.map((order) => (
                <tr 
                    key={order.id} 
                    className="hover:bg-sorvetao-gray-light transition-colors cursor-pointer"
                    onClick={() => handleViewOrderDetails(order.id)}
                >
                  <td className="px-5 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <ReceiptTextIcon className="w-5 h-5 text-sorvetao-primary" />
                      </div>
                      <span className="font-medium text-sorvetao-text-primary">{order.orderDisplayId}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(order.orderDate)}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-sorvetao-text-primary">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleViewOrderDetails(order.id); }} // Prevent row click if button is clicked
                      title="Ver detalhes do pedido"
                      className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                      aria-label={`Detalhes do pedido ${order.orderDisplayId}`}
                    >
                      <ArrowRightCircleIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginatedOrders.length === 0 && (
          <p className="text-center py-10 text-sorvetao-text-secondary">Nenhum pedido encontrado.</p>
        )}
      </div>
      
      {/* Pagination Controls (Common for mobile and desktop, styled for mobile first then adjusted for desktop) */}
      {totalPages > 0 && (
        <div className="px-0 md:px-5 py-4 mt-6 md:mt-0 flex flex-col md:flex-row items-center justify-between md:bg-white md:rounded-b-2xl md:shadow-lg md:border-t md:border-sorvetao-gray-light">
          <p className="text-xs md:text-sm text-sorvetao-text-secondary mb-3 md:mb-0 text-center md:text-left">
            Exibindo <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>-
            <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}</span> de <span className="font-medium">{filteredOrders.length}</span> pedidos
          </p>
          <nav className="flex items-center" aria-label="Paginação de pedidos">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 md:p-2 rounded-full hover:bg-sorvetao-gray-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeftIcon className="w-5 h-5 text-sorvetao-text-secondary" />
            </button>
            
            {renderPageNumbers()}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 md:p-2 rounded-full hover:bg-sorvetao-gray-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Próxima página"
            >
              <ChevronRightIcon className="w-5 h-5 text-sorvetao-text-secondary" />
            </button>
          </nav>
        </div>
      )}
      
      {/* Footer for mobile view */}
      <footer className="md:hidden mt-8 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Pedidos Sorvetão. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default CustomerMyOrdersPage;