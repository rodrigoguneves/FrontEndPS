import React from 'react';

export enum UserRole {
  RESELLER = 'reseller',
  MANAGER = 'manager',
  ADMIN = 'admin',
  CUSTOMER = 'customer', // Added customer role
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string; // URL to avatar image
}

export enum CustomerStatus {
  ACTIVE = 'Ativo',
  INACTIVE = 'Inativo',
}

export interface Customer {
  id: string;
  cliente: string; // Company Name
  responsavel: string; // Contact Person
  email: string;
  status: CustomerStatus;
  entregaHabilitada: boolean; // Delivery enabled
}

export interface AdminNavItem {
  label:string;
  icon: (props: { className?: string }) => React.ReactNode;
  path: string;
}

// Customer Nav Item Type
export interface CustomerNavItem {
  label:string;
  icon: (props: { className?: string }) => React.ReactNode;
  path: string;
  nameMatch?: string; // for more precise active state matching if needed
}


export interface TableAction {
  icon: (props: { className?: string }) => React.ReactNode;
  onClick: (id: string) => void;
  tooltip: string;
  colorClass?: string; // e.g., 'text-red-500 hover:text-red-700'
}

export interface ChildrenProps {
  children: React.ReactNode;
}

// Updated types for PedidosPage based on new design
export enum PaymentStatus { // Corresponds to "Status" column in new design
  PAID = 'Paid',
  PENDING = 'Pending',
  UNPAID = 'Unpaid',
  CANCELED = 'Canceled',
}

export enum FulfillmentStatus { // Corresponds to "Pagamento" column in new design (fulfillment/shipment)
  NEW = 'New',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELED = 'Canceled',
}

export interface Order {
  pedidoId: string; // e.g., "#100234"
  customerName: string;
  customerAvatarUrl?: string; // URL for client's avatar
  orderDate: string; // Should be ISO string e.g. "2024-07-29"
  valorTotal: number;
  paymentStatus: PaymentStatus;     // For "Status" column
  fulfillmentStatus: FulfillmentStatus; // For "Pagamento" column
}

// Types for FinanceiroPage - Contas
export enum AccountType {
  CONTA_CORRENTE = 'Conta Corrente',
  CAIXA = 'Caixa',
  INVESTIMENTO = 'Investimento',
  CARTAO_CREDITO = 'Cartão de Crédito', // This is more for tracking a CC bill as an account, not a payment method here
  OUTRO = 'Outro',
}

export enum AccountStatus {
  ATIVA = 'Ativa',
  INATIVA = 'Inativa',
}

export interface FinancialAccount {
  id: string;
  nomeConta: string;
  tipoConta: AccountType;
  saldoInicial: number;
  totalEntradasMesAtual: number;
  totalSaidasMesAtual: number;
  saldoAtual: number; // Calculated: saldoInicial + totalEntradasMesAtual - totalSaidasMesAtual
  status: AccountStatus;
  instituicaoFinanceira?: string;
  agencia?: string;
  numeroConta?: string;
}

// Types for FinanceiroPage - Receitas
export enum RevenueTransactionStatus {
  PENDENTE = 'Pendente',
  EFETIVADA = 'Efetivada',
  CANCELADA = 'Cancelada', // Added for completeness
}

export interface RevenueCategory {
  id: string;
  name: string;
  parentId?: string; // ID of the parent category if this is a subcategory
  description?: string; // Optional description for the category
}

export interface RevenueTransaction {
  id: string;
  status: RevenueTransactionStatus;
  dataEfetivacao?: string; // Effective Date (optional if pending)
  dataVencimento: string; // Due Date
  dataLancamento: string; // Entry Date
  descricao: string;
  categoriaId: string; // Link to RevenueCategory
  subCategoria?: string; // Optional subcategory as text for now
  contaDestinoId: string; // Link to FinancialAccount
  valor: number;
  linkedOrderId?: string; // e.g., "#100234"
  observacoes?: string;
}

// Types for FinanceiroPage - Despesas
export enum ExpenseTransactionStatus {
  PENDENTE = 'Pendente',
  PAGA = 'Paga',
  CANCELADA = 'Cancelada',
  VENCIDA = 'Vencida',
}

export interface ExpenseCategory {
  id: string;
  name: string;
  parentId?: string; // ID of the parent category if this is a subcategory
  description?: string; // Optional description for the category
}

export enum PaymentMethod {
  BOLETO = 'Boleto Bancário',
  CARTAO_CREDITO_CORPORATIVO = 'Cartão de Crédito Corporativo',
  CARTAO_DEBITO = 'Cartão de Débito',
  TRANSFERENCIA = 'Transferência Bancária',
  DINHEIRO = 'Dinheiro',
  PIX = 'PIX',
  DEBITO_AUTOMATICO = 'Débito Automático',
  OUTRO = 'Outro',
}

export interface CreditCardInfo { // For tracking credit cards used for payments
  id: string;
  name: string; // e.g., "Nubank PJ Final 1234"
  issuer?: string; // e.g., "Nubank"
  lastFourDigits?: string;
}

