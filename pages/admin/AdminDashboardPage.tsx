
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  PlusIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UsersIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  AlertTriangleIcon,
  BankIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  UserPlusIcon,
  ReceiptTextIcon,
  ChartPieIcon,
  ClockIcon,
  BellIcon,
  ChevronDownIcon
} from '../../components/icons'; 

const formatCurrency = (value: number) => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

interface KpiCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactElement<{ className?: string }>;
  iconBgColor: string;
  iconTextColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, subtext, icon, iconBgColor, iconTextColor }) => (
  <div className="bg-white p-5 rounded-2xl shadow-lg flex items-center space-x-4">
    <div className={`p-3 rounded-xl ${iconBgColor}`}>
      {React.cloneElement(icon, { className: `w-7 h-7 ${iconTextColor}` })}
    </div>
    <div>
      <p className="text-sm text-sorvetao-text-secondary">{title}</p>
      <p className="text-2xl font-bold text-sorvetao-text-primary">{value}</p>
      <p className="text-xs text-sorvetao-text-secondary">{subtext}</p>
    </div>
  </div>
);

interface ActivityItemProps {
  icon: React.ReactElement<{ className?: string }>;
  iconBgClass: string;
  iconClass: string;
  title: string;
  subtitle: string;
  itemBgClass?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, iconBgClass, iconClass, title, subtitle, itemBgClass = "bg-sorvetao-secondary-bg hover:bg-opacity-80" }) => (
  <div className={`p-3 rounded-xl flex items-center space-x-3 transition-colors ${itemBgClass}`}>
    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${iconBgClass}`}>
      {React.cloneElement(icon, { className: `w-5 h-5 ${iconClass}` })}
    </div>
    <div>
      <p className="text-sm font-medium text-sorvetao-text-primary">{title}</p>
      <p className="text-xs text-sorvetao-text-secondary">{subtitle}</p>
    </div>
  </div>
);


const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const recentOrders = [
    { id: '1', icon: <ShoppingBagIcon />, title: 'Pedido #534 - Delícias Doces', subtitle: 'Em Processamento', iconBg: 'bg-pink-100', iconColor: 'text-sorvetao-primary' },
    { id: '2', icon: <ShoppingBagIcon />, title: 'Pedido #533 - Paraiso do Gelo', subtitle: 'Enviado', iconBg: 'bg-pink-100', iconColor: 'text-sorvetao-primary' },
    { id: '3', icon: <ShoppingBagIcon />, title: 'Pedido #532 - Gelados Refrescantes', subtitle: 'Concluído', iconBg: 'bg-pink-100', iconColor: 'text-sorvetao-primary'},
  ];

  const pendingTasks = [
    { id: 't1', icon: <AlertTriangleIcon />, title: '3 Pedidos Aguardando Atendimento', subtitle: 'Urgente', iconBg: 'bg-red-100', iconColor: 'text-red-600', itemBg: 'bg-red-50 hover:bg-red-100' },
    { id: 't2', icon: <UsersIcon />, title: '2 Clientes Aguardando Configuração', subtitle: 'Prioridade Média', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', itemBg: 'bg-blue-50 hover:bg-blue-100' },
  ];

  const topCategories = [
    { name: 'Copos', color: 'bg-red-600' },
    { name: 'Picolés', color: 'bg-pink-500' },
    { name: 'Potes', color: 'bg-pink-400' },
    { name: 'Especiais', color: 'bg-blue-500' },
    { name: 'Casquinhas', color: 'bg-blue-400' },
  ];


  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-sorvetao-text-primary mb-4 sm:mb-0">Painel do Sistema</h1>
        <button 
          onClick={() => navigate('/admin/pedidos/novo')} // Updated onClick handler
          className="bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition flex items-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Criar Novo Pedido</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard title="Vendas Totais" value={formatCurrency(47600)} subtext="Mês Atual" icon={<DollarSignIcon />} iconBgColor="bg-pink-100" iconTextColor="text-pink-600" />
        <KpiCard title="Novos Pedidos" value="14" subtext="Hoje / Esta Semana" icon={<ShoppingCartIcon />} iconBgColor="bg-purple-100" iconTextColor="text-purple-600" />
        <KpiCard title="Clientes Ativos" value="28" subtext="Total Atual" icon={<UsersIcon />} iconBgColor="bg-sky-100" iconTextColor="text-sky-600" />
        <KpiCard title="Pagamentos Pendentes" value={formatCurrency(12850)} subtext="De Pedidos B2B" icon={<CreditCardIcon />} iconBgColor="bg-red-100" iconTextColor="text-red-600" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tendência de Receita de Vendas */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-sorvetao-text-primary">Tendência de Receita de Vendas</h2>
            <button className="text-sm text-sorvetao-primary hover:bg-sorvetao-pink-light px-3 py-1.5 rounded-lg flex items-center">
              Últimos 30 Dias <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
          {/* Placeholder for chart */}
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
             <img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="Sales Trend Chart Placeholder" className="opacity-50 max-h-full w-auto"/>
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-sorvetao-text-primary mb-1">Atividade Recente</h2>
          <div className="space-y-4 mt-4">
            <div>
                <div className="flex items-center text-sm text-sorvetao-text-secondary mb-2">
                    <ClockIcon className="w-4 h-4 mr-1.5"/> Pedidos Recentes
                </div>
                <div className="space-y-2.5">
                    {recentOrders.map(order => (
                        <ActivityItem key={order.id} icon={order.icon} iconBgClass={order.iconBg} iconClass={order.iconColor} title={order.title} subtitle={order.subtitle} />
                    ))}
                </div>
            </div>
            <div className="pt-2">
                <div className="flex items-center text-sm text-sorvetao-text-secondary mb-2">
                    <BellIcon className="w-4 h-4 mr-1.5"/> Tarefas Pendentes
                </div>
                <div className="space-y-2.5">
                    {pendingTasks.map(task => (
                        <ActivityItem key={task.id} icon={task.icon} iconBgClass={task.iconBg} iconClass={task.iconColor} title={task.title} subtitle={task.subtitle} itemBgClass={task.itemBg}/>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resumo Financeiro */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-sorvetao-text-primary mb-4">Resumo Financeiro</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-sorvetao-text-secondary mb-2">Saldos de Contas Principais</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-3.5 rounded-xl">
                  <div className="flex items-center">
                    <BankIcon className="w-5 h-5 text-sorvetao-primary mr-2.5" />
                    <span className="text-sm text-sorvetao-text-primary">Conta Bancária Principal</span>
                  </div>
                  <span className="text-sm font-semibold text-sorvetao-text-primary">{formatCurrency(17250)}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3.5 rounded-xl">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 text-sorvetao-primary mr-2.5" />
                    <span className="text-sm text-sorvetao-text-primary">Dinheiro em Caixa</span>
                  </div>
                  <span className="text-sm font-semibold text-sorvetao-text-primary">{formatCurrency(3450)}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-sorvetao-text-secondary mt-3 mb-2">Receita vs. Despesas (Mês Atual)</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sorvetao-text-primary">Receita Total</span>
                    <span className="font-semibold text-sorvetao-primary">{formatCurrency(54200)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-sorvetao-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sorvetao-text-primary">Despesas Totais</span>
                    <span className="font-semibold text-sorvetao-text-secondary">{formatCurrency(28500)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-sorvetao-text-secondary h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categorias Mais Vendidas */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-sorvetao-text-primary mb-4">Categorias Mais Vendidas</h2>
          <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg mb-4">
            {/* Placeholder for donut chart */}
            <img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="Donut Chart Placeholder" className="opacity-50 h-32 w-auto"/>
          </div>
          <div className="space-y-1.5">
            {topCategories.map(category => (
              <div key={category.name} className="flex items-center text-sm">
                <span className={`w-3 h-3 rounded-sm mr-2.5 ${category.color}`}></span>
                <span className="text-sorvetao-text-secondary">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-sorvetao-text-primary mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Adicionar Produto', icon: <PlusCircleIcon className="w-7 h-7 text-sorvetao-primary" /> },
              { label: 'Adicionar Cliente', icon: <UserPlusIcon className="w-7 h-7 text-sorvetao-primary" /> },
              { label: 'Criar Fatura', icon: <ReceiptTextIcon className="w-7 h-7 text-sorvetao-primary" /> },
              { label: 'Gerar Relatório', icon: <ChartPieIcon className="w-7 h-7 text-sorvetao-primary" /> },
            ].map(action => (
              <button key={action.label} className="bg-sorvetao-secondary-bg hover:bg-blue-100 p-4 rounded-xl flex flex-col items-center justify-center space-y-1.5 transition-colors shadow-sm hover:shadow-md">
                {action.icon}
                <span className="text-xs font-medium text-sorvetao-primary text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;