import React, { useState, useMemo } from 'react';
import { 
  TransferTransaction, 
  FinancialAccount,
  AccountStatus, 
  AccountType 
} from '../../../types';
import { 
  PlusIcon, 
  SearchIcon, 
  CalendarIcon, 
  ChevronDownIcon, 
  ArrowPathIcon, 
  PencilIcon, 
  TrashIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../../components/icons';
import AddTransferModal from '../../../components/modals/AddTransferModal';

// Mock Data (replace with actual data fetching)
const mockFinancialAccounts: FinancialAccount[] = [
    { id: 'acc1', nomeConta: 'Conta Corrente Bradesco', tipoConta: AccountType.CONTA_CORRENTE, saldoInicial: 10000, totalEntradasMesAtual: 15000, totalSaidasMesAtual: 7000, saldoAtual: 18000, status: AccountStatus.ATIVA },
    { id: 'acc2', nomeConta: 'Caixa Interno Matriz', tipoConta: AccountType.CAIXA, saldoInicial: 1500, totalEntradasMesAtual: 800, totalSaidasMesAtual: 300, saldoAtual: 2000, status: AccountStatus.ATIVA },
    { id: 'acc3', nomeConta: 'Conta Investimento XP', tipoConta: AccountType.INVESTIMENTO, saldoInicial: 50000, totalEntradasMesAtual: 1000, totalSaidasMesAtual: 0, saldoAtual: 51000, status: AccountStatus.ATIVA },
    { id: 'acc4', nomeConta: 'Conta Poupança Itaú (Inativa)', tipoConta: AccountType.INVESTIMENTO, saldoInicial: 5000, totalEntradasMesAtual: 0, totalSaidasMesAtual: 0, saldoAtual: 5000, status: AccountStatus.INATIVA },
];

const initialMockTransfers: TransferTransaction[] = [
  { id: 'tfr1', transferDate: '2024-07-20', description: 'Capital de Giro para Caixa', sourceAccountId: 'acc1', destinationAccountId: 'acc2', amount: 5000 },
  { id: 'tfr2', transferDate: '2024-07-22', description: 'Aplicação em Investimento', sourceAccountId: 'acc1', destinationAccountId: 'acc3', amount: 10000 },
  { id: 'tfr3', transferDate: '2024-07-25', description: 'Resgate Parcial Investimento', sourceAccountId: 'acc3', destinationAccountId: 'acc1', amount: 2000 },
  { id: 'tfr4', transferDate: '2024-06-15', description: 'Transferência Interna', sourceAccountId: 'acc2', destinationAccountId: 'acc1', amount: 500 },
];

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
};

const ITEMS_PER_PAGE = 10;

