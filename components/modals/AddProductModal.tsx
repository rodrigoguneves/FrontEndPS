import React, { useState } from 'react';
import Modal from '../common/Modal';
import { PlusIcon, CubeIcon, ChevronDownIcon } from '../icons';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockProductCategories = [
  { id: 'cat1', name: 'Picolé de Fruta' },
  { id: 'cat2', name: 'Picolé ao Leite' },
  { id: 'cat3', name: 'Potes de Sorvete' },
  { id: 'cat4', name: 'Baldes de Sorvete' },
  { id: 'cat5', name: 'Açaí' },
];

const saleUnitOptions = [
  { id: 'unit1', name: 'Caixa Completa 16un (Caixa com 16 sorvetes premium)' },
  { id: 'unit2', name: 'Caixa Completa 24un (Caixa com 24 sorvetes)' },
  { id: 'unit3', name: 'Meia Caixa 12un (Caixa com 12 sorvetes)' },
  { id: 'unit4', name: 'Meia Caixa 8un (Caixa com 8 sorvetes premium)' },
  { id: 'unit5', name: 'Unidade (Produto vendido por unidade)' },
];

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [saleUnit, setSaleUnit] = useState('');
  const [allowDecimalQuantities, setAllowDecimalQuantities] = useState(false);
  const [saveAndContinue, setSaveAndContinue] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ productName, category, description, price, saleUnit, allowDecimalQuantities, saveAndContinue });
    if (!saveAndContinue) {
      onClose(); // Close modal after submission if not "save and continue"
    } else {
      // Reset form for next entry, or handle as needed
      setProductName('');
      setCategory('');
      setDescription('');
      setPrice('');
      setSaleUnit('');
      setAllowDecimalQuantities(false);
      // setSaveAndContinue(true); // Keep it checked or uncheck based on desired behavior
    }
  };

  const footerContent = (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveAndContinue"
          checked={saveAndContinue}
          onChange={(e) => setSaveAndContinue(e.target.checked)}
          className="h-4 w-4 text-sorvetao-primary border-gray-300 rounded focus:ring-sorvetao-primary"
        />
        <label htmlFor="saveAndContinue" className="ml-2 text-sm font-medium text-sorvetao-text-secondary">
          Salvar e continuar
        </label>
      </div>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-sorvetao-text-secondary font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 text-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          form="add-product-form" // Link to the form
          className="bg-sorvetao-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-xl transition-colors duration-150 flex items-center justify-center text-sm"
        >
          Criar Produto
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleIcon={<PlusIcon className="w-6 h-6 text-white" />}
      titleIconBgClass="bg-sorvetao-primary"
      title="Adicionar Novo Produto"
      subtitle="Criar novo Produto"
      footerContent={footerContent}
      maxWidth="max-w-xl"
    >
      <form id="add-product-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Nome do Produto<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="ex: Picolé de Fruta Sabor Abacaxi - Caixa Completa 24un"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Categoria<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
            >
              <option value="" disabled>Selecionar Categoria</option>
              {mockProductCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="w-5 h-5 text-sorvetao-text-secondary" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
            placeholder="Descrição opcional do produto..."
          />
        </div>
        
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                Preço<span className="text-red-500">*</span>
            </label>
            <div className="relative">
                {/* R$ prefix can be added if needed, but placeholder is just "0" as per image */}
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <span className="text-sorvetao-text-secondary sm:text-sm">R$</span>
                </div> */}
                <input
                type="text" // Using text to allow comma for decimals, handle parsing later
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^0-9,.]/g, ''))} // Basic input cleaning
                required
                className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary transition-shadow"
                placeholder="0" // Changed placeholder
                />
            </div>
        </div>

        <div>
            <label htmlFor="saleUnit" className="block text-sm font-medium text-sorvetao-text-primary mb-1.5">
                Unidade de Venda<span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <select
                    id="saleUnit"
                    value={saleUnit}
                    onChange={(e) => setSaleUnit(e.target.value)}
                    required
                    className="w-full p-3 border border-sorvetao-gray-medium rounded-xl bg-white placeholder-sorvetao-text-secondary focus:outline-none focus:ring-2 focus:ring-sorvetao-primary focus:border-sorvetao-primary appearance-none pr-10 transition-shadow"
                >
                    <option value="" disabled>Selecionar Unidade de Venda</option>
                    {saleUnitOptions.map(unit => (
                        <option key={unit.id} value={unit.id}>{unit.name}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDownIcon className="w-5 h-5 text-sorvetao-text-secondary" />
                </div>
            </div>
        </div>
        
        <div className="flex items-center">
            <input
                type="checkbox"
                id="allowDecimalQuantities"
                checked={allowDecimalQuantities}
                onChange={(e) => setAllowDecimalQuantities(e.target.checked)}
                className="h-4 w-4 text-sorvetao-primary border-gray-300 rounded focus:ring-sorvetao-primary"
            />
            <label htmlFor="allowDecimalQuantities" className="ml-2 text-sm font-medium text-sorvetao-text-primary">
                Permitir quantidades decimais
            </label>
        </div>

      </form>
    </Modal>
  );
};

export default AddProductModal;