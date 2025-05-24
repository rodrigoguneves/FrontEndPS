import React, { useState, useMemo } from 'react';
import { 
  ExpenseTransaction, 
  ExpenseTransactionStatus, 
  ExpenseCategory, 
  FinancialAccount,
  CreditCardInfo,
  AccountStatus,
  AccountType,
  PaymentMethod
} from '../../../types';
import { 
  PlusIcon, 
  SearchIcon, 
  CalendarIcon, 
  ChevronDownIcon, 
  ArrowPathIcon, 
  PencilIcon, 
  TrashIcon, 
  ClockIcon, 
  CheckCircleSolidIcon,
  DuplicateIcon,
  FunnelIcon,
  XCircleIcon,
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon as CardIcon // For Cartão Utilizado filter
} from '../../../components/icons';
import AddExpenseModal from '../../../components/modals/AddExpenseModal';

// Mock Data (replace with actual data fetching)
const mockExpenseCategories: ExpenseCategory[] = [
  { id: 'expCat1', name: 'Matéria Prima' },
  { id: 'expCat2', name: 'Custos Operacionais' },
  { id: 'expCat3', name: 'Marketing e Vendas' },
  { id: 'expCat4', name: 'Despesas Administrativas' },
  { id: 'expCat5', name: 'Impostos e Taxas' },
];

const mockFinancialAccounts: FinancialAccount[] = [
    { id: 'acc1', nomeConta: 'Conta Corrente Bradesco', tipoConta: AccountType.CONTA_CORRENTE, saldoInicial: 10000, totalEntradasMesAtual: 5000, totalSaidasMesAtual: 2000, saldoAtual: 13000, status: AccountStatus.ATIVA },
    { id: 'acc2', nomeConta: 'Caixa Interno', tipoConta: AccountType.CAIXA, saldoInicial: 1500, totalEntradasMesAtual: 800, totalSaidasMesAtual: 300, saldoAtual: 2000, status: AccountStatus.ATIVA },
    { id: 'acc3', nomeConta: 'Cartão PJ Nubank', tipoConta: AccountType.CARTAO_CREDITO, saldoInicial: 0, totalEntradasMesAtual: 0, totalSaidasMesAtual: 1200, saldoAtual: -1200, status: AccountStatus.ATIVA }, // Example credit card account
];

const mockCreditCards: CreditCardInfo[] = [
    { id: 'card1', name: 'Nubank PJ Final 5678', issuer: 'Nubank' },
    { id: 'card2', name: 'Bradesco Empresarial Final 1234', issuer: 'Bradesco' },
];

const initialMockExpenses: ExpenseTransaction[] = [
  { id: 'exp1', status: ExpenseTransactionStatus.PAGA, dataEfetivacao: '2024-07-10', dataVencimento: '2024-07-10', dataLancamento: '2024-07-05', descricao: 'Compra de Leite Condensado (Lote #334)', categoriaId: 'expCat1', contaOrigemId: 'acc1', valor: 350.00, paymentMethod: PaymentMethod.BOLETO, fornecedor: 'Laticínios Boa Vista' },
  { id: 'exp2', status: ExpenseTransactionStatus.PENDENTE, dataVencimento: '2024-08-05', dataLancamento: '2024-07-15', descricao: 'Aluguel Loja Matriz - Agosto/24', categoriaId: 'expCat2', contaOrigemId: 'acc1', valor: 1200.00, paymentMethod: PaymentMethod.TRANSFERENCIA },
  { id: 'exp3', status: ExpenseTransactionStatus.VENCIDA, dataVencimento: '2024-07-01', dataLancamento: '2024-06-20', descricao: 'Energia Elétrica - Junho/24', categoriaId: 'expCat2', contaOrigemId: 'acc1', valor: 280.50, paymentMethod: PaymentMethod.DEBITO_AUTOMATICO },
  { id: 'exp4', status: ExpenseTransactionStatus.PAGA, dataEfetivacao: '2024-07-22', dataVencimento: '2024-07-22', dataLancamento: '2024-07-20', descricao: 'Anúncios Google Ads - Julho', categoriaId: 'expCat3', contaOrigemId: 'acc3', valor: 150.00, paymentMethod: PaymentMethod.CARTAO_CREDITO_CORPORATIVO, cardUsedId: 'card1' },
  { id: 'exp5', status: ExpenseTransactionStatus.CANCELADA, dataVencimento: '2024-07-15', dataLancamento: '2024-07-01', descricao: 'Manutenção Preventiva Equipamento (Cancelado)', categoriaId: 'expCat2', contaOrigemId: 'acc1', valor: 400.00 },
];

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
};

