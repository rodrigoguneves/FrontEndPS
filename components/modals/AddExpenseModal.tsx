import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { 
    ReceiptTextIcon, // Using same icon as revenue for general transaction
    SaveIcon, 
    ChevronDownIcon, 
    CalendarIcon 
} from '../icons';
import { 
    ExpenseTransaction, 
    ExpenseTransactionStatus, 
    ExpenseCategory, 
    FinancialAccount,
    PaymentMethod,
    CreditCardInfo
} from '../../types';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: ExpenseTransaction) => void;
  existingExpense?: ExpenseTransaction | null;
  expenseCategories: ExpenseCategory[];
  financialAccounts: FinancialAccount[];
  creditCards: CreditCardInfo[]; // For 'Cartão Utilizado' dropdown
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    existingExpense,
    expenseCategories,
    financialAccounts,
    creditCards
}) => {
  
  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  const initialFormState: ExpenseTransaction = {
    id: existingExpense?.id || `exp-${Date.now()}`,
    descricao: existingExpense?.descricao || '',
    categoriaId: existingExpense?.categoriaId || (expenseCategories.length > 0 ? expenseCategories[0].id : ''),
    subCategoria: existingExpense?.subCategoria || '',
    contaOrigemId: existingExpense?.contaOrigemId || (financialAccounts.length > 0 ? financialAccounts[0].id : ''),
    valor: existingExpense?.valor || 0,
    dataLancamento: existingExpense?.dataLancamento || getTodayDateString(),
    dataVencimento: existingExpense?.dataVencimento || getTodayDateString(),
    dataEfetivacao: existingExpense?.dataEfetivacao || undefined,
    status: existingExpense?.status || ExpenseTransactionStatus.PENDENTE,
    paymentMethod: existingExpense?.paymentMethod || undefined,
    cardUsedId: existingExpense?.cardUsedId || undefined,
    fornecedor: existingExpense?.fornecedor || '',
    observacoes: existingExpense?.observacoes || '',
    linkedInvoiceId: existingExpense?.linkedInvoiceId || undefined,
  };

  const [formData, setFormData] = useState<ExpenseTransaction>(initialFormState);

  useEffect(() => {
    if (isOpen) {
      setFormData(existingExpense ? 
        { ...initialFormState, ...existingExpense } 
        : 
        { ...initialFormState, id: `exp-${Date.now()}` }
      );
    }
  }, [isOpen, existingExpense, expenseCategories, financialAccounts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoriaId && expenseCategories.length > 0) {
      alert("Por favor, selecione uma categoria.");
      return;
    }
    if (!formData.contaOrigemId && financialAccounts.length > 0) {
        alert("Por favor, selecione uma conta de origem.");
        return;
    }
    
    const expenseToSave = { ...formData };
    if (expenseToSave.status === ExpenseTransactionStatus.PAGA && !expenseToSave.dataEfetivacao) {
        expenseToSave.dataEfetivacao = getTodayDateString();
    }
    if (expenseToSave.paymentMethod !== PaymentMethod.CARTAO_CREDITO_CORPORATIVO) {
        expenseToSave.cardUsedId = undefined; // Clear card if not CC payment
    }

    onSave(expenseToSave);
    onClose();
  };
  
  const title = existingExpense ? 'Editar Lançamento de Despesa' : 'Adicionar Nova Despesa';
  const subtitle = existingExpense ? 'Atualize os detalhes da transação de despesa.' : 'Preencha os dados para registrar uma nova despesa.';

  const footerContent = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-200 hover:bg-gray-300 text-sorvetao-text-secondary font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 text-sm"
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="add-expense-form"
        className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2 text-sm"
      >
        <SaveIcon className="w-5 h-5" />
        <span>{existingExpense ? 'Salvar Alterações' : 'Salvar Despesa'}</span>
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleIcon={<ReceiptTextIcon className="w-6 h-6 text-sorvetao-primary" />}
      title={title}
      subtitle={subtitle}
      footerContent={footerContent}
      maxWidth="max-w-2xl" 
    >
      <form id="add-expense-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Descrição<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Ex: Compra de matéria-prima, Aluguel do Mês"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="categoriaId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Categoria<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="categoriaId"
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        <option value="" disabled>Selecione uma categoria</option>
                        {expenseCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
            <div>
                <label htmlFor="subCategoria" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Subcategoria (Opcional)
                </label>
                <input
                    type="text"
                    id="subCategoria"
                    name="subCategoria"
                    value={formData.subCategoria || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                    placeholder="Ex: Embalagens, Energia Elétrica"
                />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="contaOrigemId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Conta de Origem<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="contaOrigemId"
                        name="contaOrigemId"
                        value={formData.contaOrigemId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        <option value="" disabled>Selecione uma conta</option>
                        {financialAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.nomeConta}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
            <div>
                <label htmlFor="valor" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Valor<span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="valor"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                    placeholder="0.00"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="dataLancamento" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Data de Lançamento<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input type="date" id="dataLancamento" name="dataLancamento" value={formData.dataLancamento} onChange={handleChange} required className="w-full p-3 pr-10 border border-sorvetao-gray-medium rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sorvetao-primary transition-shadow"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none"/>
                </div>
            </div>
            <div>
                <label htmlFor="dataVencimento" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Data de Vencimento<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input type="date" id="dataVencimento" name="dataVencimento" value={formData.dataVencimento} onChange={handleChange} required className="w-full p-3 pr-10 border border-sorvetao-gray-medium rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sorvetao-primary transition-shadow"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none"/>
                </div>
            </div>
            <div>
                <label htmlFor="dataEfetivacao" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Data de Efetivação/Pagamento
                </label>
                 <div className="relative">
                    <input type="date" id="dataEfetivacao" name="dataEfetivacao" value={formData.dataEfetivacao || ''} onChange={handleChange} className="w-full p-3 pr-10 border border-sorvetao-gray-medium rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sorvetao-primary transition-shadow"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none"/>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Status<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        {Object.values(ExpenseTransactionStatus).map(statusVal => (
                            <option key={statusVal} value={statusVal}>{statusVal}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
             <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Método de Pagamento (Opcional)
                </label>
                <div className="relative">
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod || ''}
                        onChange={handleChange}
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        <option value="">Selecione um método</option>
                        {Object.values(PaymentMethod).map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
        </div>

        {formData.paymentMethod === PaymentMethod.CARTAO_CREDITO_CORPORATIVO && (
            <div>
                <label htmlFor="cardUsedId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Cartão Utilizado<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="cardUsedId"
                        name="cardUsedId"
                        value={formData.cardUsedId || ''}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        <option value="">Selecione um cartão</option>
                        {creditCards.map(card => (
                            <option key={card.id} value={card.id}>{card.name}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
        )}

        <div>
          <label htmlFor="fornecedor" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Fornecedor (Opcional)
          </label>
          <input
            type="text"
            id="fornecedor"
            name="fornecedor"
            value={formData.fornecedor || ''}
            onChange={handleChange}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Nome do fornecedor ou prestador de serviço"
          />
        </div>

        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Observações (Opcional)
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows={3}
            value={formData.observacoes || ''}
            onChange={handleChange}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Detalhes adicionais sobre a despesa..."
          />
        </div>

      </form>
    </Modal>
  );
};

export default AddExpenseModal;