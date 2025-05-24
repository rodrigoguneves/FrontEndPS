import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { BankIcon, SaveIcon, ChevronDownIcon } from '../icons';
import { AccountType, AccountStatus, FinancialAccount } from '../../types';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: FinancialAccount) => void;
  existingAccount?: FinancialAccount | null;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose, onSave, existingAccount }) => {
  const initialFormState: FinancialAccount = {
    id: existingAccount?.id || Date.now().toString(),
    nomeConta: existingAccount?.nomeConta || '',
    tipoConta: existingAccount?.tipoConta || AccountType.CONTA_CORRENTE,
    saldoInicial: existingAccount?.saldoInicial || 0,
    instituicaoFinanceira: existingAccount?.instituicaoFinanceira || '',
    agencia: existingAccount?.agencia || '',
    numeroConta: existingAccount?.numeroConta || '',
    status: existingAccount?.status || AccountStatus.ATIVA,
    // These would typically be calculated or come from transactions, not set directly in this form
    totalEntradasMesAtual: existingAccount?.totalEntradasMesAtual || 0, 
    totalSaidasMesAtual: existingAccount?.totalSaidasMesAtual || 0,
    saldoAtual: existingAccount?.saldoAtual || (existingAccount?.saldoInicial || 0),
  };

  const [formData, setFormData] = useState<FinancialAccount>(initialFormState);

  useEffect(() => {
    if (isOpen) {
        setFormData(existingAccount ? 
            { ...initialFormState, ...existingAccount, saldoAtual: existingAccount.saldoInicial + existingAccount.totalEntradasMesAtual - existingAccount.totalSaidasMesAtual } 
            : 
            { ...initialFormState, id: Date.now().toString(), saldoAtual: initialFormState.saldoInicial }
        );
    }
  }, [isOpen, existingAccount]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newSaldoInicial = formData.saldoInicial;
    if (name === 'saldoInicial') {
        newSaldoInicial = parseFloat(value) || 0;
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'saldoInicial' ? newSaldoInicial : value,
      saldoAtual: name === 'saldoInicial' ? (newSaldoInicial + prev.totalEntradasMesAtual - prev.totalSaidasMesAtual) : prev.saldoAtual
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accountToSave = {
        ...formData,
        // Recalculate saldoAtual before saving, ensuring saldoInicial is a number
        saldoAtual: (parseFloat(String(formData.saldoInicial)) || 0) + formData.totalEntradasMesAtual - formData.totalSaidasMesAtual
    };
    onSave(accountToSave);
    onClose();
  };
  
  const title = existingAccount ? 'Editar Conta Financeira' : 'Adicionar Nova Conta';
  const subtitle = existingAccount ? 'Atualize os detalhes da conta.' : 'Preencha os dados para criar uma nova conta.';

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
        form="add-account-form"
        className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2 text-sm"
      >
        <SaveIcon className="w-5 h-5" />
        <span>{existingAccount ? 'Salvar Alterações' : 'Criar Conta'}</span>
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleIcon={<BankIcon className="w-6 h-6 text-sorvetao-primary" />}
      title={title}
      subtitle={subtitle}
      footerContent={footerContent}
      maxWidth="max-w-xl"
    >
      <form id="add-account-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="nomeConta" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Nome da Conta<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nomeConta"
            name="nomeConta"
            value={formData.nomeConta}
            onChange={handleChange}
            required
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Ex: Conta Corrente Bradesco"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="tipoConta" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Tipo de Conta<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <select
                    id="tipoConta"
                    name="tipoConta"
                    value={formData.tipoConta}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                >
                    {Object.values(AccountType).map(type => (
                    <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
            <div>
                <label htmlFor="saldoInicial" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Saldo Inicial<span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="saldoInicial"
                    name="saldoInicial"
                    value={formData.saldoInicial}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                    placeholder="0.00"
                />
            </div>
        </div>

        <div>
          <label htmlFor="instituicaoFinanceira" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Instituição Financeira (Opcional)
          </label>
          <input
            type="text"
            id="instituicaoFinanceira"
            name="instituicaoFinanceira"
            value={formData.instituicaoFinanceira || ''}
            onChange={handleChange}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Ex: Banco Bradesco S.A."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <label htmlFor="agencia" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Agência (Opcional)
                </label>
                <input
                    type="text"
                    id="agencia"
                    name="agencia"
                    value={formData.agencia || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                    placeholder="Ex: 0123-4"
                />
            </div>
            <div>
                <label htmlFor="numeroConta" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                    Número da Conta (Opcional)
                </label>
                <input
                    type="text"
                    id="numeroConta"
                    name="numeroConta"
                    value={formData.numeroConta || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                    placeholder="Ex: 0012345-6"
                />
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
                <option value={AccountStatus.ATIVA}>{AccountStatus.ATIVA}</option>
                <option value={AccountStatus.INATIVA}>{AccountStatus.INATIVA}</option>
            </select>
            <ChevronDownIcon className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none w-5 h-5 text-sorvetao-text-secondary" />
            </div>
        </div>

      </form>
    </Modal>
  );
};

export default AddAccountModal;
