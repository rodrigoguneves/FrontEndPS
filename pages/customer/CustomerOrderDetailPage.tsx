
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TruckIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
  ReceiptTextIcon,
  InformationCircleIcon,
  BanknotesIcon,
  ArrowPathIcon,
  PrinterIcon,
  DocumentArrowDownIcon,
  CreditCardIcon,
  DotIcon, // Assuming DotIcon is small and filled
  ChevronLeftIcon, // For back button
  // Fix: Import TagIcon
  TagIcon,
} from '../../components/icons';
import { CustomerDetailedOrder, CustomerOrderStatus, OrderFulfillmentType, CustomerOrderPaymentStatus, CustomerOrderLineItem } from '../../types';

// Mock data for a single detailed order
const mockDetailedOrder: CustomerDetailedOrder = {
  id: 'order_493872',
  displayId: '#493872',
  orderDate: '2024-04-18',
  status: CustomerOrderStatus.AGUARDANDO_PAGAMENTO,
  fulfillmentType: OrderFulfillmentType.ENTREGA,
  deliveryAddress: 'Rua das Flores, 251, Centro, São Paulo - SP, 01234-000',
  requestedDeliveryDate: '2024-04-21',
  items: [
    { id: 'item1', productName: 'Picolé Abacaxi', saleUnit: 'Caixa 24un', sku: 'PIC-ABAC24', unitPrice: 1.20, quantity: 24, lineTotal: 28.80 },
    { id: 'item2', productName: 'Copo Baunilha', saleUnit: '120ml', sku: 'COP-BAU120', unitPrice: 2.50, quantity: 3, lineTotal: 7.50 },
    { id: 'item3', productName: 'Picolé Morango', saleUnit: 'Unidade', sku: 'PIC-MORUN', unitPrice: 1.10, quantity: 15, lineTotal: 16.50 },
  ],
  subtotalProdutos: 52.80,
  discountApplied: 5.00,
  discountReason: 'Promoção Dia do Sorvete',
  shippingCost: 18.00,
  grandTotal: 65.80,
  paymentStatus: CustomerOrderPaymentStatus.PENDENTE,
  paymentsMade: [],
};

// Helper function for currency formatting
const formatCurrency = (value: number, includeSign = false) => {
  const sign = value < 0 ? '-' : (includeSign && value > 0 ? '+' : '');
  return `${sign}R$ ${Math.abs(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper function for date formatting
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/D';
  const date = new Date(dateString + 'T00:00:00'); // Ensure date is parsed as local
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  badgeText?: string;
  badgeColorClass?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, badgeText, badgeColorClass = 'bg-pink-100 text-pink-700', children }) => (
  <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg mb-5">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <div className="bg-pink-100 p-2 rounded-full mr-3">
          {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 text-sorvetao-primary" })}
        </div>
        <h2 className="text-md sm:text-lg font-semibold text-sorvetao-text-primary">{title}</h2>
      </div>
      {badgeText && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColorClass}`}>
          {badgeText}
        </span>
      )}
    </div>
    {children}
  </div>
);

const CustomerOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  
  // In a real app, fetch orderDetails based on orderId
  const orderDetails = mockDetailedOrder; // Using mock data

  if (!orderDetails) {
    return <div className="text-center py-10">Pedido não encontrado.</div>;
  }

  const getOrderStatusColor = (status: CustomerOrderStatus) => {
    switch (status) {
      case CustomerOrderStatus.AGUARDANDO_PAGAMENTO:
      case CustomerOrderStatus.PENDENTE_PAGAMENTO:
      case CustomerOrderStatus.CANCELADO:
        return 'text-red-600';
      case CustomerOrderStatus.EM_PROCESSAMENTO:
        return 'text-yellow-600';
      case CustomerOrderStatus.ENVIADO:
        return 'text-blue-600';
      case CustomerOrderStatus.ENTREGUE:
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const getPaymentStatusColor = (status: CustomerOrderPaymentStatus) => {
    switch (status) {
      case CustomerOrderPaymentStatus.PENDENTE:
        return 'text-red-600';
      case CustomerOrderPaymentStatus.PARCIALMENTE_PAGO:
        return 'text-yellow-600';
      case CustomerOrderPaymentStatus.PAGO:
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };


  return (
    <div className="max-w-3xl mx-auto pb-8">
        <button 
            onClick={() => navigate(-1)} 
            className="mb-4 inline-flex items-center text-sm text-sorvetao-primary hover:underline"
        >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Voltar para Meus Pedidos
        </button>

      {/* Order Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-sorvetao-text-primary">PEDIDO {orderDetails.displayId}</h1>
          <p className="text-xs sm:text-sm text-sorvetao-text-secondary mt-1 sm:mt-0">Realizado em {formatDate(orderDetails.orderDate)}</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-sorvetao-text-secondary mr-2">STATUS:</span>
          <DotIcon className={`w-3 h-3 mr-1.5 ${getOrderStatusColor(orderDetails.status)}`} />
          <span className={`text-sm font-semibold ${getOrderStatusColor(orderDetails.status)}`}>
            {orderDetails.status}
          </span>
        </div>
      </div>

      {/* Delivery Information */}
      <SectionCard title="Informações de Entrega" icon={<TruckIcon />} badgeText={orderDetails.fulfillmentType}>
        <div className="space-y-2.5 text-sm">
          <div className="flex items-start">
            <MapPinIcon className="w-4 h-4 text-sorvetao-text-secondary mr-2.5 mt-0.5 flex-shrink-0" />
            <p className="text-sorvetao-text-primary">
              <span className="font-medium">Endereço de Entrega: </span>
              {orderDetails.deliveryAddress || 'Não aplicável (Retirada)'}
            </p>
          </div>
          {orderDetails.fulfillmentType === OrderFulfillmentType.ENTREGA && orderDetails.requestedDeliveryDate && (
            <div className="flex items-center">
              <CalendarDaysIcon className="w-4 h-4 text-sorvetao-text-secondary mr-2.5 flex-shrink-0" />
              <p className="text-sorvetao-text-primary">
                <span className="font-medium">Data de Entrega Solicitada: </span>
                {formatDate(orderDetails.requestedDeliveryDate)}
              </p>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Products */}
      <SectionCard title="Produtos do Pedido" icon={<ShoppingBagIcon />}>
        <div className="space-y-3">
          {orderDetails.items.map(item => (
            <div key={item.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-sorvetao-text-primary">{item.productName} <span className="text-xs text-gray-500">({item.saleUnit})</span></p>
                  <p className="text-xs text-sorvetao-text-secondary">SKU: {item.sku}</p>
                </div>
                <p className="text-sm font-semibold text-sorvetao-text-primary whitespace-nowrap">{formatCurrency(item.lineTotal)}</p>
              </div>
              <p className="text-xs text-sorvetao-text-secondary mt-0.5">
                {item.quantity} un x {formatCurrency(item.unitPrice)}/un
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Order Summary */}
      <SectionCard title="Resumo do Pedido" icon={<ReceiptTextIcon />}>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-sorvetao-text-secondary">Subtotal (Produtos):</span>
            <span className="text-sorvetao-text-primary">{formatCurrency(orderDetails.subtotalProdutos)}</span>
          </div>
          {orderDetails.discountApplied && orderDetails.discountApplied > 0 && (
            <div className="flex justify-between">
              <span className="text-sorvetao-text-secondary flex items-center">
                Desconto Aplicado
                {/* Fix: Wrap icon in a span with title for tooltip */}
                {orderDetails.discountReason && <span title={orderDetails.discountReason}><InformationCircleIcon className="w-3.5 h-3.5 text-gray-400 ml-1"/></span>}
              </span>
              <span className="text-red-600">{formatCurrency(-orderDetails.discountApplied)}</span>
            </div>
          )}
          {orderDetails.shippingCost && orderDetails.shippingCost > 0 && (
            <div className="flex justify-between">
              <span className="text-sorvetao-text-secondary">Custo de Entrega:</span>
              <span className="text-sorvetao-text-primary">{formatCurrency(orderDetails.shippingCost)}</span>
            </div>
          )}
          <div className="flex justify-between text-md font-bold text-sorvetao-primary pt-2 border-t border-gray-200 mt-2">
            <span>Total Final:</span>
            <span>{formatCurrency(orderDetails.grandTotal)}</span>
          </div>
          {orderDetails.discountReason && (
             <div className="flex items-center text-xs text-sorvetao-text-secondary mt-2">
                {/* Fix: Ensure TagIcon is imported */}
                <TagIcon className="w-3.5 h-3.5 mr-1.5 text-pink-500" />
                <span>Motivo do desconto: {orderDetails.discountReason}</span>
             </div>
          )}
        </div>
      </SectionCard>

      {/* Payment Information */}
      <SectionCard title="Pagamento" icon={<BanknotesIcon />}>
        <div className="text-sm">
          <div className="flex items-center mb-3">
            <span className="font-medium text-sorvetao-text-secondary mr-2">STATUS DO PAGAMENTO:</span>
            <DotIcon className={`w-3 h-3 mr-1.5 ${getPaymentStatusColor(orderDetails.paymentStatus)}`} />
            <span className={`font-semibold ${getPaymentStatusColor(orderDetails.paymentStatus)}`}>
              {orderDetails.paymentStatus}
            </span>
          </div>
          <div className="flex items-start">
            <CalendarDaysIcon className="w-4 h-4 text-sorvetao-text-secondary mr-2.5 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-sorvetao-text-primary">Pagamentos realizados:</span>
              {orderDetails.paymentsMade.length > 0 ? (
                <ul className="list-disc list-inside ml-1 mt-1 text-gray-600 text-xs">
                  {orderDetails.paymentsMade.map(payment => (
                    <li key={payment.id}>
                      {formatDate(payment.date)} - {formatCurrency(payment.amount)} ({payment.method})
                      {payment.reference && ` - Ref: ${payment.reference}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-xs mt-0.5">Nenhum pagamento registrado até o momento.</p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>
      
      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="flex items-center justify-center space-x-2 bg-sorvetao-primary text-white py-2.5 px-4 rounded-xl hover:bg-opacity-90 transition-colors text-sm font-medium">
            <ArrowPathIcon className="w-4 h-4" /><span>Repetir Pedido</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-gray-200 text-sorvetao-text-secondary py-2.5 px-4 rounded-xl hover:bg-gray-300 transition-colors text-sm font-medium">
            <PrinterIcon className="w-4 h-4" /><span>Imprimir Pedido</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-gray-200 text-sorvetao-text-secondary py-2.5 px-4 rounded-xl hover:bg-gray-300 transition-colors text-sm font-medium">
            <DocumentArrowDownIcon className="w-4 h-4" /><span>Baixar PDF</span>
          </button>
        </div>
        {orderDetails.status === CustomerOrderStatus.AGUARDANDO_PAGAMENTO || orderDetails.status === CustomerOrderStatus.PENDENTE_PAGAMENTO || orderDetails.paymentStatus === CustomerOrderPaymentStatus.PENDENTE ? (
          <button className="w-full flex items-center justify-center space-x-2 bg-pink-600 text-white py-3 px-4 rounded-xl hover:bg-pink-700 transition-colors text-base font-semibold shadow-md">
            <CreditCardIcon className="w-5 h-5" /><span>Realizar Pagamento</span>
          </button>
        ) : null}
      </div>
      <footer className="mt-8 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Pedidos Sorvetão. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default CustomerOrderDetailPage;