import React, { useState, useEffect } from 'react';
import './IMCCalculator.css';

const IMCCalculator = () => {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  // Calcula o IMC sempre que altura ou peso mudarem
  useEffect(() => {
    const calcularIMC = () => {
      const alturaMetros = parseFloat(altura) / 100;
      const pesoKg = parseFloat(peso);

      if (alturaMetros > 0 && pesoKg > 0) {
        const calculo = pesoKg / (alturaMetros * alturaMetros);
        const imcCalculado = calculo.toFixed(1);
        
        setImc(imcCalculado);
        definirClassificacao(imcCalculado);
      }
    };

    const definirClassificacao = (valorIMC) => {
      const imcNum = parseFloat(valorIMC);
      
      if (imcNum < 18.5) {
        setClassificacao('Abaixo do peso');
      } else if (imcNum < 25) {
        setClassificacao('Peso normal');
      } else if (imcNum < 30) {
        setClassificacao('Sobrepeso');
      } else if (imcNum < 35) {
        setClassificacao('Obesidade Grau I');
      } else if (imcNum < 40) {
        setClassificacao('Obesidade Grau II');
      } else {
        setClassificacao('Obesidade Grau III');
      }
    };

    if (altura && peso) {
      calcularIMC();
    } else {
      setImc(null);
      setClassificacao('');
    }
  }, [altura, peso]);

  const limparCampos = () => {
    setAltura('');
    setPeso('');
    setImc(null);
    setClassificacao('');
  };

  const handleAlturaChange = (e) => {
    setAltura(e.target.value);
  };

  const handlePesoChange = (e) => {
    setPeso(e.target.value);
  };

  const tabelaClassificacao = [
    { intervalo: 'Menor que 18,5', classificacao: 'Abaixo do peso' },
    { intervalo: '18,5 - 24,9', classificacao: 'Peso normal' },
    { intervalo: '25 - 29,9', classificacao: 'Sobrepeso' },
    { intervalo: '30 - 34,9', classificacao: 'Obesidade Grau I' },
    { intervalo: '35 - 39,9', classificacao: 'Obesidade Grau II' },
    { intervalo: 'Maior que 40', classificacao: 'Obesidade Grau III' }
  ];

  return (
    <div className="imc-calculator">
      <div className="calculator-card">
        <h1 className="calculator-title">Calculadora de IMC</h1>
        
        <div className="input-group">
          <label htmlFor="altura">Altura (cm)</label>
          <input
            type="number"
            id="altura"
            value={altura}
            onChange={handleAlturaChange}
            placeholder="Ex: 175"
            step="1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="peso">Peso (kg)</label>
          <input
            type="number"
            id="peso"
            value={peso}
            onChange={handlePesoChange}
            placeholder="Ex: 70"
            step="0.1"
          />
        </div>

        {imc && classificacao && (
          <div className="resultado">
            <div className="imc-value">
              <span className="label">Seu IMC:</span>
              <span className="value">{imc}</span>
            </div>
            <div className="classification">
              <span className="label">Classificação:</span>
              <span className={`value ${classificacao.toLowerCase().replace(/ /g, '-')}`}>
                {classificacao}
              </span>
            </div>
          </div>
        )}

        <div className="button-group">
          <button 
            className="btn-clear" 
            onClick={limparCampos}
            type="button"
          >
            Limpar
          </button>
        </div>

        <div className="tabela-container">
          <h3 className="tabela-title">Tabela de Classificação</h3>
          <div className="tabela">
            <div className="tabela-header">
              <span>IMC</span>
              <span>Classificação</span>
            </div>
            {tabelaClassificacao.map((item, index) => (
              <div 
                key={index} 
                className={`tabela-row ${
                  classificacao === item.classificacao ? 'destaque' : ''
                }`}
              >
                <span>{item.intervalo}</span>
                <span>{item.classificacao}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IMCCalculator;