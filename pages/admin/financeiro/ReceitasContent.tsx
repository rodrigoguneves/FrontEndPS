

import React, { useState, useMemo, useEffect } from 'react';
import { 
  RevenueTransaction, 
  RevenueTransactionStatus, 
  RevenueCategory, 
  FinancialAccount,
  AccountStatus, // Assuming AccountStatus.ATIVA is needed for filtering accounts
  AccountType // Assuming AccountType is available for display or consistency
} from '../../../types'; // Corrected path
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
  DuplicateIcon, // Changed from LinkIcon for clarity
  FunnelIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../../components/icons'; // Corrected path for icons
import AddRevenueModal from '../../../components/modals/AddRevenueModal'; // Corrected import path

// Mock Data (replace with actual data fetching)
const mockRevenueCategories: RevenueCategory[] = [
  { id: 'cat1', name: 'Venda de Produtos' },
  { id: 'cat2', name: 'Serviços Prestados' },
  { id: 'cat3', name: 'Rendimentos Aplicações' },
  { id: 'cat4', name: 'Outras Receitas' },
];

const mockFinancialAccounts: FinancialAccount[] = [
    { id: 'acc1', nomeConta: 'Conta Corrente Bradesco', tipoConta: AccountType.CONTA_CORRENTE, saldoInicial: 10000, totalEntradasMesAtual: 5000, totalSaidasMesAtual: 2000, saldoAtual: 13000, status: AccountStatus.ATIVA },
    { id: 'acc2', nomeConta: 'Caixa Interno', tipoConta: AccountType.CAIXA, saldoInicial: 1500, totalEntradasMesAtual: 800, totalSaidasMesAtual: 300, saldoAtual: 2000, status: AccountStatus.ATIVA },
];


const initialMockRevenues: RevenueTransaction[] = [
  { id: 'rev1', status: RevenueTransactionStatus.EFETIVADA, dataEfetivacao: '2024-07-15', dataVencimento: '2024-07-15', dataLancamento: '2024-07-10', descricao: 'Receita Pedido #100234 - Cliente A', categoriaId: 'cat1', contaDestinoId: 'acc1', valor: 245.00, linkedOrderId: '#100234' },
  { id: 'rev2', status: RevenueTransactionStatus.PENDENTE, dataVencimento: '2024-08-01', dataLancamento: '2024-07-12', descricao: 'Adiantamento Serviço XYZ - Cliente B', categoriaId: 'cat2', contaDestinoId: 'acc1', valor: 1500.00 },
  { id: 'rev3', status: RevenueTransactionStatus.EFETIVADA, dataEfetivacao: '2024-07-20', dataVencimento: '2024-07-20', dataLancamento: '2024-07-18', descricao: 'Venda Picolés - Evento Local', categoriaId: 'cat1', contaDestinoId: 'acc2', valor: 88.50 },
  { id: 'rev4', status: RevenueTransactionStatus.PENDENTE, dataVencimento: '2024-08-10', dataLancamento: '2024-07-25', descricao: 'Receita Pedido #100250 - Cliente C', categoriaId: 'cat1', contaDestinoId: 'acc1', valor: 320.75, linkedOrderId: '#100250' },
  { id: 'rev5', status: RevenueTransactionStatus.CANCELADA, dataVencimento: '2024-07-01', dataLancamento: '2024-06-20', descricao: 'Consultoria (cancelada)', categoriaId: 'cat2', contaDestinoId: 'acc1', valor: 500.00 },
];

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
};

const ITEMS_PER_PAGE = 10;


