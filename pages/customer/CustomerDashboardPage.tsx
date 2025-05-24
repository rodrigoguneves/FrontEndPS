import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCardIcon, 
  ClipboardListIcon, 
  ChartBarIcon, 
  ArrowPathIcon, 
  ShoppingCartIcon,
  ReceiptTextIcon,
  ArrowRightCircleIcon, 
  CogIcon,
  TruckIcon,
  CheckCircleSolidIcon,
  ClockIcon,
  XCircleIcon,
  InformationCircleIcon,
  IconProps,
} from '../../components/icons';

// Helper function for currency formatting
const formatCurrency = (value: number) => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper function for date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

interface RecentOrder {
  id: string;
  orderId: string;
  date: string; // "YYYY-MM-DD"
  totalAmount: number;
  status: 'Em Processamento' | 'Enviado' | 'Entregue' | 'Pendente Pagamento' | 'Cancelado';
}

interface OpenOrder {
  id: string;
  orderId: string;
  dueDate: string; // "YYYY-MM-DD"
  amountDue: number;
}

interface MonthlyOrderVolume {
  month: string;
  quantity: number;
}

const mockRecentOrders: RecentOrder[] = [
  { id: '1', orderId: '#C1001', date: '2024-07-28', totalAmount: 155.50, status: 'Em Processamento' },
  { id: '2', orderId: '#C1000', date: '2024-07-25', totalAmount: 89.90, status: 'Enviado' },
  { id: '3', orderId: '#C0999', date: '2024-07-22', totalAmount: 210.00, status: 'Pendente Pagamento' },
  { id: '4', orderId: '#C0998', date: '2024-07-20', totalAmount: 120.75, status: 'Entregue' },
  { id: '5', orderId: '#C0997', date: '2024-07-15', totalAmount: 1950.00, status: 'Enviado' },
];

const mockOpenOrders: OpenOrder[] = [
  { id: '1', orderId: '#C0999', dueDate: '2024-08-05', amountDue: 1080.00 },
  { id: '2', orderId: '#C0996', dueDate: '2024-08-10', amountDue: 1040.00 },
];

const mockOrderVolume: MonthlyOrderVolume[] = [
  { month: 'Fev', quantity: 12 },
  { month: 'Mar', quantity: 18 },
  { month: 'Abr', quantity: 15 },
  { month: 'Mai', quantity: 22 },
  { month: 'Jun', quantity: 20 },
  { month: 'Jul', quantity: 25 },
];