const ITEMS_PER_PAGE = 10;

const DespesasContent: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseTransaction[]>(initialMockExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseTransaction | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCard, setSelectedCard] = useState('all'); // For "Cartão Utilizado" filter

  const [currentPage, setCurrentPage] = useState(1);

  const activeFinancialAccounts = useMemo(() => 
    mockFinancialAccounts.filter(acc => acc.status === AccountStatus.ATIVA)
  , [mockFinancialAccounts]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const descriptionMatch = exp.descricao.toLowerCase().includes(lowerSearchTerm) || (exp.fornecedor && exp.fornecedor.toLowerCase().includes(lowerSearchTerm));
      
      const dateMatch = (() => {
        if (!dateRangeStart && !dateRangeEnd) return true;
        const effectiveDate = exp.dataEfetivacao ? new Date(exp.dataEfetivacao) : null;
        const launchDate = new Date(exp.dataLancamento);
        
        const start = dateRangeStart ? new Date(dateRangeStart) : null;
        const end = dateRangeEnd ? new Date(dateRangeEnd) : null;

        if(start && end) return (effectiveDate && effectiveDate >= start && effectiveDate <= end) || (launchDate >= start && launchDate <= end);
        if(start) return (effectiveDate && effectiveDate >= start) || (launchDate >= start);
        if(end) return (effectiveDate && effectiveDate <= end) || (launchDate <= end);
        return true;
      })();

      const categoryMatch = selectedCategory === 'all' || exp.categoriaId === selectedCategory;
      const accountMatch = selectedAccount === 'all' || exp.contaOrigemId === selectedAccount;
      const statusMatch = selectedStatus === 'all' || exp.status === selectedStatus;
      const cardMatch = selectedCard === 'all' || exp.cardUsedId === selectedCard;

      return descriptionMatch && dateMatch && categoryMatch && accountMatch && statusMatch && cardMatch;
    });
  }, [expenses, searchTerm, dateRangeStart, dateRangeEnd, selectedCategory, selectedAccount, selectedStatus, selectedCard]);

  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredExpenses, currentPage]);

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);

  const handleOpenModal = (expense?: ExpenseTransaction) => {
    setEditingExpense(expense || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleSaveExpense = (expense: ExpenseTransaction) => {
    setExpenses(prev => {
      const existing = prev.find(r => r.id === expense.id);
      if (existing) {
        return prev.map(r => r.id === expense.id ? expense : r);
      }
      return [expense, ...prev];
    });
  };

  const handleToggleStatus = (expenseId: string) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === expenseId) {
        const newStatus = exp.status === ExpenseTransactionStatus.PENDENTE || exp.status === ExpenseTransactionStatus.VENCIDA
          ? ExpenseTransactionStatus.PAGA 
          : ExpenseTransactionStatus.PENDENTE; // Revert to PENDENTE if already PAGA
        return { 
            ...exp, 
            status: newStatus,
            dataEfetivacao: newStatus === ExpenseTransactionStatus.PAGA && !exp.dataEfetivacao ? new Date().toISOString().split('T')[0] : exp.dataEfetivacao
        };
      }
      return exp;
    }));
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita.')) {
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
    }
  };

  const handleDuplicateExpense = (expense: ExpenseTransaction) => {
    const newExpense: ExpenseTransaction = {
      ...expense,
      id: `exp-dup-${Date.now()}`,
      status: ExpenseTransactionStatus.PENDENTE,
      dataLancamento: new Date().toISOString().split('T')[0],
      dataEfetivacao: undefined,
    };
    handleOpenModal(newExpense);
  };
  
  const handleApplyFilters = () => {
    setCurrentPage(1);
    console.log("Filters applied. Search:", searchTerm, "Dates:", dateRangeStart, "-", dateRangeEnd, "Category:", selectedCategory, "Account:", selectedAccount, "Status:", selectedStatus, "Card:", selectedCard);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateRangeStart('');
    setDateRangeEnd('');
    setSelectedCategory('all');
    setSelectedAccount('all');
    setSelectedStatus('all');
    setSelectedCard('all');
    setCurrentPage(1);
  };

  const totalPagas = useMemo(() => 
    filteredExpenses
      .filter(r => r.status === ExpenseTransactionStatus.PAGA)
      .reduce((sum, r) => sum + r.valor, 0)
  , [filteredExpenses]);

  const totalPendentes = useMemo(() => 
    filteredExpenses
      .filter(r => r.status === ExpenseTransactionStatus.PENDENTE || r.status === ExpenseTransactionStatus.VENCIDA)
      .reduce((sum, r) => sum + r.valor, 0)
  , [filteredExpenses]);
  
  const getStatusDisplay = (status: ExpenseTransactionStatus) => {
    switch (status) {
      case ExpenseTransactionStatus.PAGA:
        return <CheckCircleSolidIcon className="w-5 h-5 text-green-500" aria-label="Paga" />;
      case ExpenseTransactionStatus.PENDENTE:
        return <ClockIcon className="w-5 h-5 text-yellow-500" aria-label="Pendente" />;
      case ExpenseTransactionStatus.CANCELADA:
        return <XCircleIcon className="w-5 h-5 text-red-500" aria-label="Cancelada" />;
      case ExpenseTransactionStatus.VENCIDA:
        return <AlertTriangleIcon className="w-5 h-5 text-orange-500" aria-label="Vencida" />;
      default:
        return <span className="text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-sorvetao-text-primary mb-3 sm:mb-0">Lançamentos de Despesa</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition flex items-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova Despesa</span>
        </button>
      </div>

      {/* Filtering and Search Section */}
      <div className="p-5 bg-sorvetao-gray-light rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <label htmlFor="searchDescricaoExp" className="sr-only">Buscar por Descrição</label>
            <div className="relative">
              <input
                type="text"
                id="searchDescricaoExp"
                placeholder="Buscar por Descrição ou Fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 pl-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="filterDateRangeStartExp" className="sr-only">Data Início</label>
            <div className="relative">
              <input type="date" id="filterDateRangeStartExp" value={dateRangeStart} onChange={e => setDateRangeStart(e.target.value)} className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"/>
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label htmlFor="filterDateRangeEndExp" className="sr-only">Data Fim</label>
             <div className="relative">
                <input type="date" id="filterDateRangeEndExp" value={dateRangeEnd} onChange={e => setDateRangeEnd(e.target.value)} className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"/>
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div>
            <label htmlFor="filterCategoryExp" className="sr-only">Categoria</label>
            <div className="relative">
                <select id="filterCategoryExp" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todas as Categorias</option>
                {mockExpenseCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="filterAccountExp" className="sr-only">Conta de Origem</label>
            <div className="relative">
                <select id="filterAccountExp" value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todas as Contas de Origem</option>
                {activeFinancialAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.nomeConta}</option>)}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
           <div>
            <label htmlFor="filterCardExp" className="sr-only">Cartão Utilizado</label>
            <div className="relative">
                <select id="filterCardExp" value={selectedCard} onChange={e => setSelectedCard(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todos os Cartões</option>
                {mockCreditCards.map(card => <option key={card.id} value={card.id}>{card.name}</option>)}
                </select>
                <CardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="filterStatusExp" className="sr-only">Status</label>
            <div className="relative">
                <select id="filterStatusExp" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todos os Status</option>
                {Object.values(ExpenseTransactionStatus).map((status: string) => <option key={status} value={status}>{status}</option>)}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button onClick={handleClearFilters} className="text-sm text-sorvetao-text-secondary hover:text-sorvetao-primary px-4 py-2 rounded-lg hover:bg-sorvetao-gray-medium transition flex items-center space-x-1.5">
            <ArrowPathIcon className="w-4 h-4" />
            <span>Limpar Filtros</span>
          </button>
          <button onClick={handleApplyFilters} className="bg-sorvetao-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition text-sm font-medium flex items-center space-x-1.5">
            <FunnelIcon className="w-4 h-4" />
            <span>Aplicar Filtros</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white p-1 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-sorvetao-gray-light">
          <thead className="bg-sorvetao-pink-light">
            <tr>
              <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Data Efet.</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Data Venc.</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Descrição</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Categoria</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Conta Origem</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Cartão</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Valor</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sorvetao-gray-light">
            {paginatedExpenses.map((expense) => {
              const categoryName = mockExpenseCategories.find(c => c.id === expense.categoriaId)?.name || 'N/A';
              const accountName = mockFinancialAccounts.find(a => a.id === expense.contaOrigemId)?.nomeConta || 'N/A';
              const cardName = expense.cardUsedId ? mockCreditCards.find(c => c.id === expense.cardUsedId)?.name : 'N/A';
              return (
                <tr key={expense.id} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{getStatusDisplay(expense.status)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(expense.dataEfetivacao)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(expense.dataVencimento)}</td>
                  <td className="px-4 py-3 text-sm text-sorvetao-text-primary max-w-xs truncate" title={expense.descricao}>
                    {expense.descricao}
                    {expense.fornecedor && <span className="block text-xs text-gray-400">Fornecedor: {expense.fornecedor}</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{categoryName}{expense.subCategoria && ` (${expense.subCategoria})`}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{accountName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{cardName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-semibold text-right">{formatCurrency(expense.valor)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button onClick={() => handleOpenModal(expense)} title="Editar" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"><PencilIcon className="w-4 h-4" /></button>
                      {(expense.status === ExpenseTransactionStatus.PENDENTE || expense.status === ExpenseTransactionStatus.VENCIDA) && (
                        <button onClick={() => handleToggleStatus(expense.id)} title="Marcar como Paga" className="p-1.5 text-green-500 hover:bg-green-100 rounded-full transition-colors">
                          <CheckCircleSolidIcon className="w-4 h-4" />
                        </button>
                      )}
                      {expense.status === ExpenseTransactionStatus.PAGA && (
                         <button onClick={() => handleToggleStatus(expense.id)} title="Marcar como Pendente" className="p-1.5 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors">
                            <ClockIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => handleDuplicateExpense(expense)} title="Duplicar" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"><DuplicateIcon className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteExpense(expense.id)} title="Excluir" className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"><TrashIcon className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paginatedExpenses.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-10 text-center text-sm text-sorvetao-text-secondary">
                  Nenhuma despesa encontrada com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-sorvetao-text-secondary">
            Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredExpenses.length)}</span> de <span className="font-medium">{filteredExpenses.length}</span> resultados
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

      <div className="mt-8 pt-4 border-t border-sorvetao-gray-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-xl shadow">
            <p className="text-sm text-red-700">Total de Despesas Pagas (Período Filtrado):</p>
            <p className="text-xl font-bold text-red-800">{formatCurrency(totalPagas)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow">
            <p className="text-sm text-yellow-700">Total de Despesas Pendentes/Vencidas (Período Filtrado):</p>
            <p className="text-xl font-bold text-yellow-800">{formatCurrency(totalPendentes)}</p>
          </div>
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveExpense}
        existingExpense={editingExpense}
        expenseCategories={mockExpenseCategories}
        financialAccounts={activeFinancialAccounts}
        creditCards={mockCreditCards}
      />
    </div>
  );
};

export default DespesasContent;