const ReceitasContent: React.FC = () => {
  const [revenues, setRevenues] = useState<RevenueTransaction[]>(initialMockRevenues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRevenue, setEditingRevenue] = useState<RevenueTransaction | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const activeFinancialAccounts = useMemo(() => 
    mockFinancialAccounts.filter(acc => acc.status === AccountStatus.ATIVA)
  , [mockFinancialAccounts]);


  const filteredRevenues = useMemo(() => {
    return revenues.filter(rev => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const descriptionMatch = rev.descricao.toLowerCase().includes(lowerSearchTerm);
      
      const dateMatch = (() => {
        if (!dateRangeStart && !dateRangeEnd) return true;
        const effectiveDate = rev.dataEfetivacao ? new Date(rev.dataEfetivacao) : null;
        const launchDate = new Date(rev.dataLancamento);
        
        const start = dateRangeStart ? new Date(dateRangeStart) : null;
        const end = dateRangeEnd ? new Date(dateRangeEnd) : null;

        if(start && end) { // if both dates are set, check range for effectiveDate or launchDate
            return (effectiveDate && effectiveDate >= start && effectiveDate <= end) || (launchDate >= start && launchDate <= end);
        }
        if(start) { // if only start date, check if effectiveDate or launchDate is on or after
            return (effectiveDate && effectiveDate >= start) || (launchDate >= start);
        }
        if(end) { // if only end date, check if effectiveDate or launchDate is on or before
             return (effectiveDate && effectiveDate <= end) || (launchDate <= end);
        }
        return true; // Should not happen if one is set, but default to true
      })();

      const categoryMatch = selectedCategory === 'all' || rev.categoriaId === selectedCategory;
      const accountMatch = selectedAccount === 'all' || rev.contaDestinoId === selectedAccount;
      const statusMatch = selectedStatus === 'all' || rev.status === selectedStatus;

      return descriptionMatch && dateMatch && categoryMatch && accountMatch && statusMatch;
    });
  }, [revenues, searchTerm, dateRangeStart, dateRangeEnd, selectedCategory, selectedAccount, selectedStatus]);

  const paginatedRevenues = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRevenues.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRevenues, currentPage]);

  const totalPages = Math.ceil(filteredRevenues.length / ITEMS_PER_PAGE);

  const handleOpenModal = (revenue?: RevenueTransaction) => {
    setEditingRevenue(revenue || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRevenue(null);
  };

  const handleSaveRevenue = (revenue: RevenueTransaction) => {
    setRevenues(prev => {
      const existing = prev.find(r => r.id === revenue.id);
      if (existing) {
        return prev.map(r => r.id === revenue.id ? revenue : r);
      }
      return [revenue, ...prev]; // Add new revenue to the beginning
    });
  };

  const handleToggleStatus = (revenueId: string) => {
    setRevenues(prev => prev.map(rev => {
      if (rev.id === revenueId) {
        const newStatus = rev.status === RevenueTransactionStatus.PENDENTE 
          ? RevenueTransactionStatus.EFETIVADA 
          : RevenueTransactionStatus.PENDENTE;
        return { 
            ...rev, 
            status: newStatus,
            dataEfetivacao: newStatus === RevenueTransactionStatus.EFETIVADA && !rev.dataEfetivacao ? new Date().toISOString().split('T')[0] : rev.dataEfetivacao
        };
      }
      return rev;
    }));
  };

  const handleDeleteRevenue = (revenueId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.')) {
      // In a real app, this would be a soft delete (e.g., mark as deleted)
      setRevenues(prev => prev.filter(rev => rev.id !== revenueId));
    }
  };

  const handleDuplicateRevenue = (revenue: RevenueTransaction) => {
    const newRevenue: RevenueTransaction = {
      ...revenue,
      id: `rev-dup-${Date.now()}`, // New ID
      status: RevenueTransactionStatus.PENDENTE, // Default to pending
      dataLancamento: new Date().toISOString().split('T')[0], // Set launch date to today
      dataEfetivacao: undefined, // Clear effective date for new entry
    };
    handleOpenModal(newRevenue);
  };
  
  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters change
    // The filtering is already reactive due to useMemo, this function is more for explicit action if needed
    console.log("Filters applied. Search:", searchTerm, "Dates:", dateRangeStart, "-", dateRangeEnd, "Category:", selectedCategory, "Account:", selectedAccount, "Status:", selectedStatus);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateRangeStart('');
    setDateRangeEnd('');
    setSelectedCategory('all');
    setSelectedAccount('all');
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  const totalEfetivadas = useMemo(() => 
    filteredRevenues
      .filter(r => r.status === RevenueTransactionStatus.EFETIVADA)
      .reduce((sum, r) => sum + r.valor, 0)
  , [filteredRevenues]);

  const totalPendentes = useMemo(() => 
    filteredRevenues
      .filter(r => r.status === RevenueTransactionStatus.PENDENTE)
      .reduce((sum, r) => sum + r.valor, 0)
  , [filteredRevenues]);
  
  const getStatusDisplay = (status: RevenueTransactionStatus) => {
    switch (status) {
      case RevenueTransactionStatus.EFETIVADA:
        // Fix: Remove unsupported 'title' prop
        return <CheckCircleSolidIcon className="w-5 h-5 text-green-500" />;
      case RevenueTransactionStatus.PENDENTE:
        // Fix: Remove unsupported 'title' prop
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case RevenueTransactionStatus.CANCELADA:
        // Fix: Remove unsupported 'title' prop
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <span className="text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-sorvetao-text-primary mb-3 sm:mb-0">Lançamentos de Receita</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition flex items-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova Receita</span>
        </button>
      </div>

      {/* Filtering and Search Section */}
      <div className="p-5 bg-sorvetao-gray-light rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <label htmlFor="searchDescricao" className="sr-only">Buscar por Descrição</label>
            <div className="relative">
              <input
                type="text"
                id="searchDescricao"
                placeholder="Buscar por Descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 pl-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="filterDateRangeStart" className="sr-only">Data Início</label>
            <div className="relative">
              <input type="date" id="filterDateRangeStart" value={dateRangeStart} onChange={e => setDateRangeStart(e.target.value)} className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"/>
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label htmlFor="filterDateRangeEnd" className="sr-only">Data Fim</label>
             <div className="relative">
                <input type="date" id="filterDateRangeEnd" value={dateRangeEnd} onChange={e => setDateRangeEnd(e.target.value)} className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"/>
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
            <label htmlFor="filterCategory" className="sr-only">Categoria</label>
            <div className="relative">
                <select id="filterCategory" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todas as Categorias</option>
                {mockRevenueCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="filterAccount" className="sr-only">Conta Destino</label>
            <div className="relative">
                <select id="filterAccount" value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todas as Contas</option>
                {activeFinancialAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.nomeConta}</option>)}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="filterStatus" className="sr-only">Status</label>
            <div className="relative">
                <select id="filterStatus" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todos os Status</option>
                {Object.values(RevenueTransactionStatus).map((status: string) => <option key={status} value={status}>{status}</option>)}
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
      
      {/* Revenues List/Table */}
      <div className="overflow-x-auto bg-white p-1 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-sorvetao-gray-light">
          <thead className="bg-sorvetao-pink-light">
            <tr>
              <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Data Efet.</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Data Venc.</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Descrição</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Categoria</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Conta Destino</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Valor</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sorvetao-gray-light">
            {paginatedRevenues.map((revenue) => {
              const categoryName = mockRevenueCategories.find(c => c.id === revenue.categoriaId)?.name || 'N/A';
              const accountName = mockFinancialAccounts.find(a => a.id === revenue.contaDestinoId)?.nomeConta || 'N/A';
              return (
                <tr key={revenue.id} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{getStatusDisplay(revenue.status)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(revenue.dataEfetivacao)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(revenue.dataVencimento)}</td>
                  <td className="px-4 py-3 text-sm text-sorvetao-text-primary max-w-xs truncate">
                    {revenue.linkedOrderId ? 
                      <a href={`#/admin/pedidos/${revenue.linkedOrderId}`} className="hover:underline" title={`Ver pedido ${revenue.linkedOrderId}`}>{revenue.descricao}</a> 
                      : revenue.descricao
                    }
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{categoryName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{accountName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-primary font-semibold text-right">{formatCurrency(revenue.valor)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button onClick={() => handleOpenModal(revenue)} title="Editar" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"><PencilIcon className="w-4 h-4" /></button>
                      {revenue.status !== RevenueTransactionStatus.CANCELADA && (
                        <button onClick={() => handleToggleStatus(revenue.id)} title={revenue.status === RevenueTransactionStatus.PENDENTE ? "Marcar Efetivada" : "Marcar Pendente"} 
                                className={`p-1.5 rounded-full transition-colors ${revenue.status === RevenueTransactionStatus.PENDENTE ? 'text-green-500 hover:bg-green-100' : 'text-yellow-600 hover:bg-yellow-100'}`}>
                          {revenue.status === RevenueTransactionStatus.PENDENTE ? <CheckCircleSolidIcon className="w-4 h-4" /> : <ClockIcon className="w-4 h-4" />}
                        </button>
                      )}
                      <button onClick={() => handleDuplicateRevenue(revenue)} title="Duplicar" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"><DuplicateIcon className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteRevenue(revenue.id)} title="Excluir" className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"><TrashIcon className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paginatedRevenues.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-sm text-sorvetao-text-secondary">
                  Nenhuma receita encontrada com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       {/* Pagination */}
       {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-sorvetao-text-secondary">
            Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredRevenues.length)}</span> de <span className="font-medium">{filteredRevenues.length}</span> resultados
          </p>
          <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-sorvetao-gray-medium bg-white text-sm font-medium text-sorvetao-text-secondary hover:bg-sorvetao-gray-light disabled:opacity-50 transition"
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
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </nav>
        </div>
      )}

      {/* Summary Totals */}
      <div className="mt-8 pt-4 border-t border-sorvetao-gray-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-xl shadow">
            <p className="text-sm text-green-700">Total de Receitas Efetivadas (Período Filtrado):</p>
            <p className="text-xl font-bold text-green-800">{formatCurrency(totalEfetivadas)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow">
            <p className="text-sm text-yellow-700">Total de Receitas Pendentes (Período Filtrado):</p>
            <p className="text-xl font-bold text-yellow-800">{formatCurrency(totalPendentes)}</p>
          </div>
        </div>
      </div>

      <AddRevenueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRevenue}
        existingRevenue={editingRevenue}
        revenueCategories={mockRevenueCategories}
        financialAccounts={activeFinancialAccounts}
      />
    </div>
  );
};

export default ReceitasContent;