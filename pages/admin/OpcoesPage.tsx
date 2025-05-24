
import React, { useState } from 'react';
import {
  UsersIcon,
  ArchiveBoxIcon,
  PuzzlePieceIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  SaveIcon,
  CogIcon, // Using CogIcon for the "Opcoes" page title consistency with nav
} from '../../components/icons'; // Ensure all used icons are imported

type SystemOptionTab = 'gerencia' | 'dados' | 'design';

interface UserData {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'João Administrador', role: 'Administrador', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Carlos Gerente', role: 'Gerente', avatarUrl: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: '3', name: 'Ana Souza', role: 'Gerente', avatarUrl: 'https://randomuser.me/api/portraits/women/34.jpg' },
];

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    role="tab"
    aria-selected={isActive}
    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
      ${isActive 
        ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' 
        : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light hover:text-sorvetao-primary'
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);


const OpcoesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SystemOptionTab>('gerencia');
  const [profileName, setProfileName] = useState('João Administrador');
  const [profileEmail, setProfileEmail] = useState('admin@sorvetao.com.br');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Salvar perfil: Nova Senha - ${newPassword || '(não alterada)'}`);
    // Reset password field if desired, or show success message
    setNewPassword('');
  };

  const handleAddNewUser = () => {
    alert('Adicionar novo usuário (funcionalidade a ser implementada).');
  };

  const handleEditUser = (userId: string) => {
    alert(`Editar usuário ID: ${userId} (funcionalidade a ser implementada).`);
  };

  const handleDeleteUser = (userId: string) => {
    alert(`Excluir usuário ID: ${userId} (funcionalidade a ser implementada).`);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
      <h1 className="text-3xl font-bold text-sorvetao-text-primary mb-6">Opções do Sistema</h1>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div role="tablist" className="flex border-b border-sorvetao-gray-medium">
          <TabButton
            label="Gerência"
            icon={<UsersIcon className="w-5 h-5" />} // Color will be inherited
            isActive={activeTab === 'gerencia'}
            onClick={() => setActiveTab('gerencia')}
          />
          <TabButton
            label="Dados"
            icon={<ArchiveBoxIcon className="w-5 h-5" />} // Color will be inherited
            isActive={activeTab === 'dados'}
            onClick={() => setActiveTab('dados')}
          />
          <TabButton
            label="Design & Tema"
            icon={<PuzzlePieceIcon className="w-5 h-5" />} // Color will be inherited
            isActive={activeTab === 'design'}
            onClick={() => setActiveTab('design')}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'gerencia' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section: User Management */}
            <div className="lg:w-3/5">
              <div className="flex items-center mb-2">
                <UsersIcon className="w-6 h-6 text-sorvetao-primary mr-2" />
                <h2 className="text-2xl font-semibold text-sorvetao-text-primary">Gerenciamento de Usuários</h2>
              </div>
              <p className="text-sm text-sorvetao-text-secondary mb-6 ml-8">Usuários do Sistema</p>
              
              <button
                onClick={handleAddNewUser}
                className="mb-6 bg-sorvetao-primary text-white px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors duration-150 flex items-center space-x-2 text-sm font-medium shadow-md"
              >
                <UserPlusIcon className="w-5 h-5" />
                <span>Novo Usuário</span>
              </button>

              <div className="space-y-4">
                {mockUsers.map(user => (
                  <div key={user.id} className="bg-sorvetao-gray-light p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-sorvetao-text-primary">{user.name}</p>
                        <p className="text-xs text-sorvetao-text-secondary">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditUser(user.id)} 
                        title="Editar usuário"
                        className="p-2 text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-pink-light rounded-full transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        title="Excluir usuário"
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: My Profile */}
            <div className="lg:w-2/5 bg-sorvetao-secondary-bg p-6 rounded-2xl shadow-inner">
              <div className="flex items-center mb-6">
                  <UserCircleIcon className="w-6 h-6 text-sorvetao-primary mr-2" />
                <h2 className="text-2xl font-semibold text-sorvetao-text-primary">Meu Perfil</h2>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div>
                  <label htmlFor="profileName" className="block text-sm font-medium text-sorvetao-text-primary mb-1">Nome</label>
                  <input
                    type="text"
                    id="profileName"
                    value={profileName}
                    readOnly 
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-sorvetao-gray-light text-sorvetao-text-secondary cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="profileEmail" className="block text-sm font-medium text-sorvetao-text-primary mb-1">E-mail</label>
                  <input
                    type="email"
                    id="profileEmail"
                    value={profileEmail}
                    readOnly
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-sorvetao-gray-light text-sorvetao-text-secondary cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-sorvetao-text-primary mb-1">Nova Senha</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sorvetao-primary text-white px-5 py-3 rounded-xl hover:bg-opacity-90 transition-colors duration-150 flex items-center justify-center space-x-2 text-sm font-medium shadow-md"
                >
                  <SaveIcon className="w-5 h-5" />
                  <span>Salvar Alterações</span>
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === 'dados' && (
          <div className="text-center py-10">
            <ArchiveBoxIcon className="w-16 h-16 text-sorvetao-gray-medium mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-sorvetao-text-primary">Gerenciamento de Dados</h2>
            <p className="text-sorvetao-text-secondary mt-2">Opções para importação, exportação e backup de dados.</p>
            <p className="text-sorvetao-text-secondary mt-1">Em construção.</p>
          </div>
        )}
        {activeTab === 'design' && (
          <div className="text-center py-10">
            <PuzzlePieceIcon className="w-16 h-16 text-sorvetao-gray-medium mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-sorvetao-text-primary">Design & Tema</h2>
            <p className="text-sorvetao-text-secondary mt-2">Configurações de aparência, cores e logo do sistema.</p>
            <p className="text-sorvetao-text-secondary mt-1">Em construção.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpcoesPage;