const getStatusBadge = (status: RecentOrder['status']) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-700';
  // IconComponent removed from badge to match screenshot

  switch (status) {
    case 'Em Processamento':
      bgColor = 'bg-pink-100'; 
      textColor = 'text-pink-700';
      break;
    case 'Enviado':
      bgColor = 'bg-rose-100'; 
      textColor = 'text-rose-700';
      break;
    case 'Entregue':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'Pendente Pagamento':
      bgColor = 'bg-gray-200'; 
      textColor = 'text-gray-700';
      break;
    case 'Cancelado':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const customerName = sessionStorage.getItem('customerDisplayName') || 'Sorvetes Brasil';

  const totalOpenAmount = mockOpenOrders.reduce((sum, order) => sum + order.amountDue, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Message & Actions */}
      <div className="bg-sorvetao-secondary-bg p-4 md:p-6 rounded-2xl shadow-lg flex flex-col items-center md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-sorvetao-text-primary">
            Bem-vindo, <span className="text-sorvetao-primary">{customerName.split(' ')[0]}</span>!
          </h1>
          <p className="text-sm md:text-base text-sorvetao-text-secondary mt-1">Aqui está o seu resumo e as principais ações do portal.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate('/portal/novo-pedido')}
            className="bg-sorvetao-primary text-white py-3 px-5 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-150 ease-in-out flex items-center justify-center space-x-2 text-sm font-medium w-full sm:w-auto"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Realizar Novo Pedido</span>
          </button>
          <button
            onClick={() => alert('Funcionalidade de Pagamento em Desenvolvimento.')}
            className="bg-sorvetao-primary text-white py-3 px-5 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-150 ease-in-out flex items-center justify-center space-x-2 text-sm font-medium w-full sm:w-auto"
          >
            <CreditCardIcon className="w-5 h-5" />
            <span>Fazer Pagamento</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid - switches to single column on mobile implicitly */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Orders Summary Section */}
        <section className="lg:col-span-5 bg-white p-4 md:p-6 rounded-2xl shadow-lg"> {/* Takes full width on mobile, specific col-span for lg */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-5">
            <div className="flex items-center mb-2 sm:mb-0">
              <ClipboardListIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sorvetao-primary mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-xl font-semibold text-sorvetao-text-primary">Meus Últimos Pedidos</h2>
            </div>
            <Link to="/portal/meus-pedidos" className="text-xs sm:text-sm font-medium text-sorvetao-primary hover:underline flex items-center self-end sm:self-center">
              Ver Todos <ArrowRightCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 opacity-75" />
            </Link>
          </div>
          {mockRecentOrders.length > 0 ? (
            <div className="space-y-3">
              {mockRecentOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex flex-col items-start gap-2 py-3 border-b border-sorvetao-gray-light last:border-b-0 
                                              sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div className="flex items-center flex-grow min-w-0 w-full sm:w-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-50 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <ReceiptTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sorvetao-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-sorvetao-text-primary truncate">{order.orderId}</p>
                      <p className="text-[10px] sm:text-xs text-sorvetao-text-secondary">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full sm:w-auto mt-1 sm:mt-0">
                    <p className="text-xs sm:text-sm font-semibold text-sorvetao-text-primary sm:mx-2 whitespace-nowrap">{formatCurrency(order.totalAmount)}</p>
                    <div className="my-1 sm:my-0 sm:mx-2">
                        {getStatusBadge(order.status)}
                    </div>
                    <button 
                        onClick={() => alert(`Repetir pedido ${order.orderId} (funcionalidade pendente)`)}
                        className="text-[10px] sm:text-xs bg-gray-100 hover:bg-gray-200 text-sorvetao-primary font-medium px-2 py-1 sm:px-3 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-1.5 transition-colors"
                    >
                        <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Repetir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sorvetao-text-secondary text-center py-4 text-sm">Nenhum pedido recente.</p>
          )}
        </section>

        {/* Order Statistics Graph Section */}
        <section className="lg:col-span-5 bg-white p-4 md:p-6 rounded-2xl shadow-lg"> {/* Takes full width on mobile */}
          <div className="flex items-center mb-4 sm:mb-5">
            <ChartBarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sorvetao-primary mr-2 sm:mr-3" />
            <h2 className="text-lg sm:text-xl font-semibold text-sorvetao-text-primary">Volume de Pedidos</h2>
          </div>
          <div className="h-[250px] sm:h-[300px] bg-gray-50 rounded-lg flex items-center justify-center p-2 sm:p-4">
             <div className="w-full h-full">
                <div className="flex justify-around items-end h-48 sm:h-56 p-1 sm:p-2 border border-gray-200 rounded-md bg-white">
                    {mockOrderVolume.map((data, index) => (
                        <div key={index} className="flex flex-col items-center w-1/6 h-full justify-end">
                            <div 
                                className="bg-sorvetao-primary w-1/2 sm:w-1/3 md:w-2/5 rounded-t-md transition-all duration-300 hover:opacity-80" 
                                style={{ height: `${(data.quantity / Math.max(...mockOrderVolume.map(d => d.quantity), 1)) * 100}%`, minHeight: '5px' }}
                                title={`${data.quantity} pedidos`}
                            ></div>
                            <span className="text-[10px] sm:text-xs text-sorvetao-text-secondary mt-1">{data.month}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">Placeholder: Volume de Pedidos nos Últimos 6 Meses</p>
            </div>
          </div>
        </section>
      </div>

      {/* Open Orders/Pending Payments Section */}
      <section className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-5">
            <div className="flex items-center mb-2 sm:mb-0">
                <CreditCardIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sorvetao-primary mr-2 sm:mr-3" />
                <h2 className="text-lg sm:text-xl font-semibold text-sorvetao-text-primary">Pedidos em Aberto</h2>
            </div>
            <p className="text-sm sm:text-md font-semibold text-sorvetao-text-primary">Total: <span className="text-sorvetao-primary">{formatCurrency(totalOpenAmount)}</span></p>
        </div>
        {mockOpenOrders.length > 0 ? (
          <div className="space-y-3">
            {mockOpenOrders.map(order => (
              <div key={order.id} className="flex flex-col items-start gap-2 py-3 border-b border-sorvetao-gray-light last:border-b-0
                                            sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                 <div className="flex items-center flex-grow min-w-0 w-full sm:w-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-50 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <ReceiptTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sorvetao-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-sorvetao-text-primary truncate">{order.orderId}</p>
                      <p className="text-[10px] sm:text-xs text-sorvetao-text-secondary">Venc.: {formatDate(order.dueDate)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full sm:w-auto mt-1 sm:mt-0">
                    <p className="text-xs sm:text-sm font-semibold text-sorvetao-text-primary sm:mx-2 whitespace-nowrap">{formatCurrency(order.amountDue)}</p>
                    <button 
                        onClick={() => alert(`Pagar pedido ${order.orderId} (funcionalidade pendente)`)}
                        className="text-[10px] sm:text-xs bg-sorvetao-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-1.5 hover:bg-opacity-90 transition-colors"
                    >
                        <CreditCardIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Pagar Agora</span>
                    </button>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sorvetao-text-secondary text-center py-4 text-sm">Nenhum pedido em aberto.</p>
        )}
      </section>
    </div>
  );
};

export default CustomerDashboardPage;
