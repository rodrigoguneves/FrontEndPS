
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Customer, CustomerStatus, TableAction } from '../../types';
import { PlusIcon, UsersIcon, MapPinIcon, PencilIcon, TrashIcon, EyeIcon, LinkIcon, TruckIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, FunnelIcon, MinusIcon } from '../../components/icons';

const mockCustomers: Customer[] = [
  { id: '1', cliente: 'Sorvetes Paraiso Ltda', responsavel: 'Ana Paula Lima', email: 'ana.paula@sorpara.com', status: CustomerStatus.ACTIVE, entregaHabilitada: true },
  { id: '2', cliente: 'Delícias Geladas ME', responsavel: 'Carlos Silva', email: 'carlos@deliciasgeladas.com', status: CustomerStatus.INACTIVE, entregaHabilitada: false },
  { id: '3', cliente: 'Sorvetes GelaTudo', responsavel: 'Beatriz Souza', email: 'beatriz@gela.com', status: CustomerStatus.ACTIVE, entregaHabilitada: true },
  { id: '4', cliente: 'Açaí Power', responsavel: 'Roberto Alves', email: 'roberto@acaipower.com', status: CustomerStatus.ACTIVE, entregaHabilitada: true },
  { id: '5', cliente: 'IceBom Sorveteria', responsavel: 'Fernanda Costa', email: 'fernanda@icebom.net', status: CustomerStatus.INACTIVE, entregaHabilitada: true },
  { id: '6', cliente: 'Gelato & Cia', responsavel: 'Marcos Pereira', email: 'marcos@gelatoecia.com.br', status: CustomerStatus.ACTIVE, entregaHabilitada: false },
];

const ITEMS_PER_PAGE = 5;

const ClientesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clientes' | 'mapa'>('clientes');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Initialize useNavigate

  // State for map filters (example)
  const [mapCidade, setMapCidade] = useState('Todas');
  const [mapStatus, setMapStatus] = useState('Todos');
  const [mapEntrega, setMapEntrega] = useState('Todos');

  const totalPages = Math.ceil(mockCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = mockCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (id: string) => alert(`Editar cliente ID: ${id}`);
  const handleDelete = (id: string) => alert(`Excluir cliente ID: ${id}`);
  const handleView = (id: string) => alert(`Visualizar cliente ID: ${id}`);
  const handleLink = (id: string) => alert(`Link cliente ID: ${id}`);
  const handleFilterMap = () => alert(`Filtrar mapa: Cidade=${mapCidade}, Status=${mapStatus}, Entrega=${mapEntrega}`);

  const actions: TableAction[] = [
    { icon: PencilIcon, onClick: handleEdit, tooltip: 'Editar' },
    { icon: TrashIcon, onClick: handleDelete, tooltip: 'Excluir', colorClass: 'text-red-500 hover:text-red-700' },
    { icon: EyeIcon, onClick: handleView, tooltip: 'Visualizar' },
    { icon: LinkIcon, onClick: handleLink, tooltip: 'Link' },
  ];

  const handleCreateNewClient = () => {
    navigate('/admin/clientes/novo');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-sorvetao-text-primary mb-4 sm:mb-0">Clientes</h1>
        <button 
          onClick={handleCreateNewClient} // Updated onClick handler
          className="bg-sorvetao-primary text-white px-5 py-3 rounded-xl hover:bg-opacity-90 transition-colors duration-150 flex items-center space-x-2 text-sm font-medium">
          <PlusIcon className="w-5 h-5" />
          <span>Novo Cliente</span>
        </button>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-sorvetao-gray-medium">
          <button
            onClick={() => setActiveTab('clientes')}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
              ${activeTab === 'clientes' ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
          >
            <UsersIcon className={`w-5 h-5 ${activeTab === 'clientes' ? 'text-sorvetao-primary' : ''}`} />
            <span>Clientes</span>
          </button>
          <button
            onClick={() => setActiveTab('mapa')}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none
              ${activeTab === 'mapa' ? 'bg-sorvetao-pink-light text-sorvetao-primary border-b-2 border-sorvetao-primary' : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light'}`}
          >
            <MapPinIcon className={`w-5 h-5 ${activeTab === 'mapa' ? 'text-sorvetao-primary' : ''}`} />
            <span>Mapa</span>
          </button>
        </div>
      </div>

      {activeTab === 'clientes' && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sorvetao-gray-medium">
              <thead className="bg-sorvetao-pink-light">
                <tr>
                  {['Cliente', 'Responsável', 'E-mail', 'Status', 'Entrega', 'Ações'].map(header => (
                    <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-sorvetao-primary uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sorvetao-gray-light">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-sorvetao-gray-light transition-colors duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sorvetao-text-primary">{customer.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">{customer.responsavel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${customer.status === CustomerStatus.ACTIVE ? 'bg-sorvetao-green-badge-bg text-sorvetao-green-badge-text' : 'bg-sorvetao-gray-badge-bg text-sorvetao-gray-badge-text'}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sorvetao-text-secondary">
                      <TruckIcon className={`w-6 h-6 ${customer.entregaHabilitada ? 'text-sorvetao-primary' : 'text-sorvetao-gray-medium'}`} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        {actions.map(action => (
                          <button key={action.tooltip} onClick={() => action.onClick(customer.id)} title={action.tooltip} className={`p-1 rounded-full hover:bg-gray-200 transition-colors ${action.colorClass || 'text-sorvetao-text-secondary hover:text-sorvetao-primary'}`}>
                            <action.icon className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-sorvetao-text-secondary">
              Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, mockCustomers.length)}</span> de <span className="font-medium">{mockCustomers.length}</span> resultados
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
        </div>
      )}

      {activeTab === 'mapa' && (
        <div>
            <h2 className="text-2xl font-bold text-sorvetao-text-primary mb-6">Mapa de Clientes</h2>
            
            {/* Filter Section Card */}
            <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 items-end">
                {/* Filter 1: Cidade/Região */}
                <div className="w-full">
                  <label htmlFor="map-cidade" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Cidade/Região</label>
                  <div className="relative">
                    <select 
                        id="map-cidade" 
                        value={mapCidade}
                        onChange={(e) => setMapCidade(e.target.value)}
                        className="w-full p-2.5 border border-sorvetao-gray-medium bg-sorvetao-gray-light rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm text-sorvetao-text-primary"
                    >
                      <option>Todas</option>
                      <option>São Paulo - SP</option>
                      <option>Rio de Janeiro - RJ</option>
                      <option>Belo Horizonte - MG</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sorvetao-text-secondary pointer-events-none" />
                  </div>
                </div>
                {/* Filter 2: Status */}
                <div className="w-full">
                  <label htmlFor="map-status" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Status</label>
                  <div className="relative">
                    <select 
                        id="map-status" 
                        value={mapStatus}
                        onChange={(e) => setMapStatus(e.target.value)}
                        className="w-full p-2.5 border border-sorvetao-gray-medium bg-sorvetao-gray-light rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm text-sorvetao-text-primary"
                    >
                      <option>Todos</option>
                      <option>Ativo</option>
                      <option>Inativo</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sorvetao-text-secondary pointer-events-none" />
                  </div>
                </div>
                {/* Filter 3: Entrega Habilitada */}
                <div className="w-full">
                  <label htmlFor="map-entrega" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Entrega Habilitada</label>
                  <div className="relative">
                    <select 
                        id="map-entrega" 
                        value={mapEntrega}
                        onChange={(e) => setMapEntrega(e.target.value)}
                        className="w-full p-2.5 border border-sorvetao-gray-medium bg-sorvetao-gray-light rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none text-sm text-sorvetao-text-primary"
                    >
                      <option>Todos</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sorvetao-text-secondary pointer-events-none" />
                  </div>
                </div>
                {/* Filter Button */}
                <button 
                    onClick={handleFilterMap}
                    className="bg-sorvetao-primary text-white px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center space-x-2 text-sm font-medium w-full h-[42px]"  // Matched height of select
                >
                  <FunnelIcon className="w-5 h-5" />
                  <span>Filtrar</span>
                </button>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative bg-gray-100 rounded-2xl p-1 shadow-lg">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] rounded-xl overflow-hidden"> {/* Adjusted height */}
                <img 
                  src="https://i.imgur.com/X4y08pX.png" 
                  alt="Mapa de clientes" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button aria-label="Aumentar zoom" className="bg-white p-2.5 rounded-lg shadow-md hover:bg-gray-100 transition text-sorvetao-text-primary">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                  <button aria-label="Diminuir zoom" className="bg-white p-2.5 rounded-lg shadow-md hover:bg-gray-100 transition text-sorvetao-text-primary">
                    <MinusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;