import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { LinkIcon, SaveIcon, ChevronDownIcon, CalendarIcon } from '../icons';
import { TransferTransaction, FinancialAccount } from '../../types';

interface AddTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transfer: TransferTransaction) => void;
  existingTransfer?: TransferTransaction | null;
  financialAccounts: FinancialAccount[];
}

const AddTransferModal: React.FC<AddTransferModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    existingTransfer,
    financialAccounts 
}) => {
  
  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  const initialFormState: TransferTransaction = {
    id: existingTransfer?.id || `tfr-${Date.now()}`,
    description: existingTransfer?.description || '',
    sourceAccountId: existingTransfer?.sourceAccountId || (financialAccounts.length > 0 ? financialAccounts[0].id : ''),
    destinationAccountId: existingTransfer?.destinationAccountId || (financialAccounts.length > 1 ? financialAccounts[1].id : ''),
    amount: existingTransfer?.amount || 0,
    transferDate: existingTransfer?.transferDate || getTodayDateString(),
  };

  const [formData, setFormData] = useState<TransferTransaction>(initialFormState);
  const [destinationAccountOptions, setDestinationAccountOptions] = useState<FinancialAccount[]>(financialAccounts);

  useEffect(() => {
    if (isOpen) {
      const defaultSourceId = financialAccounts.length > 0 ? financialAccounts[0].id : '';
      const defaultDestinationId = financialAccounts.length > 1 && financialAccounts[1].id !== defaultSourceId ? financialAccounts[1].id : (financialAccounts.length > 0 && financialAccounts[0].id !== defaultSourceId ? financialAccounts[0].id : '');

      const newFormState = existingTransfer ? 
        { ...initialFormState, ...existingTransfer } 
        : 
        { ...initialFormState, id: `tfr-${Date.now()}`, sourceAccountId: defaultSourceId, destinationAccountId: defaultDestinationId };
      
      setFormData(newFormState);
      // Filter destination accounts based on the source account from formData
      setDestinationAccountOptions(financialAccounts.filter(acc => acc.id !== newFormState.sourceAccountId));
    }
  }, [isOpen, existingTransfer, financialAccounts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newSourceAccountId = formData.sourceAccountId;
    let newDestinationAccountId = formData.destinationAccountId;

    if (name === 'sourceAccountId') {
      newSourceAccountId = value;
      setDestinationAccountOptions(financialAccounts.filter(acc => acc.id !== newSourceAccountId));
      // If current destination is same as new source, reset destination
      if (newDestinationAccountId === newSourceAccountId) {
        const firstAvailableDestination = financialAccounts.find(acc => acc.id !== newSourceAccountId);
        newDestinationAccountId = firstAvailableDestination ? firstAvailableDestination.id : '';
      }
    }
    if (name === 'destinationAccountId') {
      newDestinationAccountId = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
      sourceAccountId: newSourceAccountId, // ensure updated source is set
      destinationAccountId: newDestinationAccountId, // ensure updated destination is set
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sourceAccountId) {
      alert("Por favor, selecione uma conta de origem.");
      return;
    }
    if (!formData.destinationAccountId) {
      alert("Por favor, selecione uma conta de destino.");
      return;
    }
    if (formData.sourceAccountId === formData.destinationAccountId) {
      alert("A conta de origem e destino não podem ser a mesma.");
      return;
    }
    if (formData.amount <= 0) {
        alert("O valor da transferência deve ser maior que zero.");
        return;
    }
    onSave(formData);
    onClose();
  };
  
  const title = existingTransfer ? 'Editar Transferência Entre Contas' : 'Registrar Nova Transferência';
  const subtitle = existingTransfer ? 'Atualize os detalhes da transferência.' : 'Mova fundos entre suas contas financeiras.';

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
        form="add-transfer-form"
        className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2 text-sm"
      >
        <SaveIcon className="w-5 h-5" />
        <span>{existingTransfer ? 'Salvar Alterações' : 'Salvar Transferência'}</span>
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleIcon={<LinkIcon className="w-6 h-6 text-sorvetao-primary" />}
      title={title}
      subtitle={subtitle}
      footerContent={footerContent}
      maxWidth="max-w-xl"
    >
      <form id="add-transfer-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="sourceAccountId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Conta de Origem<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="sourceAccountId"
                        name="sourceAccountId"
                        value={formData.sourceAccountId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        <option value="" disabled>Selecione uma conta</option>
                        {financialAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.nomeConta} (Saldo: {acc.saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
            <div>
                <label htmlFor="destinationAccountId" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Conta de Destino<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="destinationAccountId"
                        name="destinationAccountId"
                        value={formData.destinationAccountId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                    >
                        <option value="" disabled>Selecione uma conta</option>
                        {destinationAccountOptions.map(acc => (
                           <option key={acc.id} value={acc.id}>{acc.nomeConta} (Saldo: {acc.saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Valor da Transferência<span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0.01"
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                    placeholder="0.00"
                />
            </div>
            <div>
                <label htmlFor="transferDate" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Data da Transferência<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input 
                        type="date" 
                        id="transferDate" 
                        name="transferDate" 
                        value={formData.transferDate} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 pr-10 border border-sorvetao-gray-medium rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sorvetao-primary transition-shadow"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none"/>
                </div>
            </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Descrição / Referência (Opcional)
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Ex: Capital de giro, Cobertura de saldo"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTransferModal;