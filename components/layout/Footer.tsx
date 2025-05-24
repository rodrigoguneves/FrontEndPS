
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center">
      <p className="text-sm text-sorvetao-text-secondary">
        &copy; {new Date().getFullYear()} Sorvetão. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