export interface ExpenseTransaction {
  id: string;
  status: ExpenseTransactionStatus;
  dataEfetivacao?: string; // Effective Date (optional if pending, set when paid)
  dataVencimento: string; // Due Date
  dataLancamento: string; // Entry Date
  descricao: string;
  categoriaId: string; // Link to ExpenseCategory
  subCategoria?: string; // Optional subcategory as text
  contaOrigemId: string; // Link to FinancialAccount (paying account)
  valor: number;
  paymentMethod?: PaymentMethod;
  cardUsedId?: string; // Link to CreditCardInfo if applicable
  linkedInvoiceId?: string; // e.g., ID of a supplier invoice or PO
  fornecedor?: string; // Supplier name, optional
  observacoes?: string;
}

// Types for FinanceiroPage - Transferências
export interface TransferTransaction {
  id: string;
  transferDate: string; // Effective date of the transfer
  description: string; // Description or reference for the transfer
  sourceAccountId: string; // ID of the source FinancialAccount
  destinationAccountId: string; // ID of the destination FinancialAccount
  amount: number; // Amount transferred
}

// Types for Customer Portal "Meus Pedidos" page
export enum CustomerOrderStatus {
  EM_PROCESSAMENTO = 'Em Processamento',
  ENVIADO = 'Enviado',
  PENDENTE_PAGAMENTO = 'Pendente Pagamento',
  ENTREGUE = 'Entregue',
  CANCELADO = 'Cancelado',
  AGUARDANDO_PAGAMENTO = 'Aguardando Pagamento', // From new Order Details screenshot
}

export interface CustomerPortalOrder {
  id: string;
  orderDisplayId: string; // e.g., "#1011"
  orderDate: string; // Format: "YYYY-MM-DD"
  totalAmount: number;
  status: CustomerOrderStatus;
}

// Types for Customer Portal "Novo Pedido" page
export interface ProductInfo {
  id: string; // Unique ID for the product variant (e.g., "copo_baunilha_120ml", "picole_morango_unidade")
  baseId: string; // Base product ID (e.g., "copo_baunilha", "picole_morango")
  name: string; // Full display name (e.g., "Copo Baunilha 120ml")
  price: number; // Price for this specific product variant/sale unit
  unitLabel: string; // e.g., "R$2,50/un"
  categoryId: string;
  baseUnitMultiplier: number; // How many base units this product represents (e.g., 1 for unit, 12 for Meia Caixa)
}

export interface SaleUnitOption {
  id: string; // e.g., 'unidades', 'meias_caixas_12un'
  label: string; // e.g., "Unidades"
  multiplier: number; // e.g., 1 for unit, 12 for meia_caixa_12un
}

export interface ProductCategoryUIData {
  id: string;
  name: string;
  icon: React.FC<any>; // Allow any icon props for now
  itemCountBadge: number; // Number of base products
  products: ProductInfo[];
  isPopsicleCategory?: boolean;
  saleUnitOptions?: SaleUnitOption[]; // Tabs for popsicle categories
}

export interface CartItem {
  productId: string; // This ID should be unique for product + sale unit combination
  name: string;
  quantity: number; // This is the quantity of the *selected sale unit*
  unitPrice: number; // Price of one selected sale unit
  baseUnitMultiplier: number; // How many base units one cart item represents
  categoryId: string;
  categoryName: string;
}

// Types for Customer Order Details Page
export enum OrderFulfillmentType {
  ENTREGA = 'Entrega',
  RETIRADA = 'Retirada na Fábrica',
}

export enum CustomerOrderPaymentStatus {
  PENDENTE = 'Pendente',
  PARCIALMENTE_PAGO = 'Parcialmente Pago',
  PAGO = 'Pago',
  REEMBOLSADO = 'Reembolsado',
}

export interface CustomerOrderLineItem {
  id: string;
  productName: string;
  saleUnit: string; // e.g., "Caixa 24un", "120ml", "Unidade"
  sku: string;
  unitPrice: number; // Price per single base unit (e.g., price of one popsicle)
  quantity: number; // Number of base units (e.g., 24 for a box of 24)
  lineTotal: number; // quantity * unitPrice
}

export interface CustomerPaymentRecord {
  id: string;
  date: string; // "YYYY-MM-DD"
  amount: number;
  method: string; // e.g., "PIX", "Boleto"
  reference?: string;
}

export interface CustomerDetailedOrder {
  id: string; // Internal ID
  displayId: string; // e.g., "#493872"
  orderDate: string; // "YYYY-MM-DD"
  status: CustomerOrderStatus; 
  fulfillmentType: OrderFulfillmentType;
  deliveryAddress?: string;
  requestedDeliveryDate?: string; // "YYYY-MM-DD"
  items: CustomerOrderLineItem[];
  subtotalProdutos: number;
  discountApplied?: number;
  discountReason?: string;
  shippingCost?: number;
  grandTotal: number;
  paymentStatus: CustomerOrderPaymentStatus;
  paymentsMade: CustomerPaymentRecord[];
}