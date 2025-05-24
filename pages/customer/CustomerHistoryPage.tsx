
import React, { useState } from 'react';
import {
  ChartBarIcon,
  CalendarIcon,
  FunnelIcon,
  BanknotesIcon,
  ArchiveBoxIcon,
  StarIcon,
  TableCellsIcon,
  IconProps // Import IconProps
} from '../../components/icons';

type Period = 'week' | 'month' | '30days' | '6months' | 'custom';

interface SummaryCardProps {
  icon: React.ReactElement<IconProps>; // Use React.ReactElement with IconProps
  title: string;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-2xl shadow-lg">
    <div className="flex items-center space-x-3">
      <div className="bg-pink-100 p-3 rounded-full">
        {React.cloneElement(icon, { className: 'w-5 h-5 text-sorvetao-primary' })}
      </div>
      <div>
        <p className="text-xs text-sorvetao-text-secondary">{title}</p>
        <p className="text-lg font-semibold text-sorvetao-text-primary">{value}</p>
      </div>
    </div>
  </div>
);


const CustomerHistoryPage: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('week');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handlePeriodChange = (period: Period) => {
    setActivePeriod(period);
    // In a real app, fetch data for this period
    console.log("Selected period:", period);
  };

  const handleApplyCustomFilter = () => {
    if(customStartDate && customEndDate) {
      setActivePeriod('custom');
      console.log("Applying custom filter:", customStartDate, "-", customEndDate);
      // Fetch data for custom range
    } else {
      alert("Por favor, selecione as datas de início e fim.");
    }
  };

  const handleViewDataTable = () => {
    alert("Visualizar dados em tabela (funcionalidade pendente).");
  };

  const periodButtons: { id: Period; label: string }[] = [
    { id: 'week', label: 'Esta Semana' },
    { id: 'month', label: 'Este Mês' },
    { id: '30days', label: 'Últimos 30 Dias' },
    { id: '6months', label: 'Últimos 6 Meses' },
  ];

  const summaryStats: SummaryCardProps[] = [
    { icon: <ArchiveBoxIcon />, title: 'Total de Pedidos no Período', value: '---' },
    { icon: <BanknotesIcon />, title: 'Valor Total dos Pedidos', value: '---' },
    { icon: <ChartBarIcon />, title: 'Média de Pedidos', value: '---' },
    { icon: <StarIcon />, title: 'Produto Mais Pedido', value: '---' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title Section */}
      <div className="flex items-center mb-6 md:mb-8">
        <div className="bg-pink-100 p-2.5 rounded-full mr-3 md:mr-4">
          <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6 text-sorvetao-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-sorvetao-text-primary">Histórico de Volume de Pedidos</h1>
          <p className="text-xs md:text-sm text-sorvetao-text-secondary mt-0.5 md:mt-1">
            Acompanhe seus volumes e tendências de pedidos ao longo do tempo.
          </p>
        </div>
      </div>

      {/* Period Selection Card */}
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg mb-6 md:mb-8">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
          {periodButtons.map(btn => (
            <button
              key={btn.id}
              onClick={() => handlePeriodChange(btn.id)}
              className={`px-3 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
                ${activePeriod === btn.id 
                  ? 'bg-sorvetao-primary text-white shadow-md' 
                  : 'bg-sorvetao-gray-light text-sorvetao-text-secondary hover:bg-sorvetao-gray-medium'
                }`
              }
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-end gap-3 md:gap-4">
          <div className="relative flex-grow w-full sm:w-auto">
            <label htmlFor="startDate" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">De:</label>
            <input
              type="text"
              id="startDate"
              value={customStartDate}
              onFocus={(e) => e.target.type='date'}
              onBlur={(e) => !e.target.value && (e.target.type='text')}
              onChange={e => setCustomStartDate(e.target.value)}
              placeholder="dd/mm/aaaa"
              className="w-full p-2.5 pr-9 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"
            />
            <CalendarIcon className="absolute right-3 top-1/2 mt-1.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative flex-grow w-full sm:w-auto">
            <label htmlFor="endDate" className="block text-xs font-medium text-sorvetao-text-secondary mb-1">Até:</label>
            <input
              type="text"
              id="endDate"
              onFocus={(e) => e.target.type='date'}
              onBlur={(e) => !e.target.value && (e.target.type='text')}
              value={customEndDate}
              onChange={e => setCustomEndDate(e.target.value)}
              placeholder="dd/mm/aaaa"
              className="w-full p-2.5 pr-9 border border-sorvetao-gray-medium rounded-lg focus:ring-1 focus:ring-sorvetao-primary focus:border-sorvetao-primary text-sm"
            />
            <CalendarIcon className="absolute right-3 top-1/2 mt-1.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={handleApplyCustomFilter}
            className="w-full sm:w-auto bg-sorvetao-primary text-white px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center space-x-1.5 text-sm font-medium"
            disabled={!customStartDate || !customEndDate}
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Aplicar Filtro</span>
          </button>
        </div>
      </div>

      {/* Chart Area 1: Volume de Pedidos */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-6 md:mb-8">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="w-5 h-5 text-sorvetao-primary mr-2.5" />
          <h3 className="text-md md:text-lg font-semibold text-sorvetao-text-primary">Volume de Pedidos</h3>
        </div>
        <div className="h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-sorvetao-text-secondary text-sm">Gráfico de Volume de Pedidos - Placeholder</p>
        </div>
      </div>

      {/* Chart Area 2: Valor Total dos Pedidos */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-6 md:mb-8">
        <div className="flex items-center mb-4">
          <BanknotesIcon className="w-5 h-5 text-sorvetao-primary mr-2.5" />
          <h3 className="text-md md:text-lg font-semibold text-sorvetao-text-primary">Valor Total dos Pedidos</h3>
        </div>
        <div className="h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-sorvetao-text-secondary text-sm">Gráfico de Valor Total dos Pedidos - Placeholder</p>
        </div>
      </div>
      
      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {summaryStats.map(stat => (
          <SummaryCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* View Data Table Button */}
      <div className="text-center mb-6 md:mb-8">
        <button
          onClick={handleViewDataTable}
          className="text-sm font-medium text-sorvetao-primary hover:underline flex items-center justify-center mx-auto space-x-1 py-2 px-3 rounded-lg hover:bg-pink-50 transition-colors"
        >
          <TableCellsIcon className="w-4 h-4 text-sorvetao-primary" />
          <span>Ver Dados em Tabela</span>
        </button>
      </div>
      
      <footer className="mt-8 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Pedidos Sorvetão. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default CustomerHistoryPage;
