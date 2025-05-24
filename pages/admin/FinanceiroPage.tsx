import React, { useState, useMemo } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon as AccountsIcon, // Renamed for clarity in this context
  ClipboardListIcon, // Used for Receitas and Despesas
  LinkIcon, 
  CogIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ScaleIcon,
  BankIcon,
  ArchiveBoxIcon,
  ClockIcon,
  AlertTriangleIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  PencilIcon,
  ReceiptTextIcon,
  CheckCircleSolidIcon,
  XCircleIcon,
  PlusIcon,
  IconProps,
  TagIcon // Added TagIcon for Categorias tab
} from '../../components/icons';
import { FinancialAccount, AccountType, AccountStatus } from '../../types';
import AddAccountModal from '../../components/modals/AddAccountModal';
import ReceitasContent from './financeiro/ReceitasContent';
import DespesasContent from './financeiro/DespesasContent';
import TransferenciasContent from './financeiro/TransferenciasContent';
import CategoriasFinanceirasContent from './financeiro/CategoriasFinanceirasContent'; // Import the new CategoriasContent


type FinanceiroTab = 'resumo' | 'contas' | 'receitas' | 'despesas' | 'transferencias' | 'categorias';

interface TabConfig {
  id: FinanceiroTab;
  label: string;
  icon: React.FC<IconProps>;
  placeholderTitle?: string; 
  placeholderText?: string; 
}

const TABS_CONFIG: TabConfig[] = [
  { id: 'resumo', label: 'Resumo', icon: ChartBarIcon },
  { id: 'contas', label: 'Contas', icon: AccountsIcon },
  { id: 'receitas', label: 'Receitas', icon: ClipboardListIcon },
  { id: 'despesas', label: 'Despesas', icon: ClipboardListIcon },
  { id: 'transferencias', label: 'Transferências', icon: LinkIcon },
  { id: 'categorias', label: 'Categorias', icon: TagIcon }, // Updated icon
];

const formatCurrency = (value: number, symbol = 'R$') => {
  return `${symbol} ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactElement<IconProps>;
  iconBgColor?: string;
  iconTextColor?: string;
  subtext?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, iconBgColor = 'bg-pink-100', iconTextColor = 'text-sorvetao-primary', subtext }) => (
  <div className="bg-white p-5 rounded-2xl shadow-lg flex items-start space-x-4">
    <div className={`p-3 rounded-xl ${iconBgColor}`}>
      {React.cloneElement(icon, { className: `w-6 h-6 ${iconTextColor}` })}
    </div>
    <div className="flex-1">
      <p className="text-sm text-sorvetao-text-secondary">{title}</p>
      <p className="text-2xl font-bold text-sorvetao-text-primary mt-1">{value}</p>
      {subtext && <p className="text-xs text-sorvetao-text-secondary mt-0.5">{subtext}</p>}
    </div>
  </div>
);

interface ChartPlaceholderProps {
  title: string;
  periodOptions?: string[];
  defaultPeriod?: string;
  height?: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ title, periodOptions, defaultPeriod, height = 'h-72' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod || (periodOptions?.[0]));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-sorvetao-text-primary mb-2 sm:mb-0">{title}</h3>
        {periodOptions && (
          <div className="relative">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs text-sorvetao-text-secondary bg-sorvetao-gray-light hover:bg-sorvetao-gray-medium px-3 py-1.5 rounded-lg appearance-none pr-7 focus:outline-none focus:ring-1 focus:ring-sorvetao-primary"
            >
              {periodOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <ChevronDownIcon className="w-3 h-3 text-sorvetao-text-secondary absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        )}
      </div>
      <div className={`${height} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <p className="text-sorvetao-text-secondary text-sm">Placeholder para gráfico: {title}</p>
      </div>
    </div>
  );
};

