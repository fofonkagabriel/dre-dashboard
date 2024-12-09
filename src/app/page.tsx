"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export default function DREDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Arquivo ${type} carregado:`, file.name);
    }
  };

  const dreData = {
    receitas: 1637035.90,
    custos: 928767.16,
    despesas: 258320.60
  };

  const lucroOperacional = dreData.receitas - dreData.custos - dreData.despesas;

  const chartData = [
    { name: 'Receitas', valor: dreData.receitas },
    { name: 'Custos', valor: dreData.custos },
    { name: 'Despesas', valor: dreData.despesas },
    { name: 'Lucro', valor: lucroOperacional }
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">DRE Dashboard</h1>
        <input
          type="text"
          placeholder="Pesquisar..."
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Upload Files */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {['Extrato Bancário', 'Planilha de Vendas', 'Extrato do Cartão'].map((type) => (
          <div key={type} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">{type}</h3>
            <input
              type="file"
              accept=".csv,.pdf,.xlsx"
              onChange={(e) => handleFileUpload(e, type)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Receitas</h3>
          <p className="text-2xl">{formatCurrency(dreData.receitas)}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Custos</h3>
          <p className="text-2xl">{formatCurrency(dreData.custos)}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Despesas</h3>
          <p className="text-2xl">{formatCurrency(dreData.despesas)}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Lucro</h3>
          <p className="text-2xl">{formatCurrency(lucroOperacional)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Visualização</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}