
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

// Admin Imports
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ClientesPage from './pages/admin/ClientesPage';
import CriarNovoClientePage from './pages/admin/CriarNovoClientePage';
import ProdutosPage from './pages/admin/ProdutosPage';
import PedidosPage from './pages/admin/PedidosPage';
import CriarNovoPedidoPage from './pages/admin/CriarNovoPedidoPage';
import FinanceiroPage from './pages/admin/FinanceiroPage';
import OpcoesPage from './pages/admin/OpcoesPage';

// Customer Imports
import CustomerLayout from './components/layout/CustomerLayout';
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';
import CustomerNewOrderPage from './pages/customer/CustomerNewOrderPage';
import CustomerMyOrdersPage from './pages/customer/CustomerMyOrdersPage';
import CustomerHistoryPage from './pages/customer/CustomerHistoryPage';
import CustomerAccountPage from './pages/customer/CustomerAccountPage';
import CustomerOrderDetailPage from './pages/customer/CustomerOrderDetailPage'; // Added this line


const isAdminAuthenticated = () => sessionStorage.getItem('isLoggedIn') === 'true';
const isCustomerAuthenticated = () => sessionStorage.getItem('isCustomerLoggedIn') === 'true';

interface ProtectedRouteProps {
  children: React.ReactNode;
  authFn: () => boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, authFn, redirectTo = "/login" }) => {
  if (!authFn()) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
};

const getRootRedirect = () => {
  if (isAdminAuthenticated()) {
    return "/admin/dashboard";
  } else if (isCustomerAuthenticated()) {
    return "/portal/dashboard";
  }
  return "/login";
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute authFn={isAdminAuthenticated}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="clientes/novo" element={<CriarNovoClientePage />} />
          <Route path="produtos" element={<ProdutosPage />} />
          <Route path="pedidos" element={<PedidosPage />} />
          <Route path="pedidos/novo" element={<CriarNovoPedidoPage />} />
          <Route path="financeiro" element={<FinanceiroPage />} />
          <Route path="opcoes" element={<OpcoesPage />} />
        </Route>

        {/* Customer Portal Routes */}
        <Route
          path="/portal"
          element={
            <ProtectedRoute authFn={isCustomerAuthenticated}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CustomerDashboardPage />} />
          <Route path="novo-pedido" element={<CustomerNewOrderPage />} />
          <Route path="meus-pedidos" element={<CustomerMyOrdersPage />} />
          <Route path="meus-pedidos/:orderId" element={<CustomerOrderDetailPage />} /> {/* Added this line */}
          <Route path="historico" element={<CustomerHistoryPage />} />
          <Route path="minha-conta" element={<CustomerAccountPage />} />
        </Route>
        
        <Route path="/" element={<Navigate to={getRootRedirect()} replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;