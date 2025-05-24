

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  MapPinIcon,
  LockIcon,
  TruckIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  XIcon,
  CheckIcon // For checkbox
} from '../../components/icons';

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ icon, title, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg ${className}`}>
    <div className="flex items-center mb-6">
      <div className="bg-pink-100 p-2 rounded-full mr-3">
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5 text-sorvetao-primary' })}
      </div>
      <h2 className="text-xl font-semibold text-sorvetao-text-primary">{title}</h2>
    </div>
    {children}
  </div>
);

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children?: React.ReactNode; // For icons inside input
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = "text", placeholder, required, value, onChange, className, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-sorvetao-text-secondary mb-1.5">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-blue-50 bg-opacity-50 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-all ${children ? 'pr-10' : ''} ${className}`}
      />
      {children}
    </div>
  </div>
);


const CriarNovoClientePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    nomeResponsavel: '',
    email: '',
    telefone: '',
    status: 'Ativo',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    senhaInicial: '',
    confirmarSenha: '',
    habilitarEntrega: true,
    diasPermitidosEntrega: '',
    produtosPermitidos: '',
  });
  const [showPermittedProducts, setShowPermittedProducts] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log('Form data:', formData);
    alert('Cliente criado (simulado)! Verifique o console.');
    navigate('/admin/clientes');
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-sorvetao-text-primary">Criar Novo Cliente</h1>
          <p className="text-sorvetao-text-secondary mt-1">Adicione um novo cliente B2B/Revendedor ao sistema.</p>
        </div>
        <button
          onClick={() => navigate('/admin/clientes')}
          className="bg-sorvetao-primary text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors duration-150 text-sm font-medium shadow-md mt-4 sm:mt-0"
        >
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection icon={<UserCircleIcon />} title="Dados do Cliente">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <InputField label="Nome da Empresa" id="nomeEmpresa" value={formData.nomeEmpresa} onChange={handleChange} placeholder="Ex: Sorveteria do João Ltda" required />
            <InputField label="CNPJ" id="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="00.000.000/0001-00" />
            <InputField label="Nome do Responsável" id="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} placeholder="Nome do contato principal" />
            <InputField label="E-mail" id="email" type="email" value={formData.email} onChange={handleChange} placeholder="contato@email.com" required />
            <InputField label="Telefone" id="telefone" value={formData.telefone} onChange={handleChange} placeholder="(99) 99999-9999" />
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-sorvetao-text-secondary mb-1.5">Status</label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-blue-50 bg-opacity-50 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Pendente">Pendente Aprovação</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sorvetao-text-secondary pointer-events-none" />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection icon={<MapPinIcon />} title="Endereço">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <InputField label="Rua" id="rua" value={formData.rua} onChange={handleChange} placeholder="Av. Principal" />
            <InputField label="Número" id="numero" value={formData.numero} onChange={handleChange} placeholder="1234" />
            <InputField label="Complemento" id="complemento" value={formData.complemento} onChange={handleChange} placeholder="Sala, bloco, etc." />
            <InputField label="Bairro" id="bairro" value={formData.bairro} onChange={handleChange} placeholder="Centro" />
            <InputField label="Cidade" id="cidade" value={formData.cidade} onChange={handleChange} placeholder="São Paulo" />
            <InputField label="Estado" id="estado" value={formData.estado} onChange={handleChange} placeholder="SP" />
            <InputField label="CEP" id="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" />
          </div>
        </FormSection>

        <FormSection icon={<LockIcon />} title="Informações de Login">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <InputField label="Senha Inicial" id="senhaInicial" type="password" value={formData.senhaInicial} onChange={handleChange} />
            <InputField label="Confirmar Senha" id="confirmarSenha" type="password" value={formData.confirmarSenha} onChange={handleChange} />
          </div>
        </FormSection>

        <FormSection icon={<TruckIcon />} title="Configurações de Entrega">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="habilitarEntrega"
              name="habilitarEntrega"
              checked={formData.habilitarEntrega}
              onChange={handleChange}
// Remove 'custom-checkbox' class as <style jsx> is not supported
              className="h-5 w-5 text-sorvetao-primary rounded border-gray-300 focus:ring-sorvetao-primary"
            />
            <label htmlFor="habilitarEntrega" className="ml-2.5 block text-sm font-medium text-sorvetao-text-primary">
              Habilitar entrega para este cliente
            </label>
          </div>
          {formData.habilitarEntrega && (
            <InputField label="Dias Permitidos para Entrega" id="diasPermitidosEntrega" value={formData.diasPermitidosEntrega} onChange={handleChange} placeholder="Ex: Seg, Qua, Sex" />
          )}
        </FormSection>

        <FormSection icon={<ShoppingBagIcon />} title="Catálogo de Produtos Permitidos">
          <button
            type="button"
            onClick={() => setShowPermittedProducts(!showPermittedProducts)}
            className="w-full flex justify-between items-center p-3 bg-blue-50 bg-opacity-50 border border-sorvetao-gray-medium rounded-xl hover:bg-blue-100 hover:bg-opacity-50 transition-colors mb-3"
            aria-expanded={showPermittedProducts}
            aria-controls="permitted-products-content"
          >
            <span className="text-sm font-medium text-sorvetao-text-primary">Potes e Copos (Exemplo de Categoria)</span>
            {showPermittedProducts ? <ChevronUpIcon className="w-5 h-5 text-sorvetao-text-secondary" /> : <ChevronDownIcon className="w-5 h-5 text-sorvetao-text-secondary" />}
          </button>
          {showPermittedProducts && (
            <div id="permitted-products-content">
              <label htmlFor="produtosPermitidos" className="block text-sm font-medium text-sorvetao-text-secondary mb-1.5">
                Produtos/SKUs Permitidos
              </label>
              <textarea
                id="produtosPermitidos"
                name="produtosPermitidos"
                value={formData.produtosPermitidos}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-blue-50 bg-opacity-50 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-all"
                placeholder="Liste SKUs ou nomes de produtos permitidos, um por linha."
              />
            </div>
          )}
        </FormSection>

        <div className="pt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/clientes')}
            className="px-6 py-2.5 text-sm font-medium text-sorvetao-text-secondary bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors duration-150"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-sorvetao-primary text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors duration-150 flex items-center justify-center space-x-2 text-sm font-medium shadow-md"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Criar Cliente</span>
          </button>
        </div>
      </form>
{/* Remove unsupported <style jsx> block */}
    </div>
  );
};

export default CriarNovoClientePage;