interface AccountBalanceCardProps {
  accountName: string;
  balance: string;
  icon: React.ReactElement<IconProps>;
}
const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ accountName, balance, icon }) => (
  <div className="bg-sorvetao-gray-light p-4 rounded-xl flex items-center space-x-3 shadow-sm">
    <div className="p-2 bg-white rounded-full">
      {React.cloneElement(icon, { className: 'w-5 h-5 text-sorvetao-primary' })}
    </div>
    <div>
      <p className="text-sm text-sorvetao-text-secondary">{accountName}</p>
      <p className="text-md font-semibold text-sorvetao-text-primary">{balance}</p>
    </div>
  </div>
);

interface TransactionItemProps {
  description: string;
  dueDate: string;
  amount: string;
  type: 'receivable' | 'payable';
  statusIcon: React.ReactElement<IconProps>;
  statusColor: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ description, dueDate, amount, statusIcon, statusColor }) => (
  <div className="flex items-center justify-between py-2.5 px-3 bg-white hover:bg-sorvetao-gray-light rounded-lg border border-sorvetao-gray-medium transition-colors">
    <div className="flex items-center space-x-2">
      {React.cloneElement(statusIcon, { className: `w-5 h-5 ${statusColor}`})}
      <div>
        <p className="text-sm font-medium text-sorvetao-text-primary">{description}</p>
        <p className="text-xs text-sorvetao-text-secondary">Vence em: {dueDate}</p>
      </div>
    </div>
    <p className={`text-sm font-semibold ${statusColor}`}>{amount}</p>
  </div>
);

const QuickActionButton: React.FC<{label: string, icon: React.ReactElement<IconProps>, onClick: () => void}> = ({label, icon, onClick}) => (
    <button
        onClick={onClick}
        className="bg-sorvetao-secondary-bg hover:bg-blue-100 text-sorvetao-primary font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-150 shadow-sm hover:shadow-md w-full text-sm"
    >
        {React.cloneElement(icon, {className: "w-5 h-5"})}
        <span>{label}</span>
    </button>
);


const ResumoFinanceiroContent: React.FC = () => {
  const kpiData = [
    { title: 'Saldo Geral Atual', value: formatCurrency(75830.50), icon: <BanknotesIcon />, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
    { title: 'Receitas Totais (Mês Atual)', value: formatCurrency(22500.00), icon: <ArrowTrendingUpIcon />, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
    { title: 'Despesas Totais (Mês Atual)', value: formatCurrency(15200.75), icon: <ArrowTrendingDownIcon />, iconBgColor: 'bg-red-100', iconTextColor: 'text-red-600' },
    { title: 'Lucro/Prejuízo Líquido (Mês Atual)', value: formatCurrency(7299.25), icon: <ScaleIcon />, iconBgColor: 'bg-purple-100', iconTextColor: 'text-purple-600' },
  ];

  const accountBalances = [
    { name: 'Conta Corrente Principal', balance: formatCurrency(68330.50), icon: <BankIcon /> },
    { name: 'Cofre/Caixa', balance: formatCurrency(7500.00), icon: <ArchiveBoxIcon /> },
  ];
  
  const upcomingReceivables = [
    { id: 'r1', description: 'Nota Fiscal #123 - Cliente A', dueDate: '15/08/2024', amount: formatCurrency(1200), icon: <ClockIcon/>, color: 'text-yellow-600' },
    { id: 'r2', description: 'Pagamento Pedido #530 - Cliente B', dueDate: '20/08/2024', amount: formatCurrency(850), icon: <ClockIcon/>, color: 'text-yellow-600' },
  ];
  const overduePayables = [
    { id: 'p1', description: 'Fatura Fornecedor X - Matéria Prima', dueDate: '01/08/2024', amount: formatCurrency(500, '- R$'), icon: <AlertTriangleIcon/>, color: 'text-red-600' },
  ];
  
  const chartPeriodOptions = ['Últimos 30 Dias', 'Últimos 6 Meses', 'Este Ano', 'Ano Passado'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartPlaceholder title="Tendência de Receita vs. Despesa" periodOptions={chartPeriodOptions} defaultPeriod="Últimos 6 Meses" />
        </div>
        <div>
          <ChartPlaceholder title="Composição de Despesas" periodOptions={chartPeriodOptions} defaultPeriod="Este Mês"/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-sorvetao-text-primary mb-4">Saldos das Contas</h3>
          <div className="space-y-3">
            {accountBalances.map(acc => <AccountBalanceCard key={acc.name} accountName={acc.name} balance={acc.balance} icon={acc.icon} />)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-sorvetao-text-primary mb-4">Transações Pendentes e Vencidas</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-sorvetao-text-secondary mb-2">Contas a Receber</h4>
              <div className="space-y-2">
                {upcomingReceivables.map(item => <TransactionItem key={item.id} description={item.description} dueDate={item.dueDate} amount={item.amount} type="receivable" statusIcon={item.icon} statusColor={item.color} />)}
                {upcomingReceivables.length === 0 && <p className="text-xs text-sorvetao-text-secondary text-center py-2">Nenhuma conta a receber pendente.</p>}
              </div>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-sorvetao-text-secondary mb-2">Contas a Pagar</h4>
              <div className="space-y-2">
                {overduePayables.map(item => <TransactionItem key={item.id} description={item.description} dueDate={item.dueDate} amount={item.amount} type="payable" statusIcon={item.icon} statusColor={item.color} />)}
                {overduePayables.length === 0 && <p className="text-xs text-sorvetao-text-secondary text-center py-2">Nenhuma conta a pagar pendente.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-sorvetao-text-primary mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <QuickActionButton label="+ Nova Receita" icon={<PlusCircleIcon/>} onClick={() => alert('Nova Receita Clicado')} />
            <QuickActionButton label="+ Nova Despesa" icon={<PlusCircleIcon/>} onClick={() => alert('Nova Despesa Clicado')} />
            <QuickActionButton label="+ Nova Transferência" icon={<PlusCircleIcon/>} onClick={() => alert('Nova Transferência Clicado')} />
        </div>
      </div>
    </div>
  );
};

const initialMockAccounts: FinancialAccount[] = [
  { id: '1', nomeConta: 'Conta Corrente Bradesco', tipoConta: AccountType.CONTA_CORRENTE, saldoInicial: 10000, totalEntradasMesAtual: 5000, totalSaidasMesAtual: 2000, saldoAtual: 13000, status: AccountStatus.ATIVA, instituicaoFinanceira: 'Bradesco', agencia: '1234', numeroConta: '56789-0' },
  { id: '2', nomeConta: 'Cofre Matriz', tipoConta: AccountType.CAIXA, saldoInicial: 1500, totalEntradasMesAtual: 800, totalSaidasMesAtual: 300, saldoAtual: 2000, status: AccountStatus.ATIVA },
  { id: '3', nomeConta: 'Conta Poupança Itaú', tipoConta: AccountType.INVESTIMENTO, saldoInicial: 25000, totalEntradasMesAtual: 100, totalSaidasMesAtual: 0, saldoAtual: 25100, status: AccountStatus.ATIVA, instituicaoFinanceira: 'Itaú' },
  { id: '4', nomeConta: 'Conta Despesas Viagem', tipoConta: AccountType.CAIXA, saldoInicial: 0, totalEntradasMesAtual: 0, totalSaidasMesAtual: 0, saldoAtual: 0, status: AccountStatus.INATIVA },
];

const ContasFinanceirasContent: React.FC = () => {
  const [accounts, setAccounts] = useState<FinancialAccount[]>(initialMockAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<FinancialAccount | null>(null);

  const handleOpenModal = (account?: FinancialAccount) => {
    setEditingAccount(account || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSaveAccount = (account: FinancialAccount) => {
    setAccounts(prev => {
      const existing = prev.find(a => a.id === account.id);
      if (existing) {
        return prev.map(a => a.id === account.id ? account : a);
      }
      return [...prev, account];
    });
  };

  const handleViewStatement = (accountId: string) => {
    alert(`Ver extrato da conta ID: ${accountId} (funcionalidade a ser implementada).`);
  };

  const handleToggleStatus = (accountId: string) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === accountId 
        ? { ...acc, status: acc.status === AccountStatus.ATIVA ? AccountStatus.INATIVA : AccountStatus.ATIVA }
        : acc
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-sorvetao-text-primary mb-3 sm:mb-0">Gerenciamento de Contas Financeiras</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition flex items-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Adicionar Nova Conta</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white p-1 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-sorvetao-gray-light">
          <thead className="bg-sorvetao-pink-light">
            <tr>
              {['Nome da Conta', 'Tipo', 'Saldo Inicial', 'Entradas (Mês)', 'Saídas (Mês)', 'Saldo Atual', 'Status', 'Ações'].map(header => (
                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sorvetao-gray-light">
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-sorvetao-text-primary">{account.nomeConta}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{account.tipoConta}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatCurrency(account.saldoInicial)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">{formatCurrency(account.totalEntradasMesAtual)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">{formatCurrency(account.totalSaidasMesAtual)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-sorvetao-text-primary">{formatCurrency(account.saldoAtual)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${account.status === AccountStatus.ATIVA ? 'bg-sorvetao-green-badge-bg text-sorvetao-green-badge-text' : 'bg-sorvetao-gray-badge-bg text-sorvetao-gray-badge-text'}`}>
                    {account.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleOpenModal(account)} title="Editar Conta" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleViewStatement(account.id)} title="Ver Extrato" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors">
                      <ReceiptTextIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(account.id)} 
                      title={account.status === AccountStatus.ATIVA ? "Desativar Conta" : "Ativar Conta"}
                      className={`p-1.5 rounded-full transition-colors ${
                        account.status === AccountStatus.ATIVA 
                          ? 'text-red-500 hover:text-red-700 hover:bg-red-100' 
                          : 'text-green-500 hover:text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {account.status === AccountStatus.ATIVA ? <XCircleIcon className="w-4 h-4" /> : <CheckCircleSolidIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
             {accounts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm text-sorvetao-text-secondary">
                    Nenhuma conta financeira cadastrada. Clique em "+ Adicionar Nova Conta".
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <AddAccountModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveAccount}
        existingAccount={editingAccount} 
      />
    </div>
  );
};


const FinanceiroPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FinanceiroTab>('resumo');
  const currentTabConfig = TABS_CONFIG.find(tab => tab.id === activeTab);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-sorvetao-text-primary mb-4 sm:mb-0">Financeiro</h1>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap border-b border-sorvetao-gray-medium">
          {TABS_CONFIG.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
                ${activeTab === tab.id ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-sorvetao-primary' : ''}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {activeTab === 'resumo' && <ResumoFinanceiroContent />}
      {activeTab === 'contas' && <ContasFinanceirasContent />}
      {activeTab === 'receitas' && <ReceitasContent />}
      {activeTab === 'despesas' && <DespesasContent />}
      {activeTab === 'transferencias' && <TransferenciasContent />}
      {activeTab === 'categorias' && <CategoriasFinanceirasContent />}


      {activeTab !== 'resumo' && activeTab !== 'contas' && activeTab !== 'receitas' && activeTab !== 'despesas' && activeTab !== 'transferencias' && activeTab !== 'categorias' && currentTabConfig && (
        <div className="text-center py-10">
          <currentTabConfig.icon className="w-16 h-16 text-sorvetao-gray-medium mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-sorvetao-text-primary">{currentTabConfig.placeholderTitle}</h2>
          <p className="text-sorvetao-text-secondary mt-2 px-4">{currentTabConfig.placeholderText}</p>
          <p className="text-sorvetao-text-secondary mt-1">Em construção.</p>
        </div>
      )}
    </div>
  );
};

export default FinanceiroPage;