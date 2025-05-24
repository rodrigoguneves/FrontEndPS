
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockIcon, HeadphonesIcon, EyeIcon, EyeOffIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!email || !password) {
      setError('Email e Senha são obrigatórios.');
      return;
    }
    // Simulate API call
    if (email === 'admin@sorvetao.com' && password === 'admin123') {
      sessionStorage.setItem('isLoggedIn', 'true'); // Admin session
      sessionStorage.setItem('userName', 'João Administrador');
      navigate('/admin/dashboard');
    } else if (email === 'cliente@sorvetao.com' && password === 'cliente123') {
      sessionStorage.setItem('isCustomerLoggedIn', 'true'); // Customer session
      sessionStorage.setItem('customerDisplayName', 'Gelados da Vila'); // Example customer display name
      navigate('/portal/dashboard');
    }
    else {
      setError('Email ou Senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="mb-10 text-center">
        <img src="/assets/images/logo_sorvetao.png" alt="Sorvetão Logo" className="mx-auto h-20 w-auto mb-2" />
        <p className="text-lg text-sorvetao-primary">desde 1990</p>
      </header>

      <main className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-sorvetao-primary mb-8 text-center">
          Acesso ao Sistema
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sorvetao-text-primary mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="text-sorvetao-text-secondary" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-sorvetao-gray-medium rounded-xl bg-gray-50 text-gray-700 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-sorvetao-primary focus:border-sorvetao-primary sm:text-sm"
                placeholder="seu@email.com"
                aria-label="Email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-sorvetao-text-primary mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="text-sorvetao-text-secondary" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-sorvetao-gray-medium rounded-xl bg-gray-50 text-gray-700 placeholder-sorvetao-text-secondary focus:outline-none focus:ring-sorvetao-primary focus:border-sorvetao-primary sm:text-sm"
                placeholder="••••••••"
                aria-label="Senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-sorvetao-text-secondary hover:text-sorvetao-primary"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-sorvetao-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sorvetao-primary transition duration-150"
            >
              Logar →
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-sorvetao-primary hover:underline">
            Esqueceu sua Senha?
          </a>
        </div>
      </main>

      <footer className="mt-12 text-center text-sorvetao-text-secondary text-sm space-y-2">
        <p>Para Cadastramento no sistema procure nossa Equipe</p>
        <a href="#" className="inline-flex items-center hover:text-sorvetao-primary hover:underline">
          <HeadphonesIcon className="w-4 h-4 mr-1.5" /> Suporte
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;