const TransferenciasContent: React.FC = () => {
  const [transfers, setTransfers] = useState<TransferTransaction[]>(initialMockTransfers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<TransferTransaction | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [selectedSourceAccount, setSelectedSourceAccount] = useState('all');
  const [selectedDestinationAccount, setSelectedDestinationAccount] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const activeFinancialAccounts = useMemo(() => 
    mockFinancialAccounts.filter(acc => acc.status === AccountStatus.ATIVA)
  , []); // Removed mockFinancialAccounts from dependencies as it's constant here

  const filteredTransfers = useMemo(() => {
    return transfers.filter(tfr => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const descriptionMatch = tfr.description.toLowerCase().includes(lowerSearchTerm);
      
      const dateMatch = (() => {
        if (!dateRangeStart && !dateRangeEnd) return true;
        const transferDate = new Date(tfr.transferDate);
        const start = dateRangeStart ? new Date(dateRangeStart) : null;
        const end = dateRangeEnd ? new Date(dateRangeEnd) : null;

        if(start && end) return transferDate >= start && transferDate <= end;
        if(start) return transferDate >= start;
        if(end) return transferDate <= end;
        return true;
      })();

      const sourceAccountMatch = selectedSourceAccount === 'all' || tfr.sourceAccountId === selectedSourceAccount;
      const destinationAccountMatch = selectedDestinationAccount === 'all' || tfr.destinationAccountId === selectedDestinationAccount;

      return descriptionMatch && dateMatch && sourceAccountMatch && destinationAccountMatch;
    });
  }, [transfers, searchTerm, dateRangeStart, dateRangeEnd, selectedSourceAccount, selectedDestinationAccount]);

  const paginatedTransfers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransfers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransfers, currentPage]);

  const totalPages = Math.ceil(filteredTransfers.length / ITEMS_PER_PAGE);

  const handleOpenModal = (transfer?: TransferTransaction) => {
    setEditingTransfer(transfer || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransfer(null);
  };

  const handleSaveTransfer = (transfer: TransferTransaction) => {
    setTransfers(prev => {
      const existing = prev.find(t => t.id === transfer.id);
      if (existing) {
        return prev.map(t => t.id === transfer.id ? transfer : t);
      }
      // Simulate backend logic: update account balances (this is simplified)
      const sourceAccount = mockFinancialAccounts.find(acc => acc.id === transfer.sourceAccountId);
      const destAccount = mockFinancialAccounts.find(acc => acc.id === transfer.destinationAccountId);
      if(sourceAccount) sourceAccount.saldoAtual -= transfer.amount;
      if(destAccount) destAccount.saldoAtual += transfer.amount;

      return [transfer, ...prev]; // Add new transfer to the beginning
    });
  };

  const handleDeleteTransfer = (transferId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transferência? Esta ação não pode ser desfeita (saldos não serão revertidos automaticamente nesta simulação).')) {
      // In a real app, consider implications on account balances or implement reversing transaction
      setTransfers(prev => prev.filter(tfr => tfr.id !== transferId));
    }
  };
  
  const handleApplyFilters = () => {
    setCurrentPage(1);
    console.log("Filters applied for transfers. Search:", searchTerm, "Dates:", dateRangeStart, "-", dateRangeEnd, "Source:", selectedSourceAccount, "Destination:", selectedDestinationAccount);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateRangeStart('');
    setDateRangeEnd('');
    setSelectedSourceAccount('all');
    setSelectedDestinationAccount('all');
    setCurrentPage(1);
  };
  
  const getAccountNameById = (accountId: string) => {
    return mockFinancialAccounts.find(acc => acc.id === accountId)?.nomeConta || 'Conta Desconhecida';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-sorvetao-text-primary mb-3 sm:mb-0">Transferências Entre Contas</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition flex items-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova Transferência</span>
        </button>
      </div>

      {/* Filtering and Search Section */}
      <div className="p-5 bg-sorvetao-gray-light rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <label htmlFor="searchDescricaoTfr" className="sr-only">Buscar por Descrição</label>
            <div className="relative">
              <input
                type="text"
                id="searchDescricaoTfr"
                placeholder="Buscar por Descrição/Referência..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 pl-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="filterDateRangeStartTfr" className="sr-only">Data Início</label>
            <div className="relative">
              <input type="date" id="filterDateRangeStartTfr" value={dateRangeStart} onChange={e => setDateRangeStart(e.target.value)} className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"/>
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label htmlFor="filterDateRangeEndTfr" className="sr-only">Data Fim</label>
             <div className="relative">
                <input type="date" id="filterDateRangeEndTfr" value={dateRangeEnd} onChange={e => setDateRangeEnd(e.target.value)} className="w-full p-2.5 pr-10 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"/>
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
            <label htmlFor="filterSourceAccountTfr" className="sr-only">Conta de Origem</label>
            <div className="relative">
                <select id="filterSourceAccountTfr" value={selectedSourceAccount} onChange={e => setSelectedSourceAccount(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todas as Contas de Origem</option>
                {activeFinancialAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.nomeConta}</option>)}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="filterDestinationAccountTfr" className="sr-only">Conta de Destino</label>
            <div className="relative">
                <select id="filterDestinationAccountTfr" value={selectedDestinationAccount} onChange={e => setSelectedDestinationAccount(e.target.value)} className="w-full p-2.5 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm">
                <option value="all">Todas as Contas de Destino</option>
                {activeFinancialAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.nomeConta}</option>)}
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
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Data da Transferência</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Descrição/Referência</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Conta de Origem</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider whitespace-nowrap">Conta de Destino</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Valor Transferido</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sorvetao-gray-light">
            {paginatedTransfers.map((tfr) => (
                <tr key={tfr.id} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{formatDate(tfr.transferDate)}</td>
                  <td className="px-4 py-3 text-sm text-sorvetao-text-primary max-w-xs truncate" title={tfr.description}>{tfr.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{getAccountNameById(tfr.sourceAccountId)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-secondary">{getAccountNameById(tfr.destinationAccountId)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-sorvetao-text-primary font-semibold text-right">{formatCurrency(tfr.amount)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button onClick={() => handleOpenModal(tfr)} title="Editar Transferência" className="p-1.5 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"><PencilIcon className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteTransfer(tfr.id)} title="Excluir Transferência" className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"><TrashIcon className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            {paginatedTransfers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-sorvetao-text-secondary">
                  Nenhuma transferência encontrada com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-sorvetao-text-secondary">
            Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTransfers.length)}</span> de <span className="font-medium">{filteredTransfers.length}</span> resultados
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

      <AddTransferModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTransfer}
        existingTransfer={editingTransfer}
        financialAccounts={activeFinancialAccounts}
      />
    </div>
  );
};

export default TransferenciasContent;