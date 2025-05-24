
import React, { useState } from 'react';
import {
  BuildingStorefrontIcon,
  IdentificationIcon,
  MapPinIcon,
  LockClosedIcon,
  PencilSquareIcon,
  SaveIcon,
} from '../../components/icons';

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode; // Optional actions for the header (like Edit button)
}

const FormSection: React.FC<FormSectionProps> = ({ icon, title, children, headerActions }) => (
  <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="bg-pink-100 p-2 rounded-full mr-3 flex-shrink-0">
          {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5 text-sorvetao-primary' })}
        </div>
        <h2 className="text-base font-semibold text-sorvetao-primary">{title}</h2>
      </div>
      {headerActions && <div className="ml-auto">{headerActions}</div>}
    </div>
    {children}
  </div>
);

interface InfoDisplayProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ label, value, className = '' }) => (
  <div className={className}>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);


interface FormFieldInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

const FormFieldInput: React.FC<FormFieldInputProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  className = '',
}) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      className={`w-full p-3 border rounded-xl text-sm
        ${readOnly 
          ? 'bg-gray-100 text-gray-700 border-gray-300 cursor-default' 
          : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary'
        } 
        transition-all`}
    />
  </div>
);

const CustomerAccountPage: React.FC = () => {
  const [formState, setFormState] = useState({
    contactPerson: 'João da Silva',
    contactPhone: '(11) 98765-4321',
    addressStreet: 'Av. das Palmeiras',
    addressNumber: '123',
    addressComplement: 'Sala 2',
    addressDistrict: 'Centro',
    addressCity: 'Campinas',
    addressState: 'SP',
    addressZip: '13000-000',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Static data based on screenshot
  const companyInfo = {
    razaoSocial: 'Sorvetes do Vale Ltda',
    cnpj: '12.345.678/0001-99',
    entregaHabilitada: true,
    taxaEntrega: 'R$ 10,00',
    pedidoMinimo: 'R$ 200,00',
    emailAcesso: 'joao@sorvetesdovale.com.br',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados da conta salvos:", formState);
    alert('Dados da conta salvos (simulação)!');
  };

  const handleCancel = () => {
    alert("Alterações canceladas.");
  };

  const handleEditAddress = () => {
    alert("Editar endereço (funcionalidade pendente).");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-sorvetao-primary text-center my-6">Minha Conta</h1>

      <form onSubmit={handleSubmit} className="space-y-0"> {/* Reduced space between sections */}
        <FormSection icon={<BuildingStorefrontIcon />} title="Informações da Empresa">
          <div className="space-y-3">
            <InfoDisplay label="Razão Social" value={companyInfo.razaoSocial} />
            <InfoDisplay label="CNPJ" value={companyInfo.cnpj} />
            <div className="bg-gray-50 p-3 rounded-lg mt-2">
                <p className="text-xs text-gray-500 mb-1">Configuração de Entrega</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium text-sorvetao-primary">Entrega Ativada</span>
                    <span className="text-gray-700">Taxa: <span className="font-semibold">{companyInfo.taxaEntrega}</span></span>
                    <span className="text-gray-700">Pedido Mínimo: <span className="font-semibold">{companyInfo.pedidoMinimo}</span></span>
                </div>
            </div>
          </div>
        </FormSection>

        <FormSection icon={<IdentificationIcon />} title="Informações de Contato e Acesso">
          <div className="space-y-4">
            <FormFieldInput
              label="Nome do Responsável"
              id="contactPerson"
              name="contactPerson"
              value={formState.contactPerson}
              onChange={handleChange}
              placeholder="João da Silva"
            />
            <FormFieldInput
              label="Telefone de Contato"
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={formState.contactPhone}
              onChange={handleChange}
              placeholder="(11) 98765-4321"
            />
            <div>
              <FormFieldInput 
                label="E-mail de Acesso" 
                id="emailAcesso"
                name="emailAcesso"
                value={companyInfo.emailAcesso} 
                onChange={() => {}} // No-op for read-only
                readOnly 
              />
              <p className="text-xs text-gray-500 mt-1">E-mail de acesso não pode ser alterado diretamente.</p>
            </div>
          </div>
        </FormSection>

        <FormSection 
          icon={<MapPinIcon />} 
          title="Endereço de Entrega"
          headerActions={
            <button 
              type="button" 
              onClick={handleEditAddress} 
              className="text-sm text-sorvetao-primary font-medium flex items-center hover:opacity-80"
            >
              <PencilSquareIcon className="w-4 h-4 mr-1"/> Editar
            </button>
          }
        >
          <div className="space-y-4">
            <FormFieldInput label="Rua" id="addressStreet" name="addressStreet" value={formState.addressStreet} onChange={handleChange} placeholder="Av. das Palmeiras" />
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput label="Número" id="addressNumber" name="addressNumber" value={formState.addressNumber} onChange={handleChange} placeholder="123" />
              <FormFieldInput label="Complemento" id="addressComplement" name="addressComplement" value={formState.addressComplement} onChange={handleChange} placeholder="Sala 2" />
            </div>
            <FormFieldInput label="Bairro" id="addressDistrict" name="addressDistrict" value={formState.addressDistrict} onChange={handleChange} placeholder="Centro" />
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput label="Cidade" id="addressCity" name="addressCity" value={formState.addressCity} onChange={handleChange} placeholder="Campinas" />
              <FormFieldInput label="Estado" id="addressState" name="addressState" value={formState.addressState} onChange={handleChange} placeholder="SP" />
            </div>
            <FormFieldInput label="CEP" id="addressZip" name="addressZip" value={formState.addressZip} onChange={handleChange} placeholder="13000-000" />
          </div>
        </FormSection>

        <FormSection icon={<LockClosedIcon />} title="Alterar Senha">
          <div className="space-y-4">
            <FormFieldInput
              label="Senha Atual"
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formState.currentPassword}
              onChange={handleChange}
              placeholder="Digite sua senha atual"
            />
            <div>
              <FormFieldInput
                label="Nova Senha"
                id="newPassword"
                name="newPassword"
                type="password"
                value={formState.newPassword}
                onChange={handleChange}
                placeholder="Digite a nova senha"
              />
              <div className="mt-1 h-1 w-full bg-gray-200 rounded-full">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 
                  ${formState.newPassword.length === 0 ? 'bg-transparent' : 
                    formState.newPassword.length < 4 ? 'bg-red-500 w-[10%]' : 
                    formState.newPassword.length < 6 ? 'bg-red-500 w-1/3' : 
                    formState.newPassword.length < 8 ? 'bg-yellow-500 w-2/3' : 
                    'bg-green-500 w-full'}`}
                ></div>
              </div>
            </div>
            <FormFieldInput
              label="Confirmar Nova Senha"
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={formState.confirmNewPassword}
              onChange={handleChange}
              placeholder="Repita a nova senha"
            />
          </div>
        </FormSection>

        <div className="mt-8 space-y-3 px-4 sm:px-0">
          <button
            type="submit"
            className="w-full bg-sorvetao-primary text-white py-3.5 rounded-xl hover:bg-opacity-90 transition-colors text-base font-medium shadow-md"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-3.5 text-sm font-medium text-sorvetao-primary bg-white border border-sorvetao-primary hover:bg-pink-50 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
      <footer className="mt-8 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Pedidos Sorvetão. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default CustomerAccountPage;
