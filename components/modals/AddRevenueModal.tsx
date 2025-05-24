import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { ReceiptTextIcon, SaveIcon, ChevronDownIcon, CalendarIcon } from '../icons';
import { RevenueTransaction, RevenueTransactionStatus, RevenueCategory, FinancialAccount } from '../../types';

interface AddRevenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (revenue: RevenueTransaction) => void;
  existingRevenue?: RevenueTransaction | null;
  revenueCategories: RevenueCategory[];
  financialAccounts: FinancialAccount[];
}

const AddRevenueModal: React.FC<AddRevenueModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    existingRevenue,
    revenueCategories,
    financialAccounts 
}) => {
  
  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  const initialFormState: RevenueTransaction = {
    id: existingRevenue?.id || `rev-${Date.now()}`,
    descricao: existingRevenue?.descricao || '',
    categoriaId: existingRevenue?.categoriaId || (revenueCategories.length > 0 ? revenueCategories[0].id : ''),
    contaDestinoId: existingRevenue?.contaDestinoId || (financialAccounts.length > 0 ? financialAccounts[0].id : ''),
    valor: existingRevenue?.valor || 0,
    dataLancamento: existingRevenue?.dataLancamento || getTodayDateString(),
    dataEfetivacao: existingRevenue?.dataEfetivacao || undefined,
    dataVencimento: existingRevenue?.dataVencimento || getTodayDateString(),
    status: existingRevenue?.status || RevenueTransactionStatus.PENDENTE,
    observacoes: existingRevenue?.observacoes || '',
    linkedOrderId: existingRevenue?.linkedOrderId || undefined,
  };

  const [formData, setFormData] = useState<RevenueTransaction>(initialFormState);

  useEffect(() => {
    if (isOpen) {
      setFormData(existingRevenue ? 
        { ...initialFormState, ...existingRevenue } 
        : 
        { ...initialFormState, id: `rev-${Date.now()}` }
      );
    }
  }, [isOpen, existingRevenue, revenueCategories, financialAccounts]); // Add dependencies

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoriaId && revenueCategories.length > 0) {
      alert("Por favor, selecione uma categoria.");
      return;
    }
    if (!formData.contaDestinoId && financialAccounts.length > 0) {
        alert("Por favor, selecione uma conta de destino.");
        return;
    }
    // If status is Efetivada and dataEfetivacao is not set, set it to today
    const revenueToSave = { ...formData };
    if (revenueToSave.status === RevenueTransactionStatus.EFETIVADA && !revenueToSave.dataEfetivacao) {
        revenueToSave.dataEfetivacao = getTodayDateString();
    }

    onSave(revenueToSave);
    onClose();
  };
  
  const title = existingRevenue ? 'Editar Lançamento de Receita' : 'Adicionar Nova Receita';
  const subtitle = existingRevenue ? 'Atualize os detalhes da transação.' : 'Preencha os dados para registrar uma nova receita.';

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
        form="add-revenue-form"
        className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2 text-sm"
      >
        <SaveIcon className="w-5 h-5" />
        <span>{existingRevenue ? 'Salvar Alterações' : 'Salvar Receita'}</span>
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
      maxWidth="max-w-2xl" // Slightly wider for more fields
    >
      <form id="add-revenue-form" onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Ex: Recebimento Pedido #123, Venda de sorvetes..."
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
                        {revenueCategories.map(cat => (
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
                    placeholder="Ex: Picolés, Copos"
                />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="contaDestinoId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Conta de Destino<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="contaDestinoId"
                        name="contaDestinoId"
                        value={formData.contaDestinoId}
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
                    Data de Vencimento
                </label>
                <div className="relative">
                    <input type="date" id="dataVencimento" name="dataVencimento" value={formData.dataVencimento} onChange={handleChange} className="w-full p-3 pr-10 border border-sorvetao-gray-medium rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sorvetao-primary transition-shadow"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none"/>
                </div>
            </div>
            <div>
                <label htmlFor="dataEfetivacao" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Data de Efetivação
                </label>
                 <div className="relative">
                    <input type="date" id="dataEfetivacao" name="dataEfetivacao" value={formData.dataEfetivacao || ''} onChange={handleChange} className="w-full p-3 pr-10 border border-sorvetao-gray-medium rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sorvetao-primary transition-shadow"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none"/>
                </div>
            </div>
        </div>
        
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
                    {Object.values(RevenueTransactionStatus).map(statusVal => (
                        <option key={statusVal} value={statusVal}>{statusVal}</option>
                    ))}
                </select>
                <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
            </div>
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
            placeholder="Detalhes adicionais sobre a receita..."
          />
        </div>

      </form>
    </Modal>
  );
};

export default AddRevenueModal;
