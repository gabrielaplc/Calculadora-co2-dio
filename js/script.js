/**
 * script.js - Arquivo principal da calculadora de CO2 simplificada em Português
 */

const CONFIGURACAO = {
    FATORES_EMISSAO: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },
    MODOS_TRANSPORTE: {
        bicycle: { nome: "Bicicleta", icone: "🚲" },
        car: { nome: "Carro", icone: "🚗" },
        bus: { nome: "Ônibus", icone: "🚌" },
        truck: { nome: "Caminhão", icone: "🚚" }
    },
    CREDITO_CARBONO: {
        KG_POR_CREDITO: 1000,
        PRECO_MEDIO_BRL: 100 
    }
};

const BANCO_ROTAS = [
    { origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", distanciaKm: 430 },
    { origem: "São Paulo, SP", destino: "Brasília, DF", distanciaKm: 1015 },
    { origem: "Rio de Janeiro, RJ", destino: "Brasília, DF", distanciaKm: 1148 },
    { origem: "São Paulo, SP", destino: "Belo Horizonte, MG", distanciaKm: 586 },
    { origem: "Rio de Janeiro, RJ", destino: "Belo Horizonte, MG", distanciaKm: 434 },
    { origem: "São Paulo, SP", destino: "Curitiba, PR", distanciaKm: 408 },
    { origem: "São Paulo, SP", destino: "Porto Alegre, RS", distanciaKm: 1120 },
    { origem: "São Paulo, SP", destino: "Salvador, BA", distanciaKm: 1962 },
    { origem: "São Paulo, SP", destino: "Recife, PE", distanciaKm: 2660 },
    { origem: "São Paulo, SP", destino: "Fortaleza, CE", distanciaKm: 3120 },
    { origem: "Rio de Janeiro, RJ", destino: "Salvador, BA", distanciaKm: 1650 },
    { origem: "Brasília, DF", destino: "Goiânia, GO", distanciaKm: 209 },
    { origem: "Curitiba, PR", destino: "Florianópolis, SC", distanciaKm: 300 },
    { origem: "Curitiba, PR", destino: "Porto Alegre, RS", distanciaKm: 711 },
    { origem: "Florianópolis, SC", destino: "Porto Alegre, RS", distanciaKm: 476 },
    { origem: "Salvador, BA", destino: "Recife, PE", distanciaKm: 839 },
    { origem: "Recife, PE", destino: "Fortaleza, CE", distanciaKm: 800 },
    { origem: "Fortaleza, CE", destino: "Natal, RN", distanciaKm: 537 },
    { origem: "Belo Horizonte, MG", destino: "Brasília, DF", distanciaKm: 741 },
    { origem: "Manaus, AM", destino: "Brasília, DF", distanciaKm: 3490 },
    // Adicionando novas 50 rotas (Cidades de SP e conexões solicitadas)
    { origem: "São Paulo, SP", destino: "Campinas, SP", distanciaKm: 93 },
    { origem: "São Paulo, SP", destino: "Atibaia, SP", distanciaKm: 65 },
    { origem: "São Paulo, SP", destino: "Bragança Paulista, SP", distanciaKm: 85 },
    { origem: "Campinas, SP", destino: "Atibaia, SP", distanciaKm: 60 },
    { origem: "Atibaia, SP", destino: "Bragança Paulista, SP", distanciaKm: 25 },
    { origem: "Campinas, SP", destino: "Bragança Paulista, SP", distanciaKm: 65 },
    { origem: "São Paulo, SP", destino: "Santos, SP", distanciaKm: 72 },
    { origem: "São Paulo, SP", destino: "Guarujá, SP", distanciaKm: 84 },
    { origem: "São Paulo, SP", destino: "São José dos Campos, SP", distanciaKm: 91 },
    { origem: "São Paulo, SP", destino: "Ribeirão Preto, SP", distanciaKm: 315 },
    { origem: "São Paulo, SP", destino: "Sorocaba, SP", distanciaKm: 100 },
    { origem: "São Paulo, SP", destino: "Bauru, SP", distanciaKm: 330 },
    { origem: "São Paulo, SP", destino: "Piracicaba, SP", distanciaKm: 152 },
    { origem: "São Paulo, SP", destino: "Franca, SP", distanciaKm: 400 },
    { origem: "São Paulo, SP", destino: "São José do Rio Preto, SP", distanciaKm: 440 },
    { origem: "São Paulo, SP", destino: "Taubaté, SP", distanciaKm: 130 },
    { origem: "São Paulo, SP", destino: "Jundiaí, SP", distanciaKm: 57 },
    { origem: "São Paulo, SP", destino: "Americana, SP", distanciaKm: 126 },
    { origem: "São Paulo, SP", destino: "Limeira, SP", distanciaKm: 150 },
    { origem: "São Paulo, SP", destino: "Araraquara, SP", distanciaKm: 270 },
    { origem: "São Paulo, SP", destino: "São Carlos, SP", distanciaKm: 230 },
    { origem: "São Paulo, SP", destino: "Marília, SP", distanciaKm: 435 },
    { origem: "São Paulo, SP", destino: "Presidente Prudente, SP", distanciaKm: 558 },
    { origem: "São Paulo, SP", destino: "Araçatuba, SP", distanciaKm: 520 },
    { origem: "São Paulo, SP", destino: "Itapetininga, SP", distanciaKm: 170 },
    { origem: "São Paulo, SP", destino: "Rio Claro, SP", distanciaKm: 175 },
    { origem: "São Paulo, SP", destino: "Ubatuba, SP", distanciaKm: 225 },
    { origem: "São Paulo, SP", destino: "São Sebastião, SP", distanciaKm: 200 },
    { origem: "São Paulo, SP", destino: "Ilhabela, SP", distanciaKm: 210 },
    { origem: "São Paulo, SP", destino: "Caraguatatuba, SP", distanciaKm: 175 },
    { origem: "São Paulo, SP", destino: "Bertioga, SP", distanciaKm: 110 },
    { origem: "São Paulo, SP", destino: "Peruíbe, SP", distanciaKm: 140 },
    { origem: "São Paulo, SP", destino: "Itanhaém, SP", distanciaKm: 110 },
    { origem: "São Paulo, SP", destino: "Praia Grande, SP", distanciaKm: 75 },
    { origem: "São Paulo, SP", destino: "São Vicente, SP", distanciaKm: 70 },
    { origem: "São Paulo, SP", destino: "Mongaguá, SP", distanciaKm: 90 },
    { origem: "São Paulo, SP", destino: "Cajamar, SP", distanciaKm: 40 },
    { origem: "São Paulo, SP", destino: "Cotia, SP", distanciaKm: 30 },
    { origem: "São Paulo, SP", destino: "Osasco, SP", distanciaKm: 15 },
    { origem: "São Paulo, SP", destino: "Guarulhos, SP", distanciaKm: 15 },
    { origem: "São Paulo, SP", destino: "Santo André, SP", distanciaKm: 20 },
    { origem: "São Paulo, SP", destino: "São Bernardo do Campo, SP", distanciaKm: 20 },
    { origem: "São Paulo, SP", destino: "São Caetano do Sul, SP", distanciaKm: 15 },
    { origem: "São Paulo, SP", destino: "Diadema, SP", distanciaKm: 20 },
    { origem: "São Paulo, SP", destino: "Mauá, SP", distanciaKm: 25 },
    { origem: "São Paulo, SP", destino: "Mogi das Cruzes, SP", distanciaKm: 60 },
    { origem: "São Paulo, SP", destino: "Suzano, SP", distanciaKm: 50 },
    { origem: "São Paulo, SP", destino: "Jacareí, SP", distanciaKm: 80 },
    { origem: "São Paulo, SP", destino: "Pindamonhangaba, SP", distanciaKm: 150 },
    { origem: "São Paulo, SP", destino: "Guaratinguetá, SP", distanciaKm: 170 },
    { origem: "São Paulo, SP", destino: "Lorena, SP", distanciaKm: 180 }
];

function formatarNumero(numero, decimais = 2) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function buscarCidades() {
    const cidadesSet = new Set();
    BANCO_ROTAS.forEach(rota => {
        cidadesSet.add(rota.origem);
        cidadesSet.add(rota.destino);
    });
    return Array.from(cidadesSet).sort();
}

function acharDistancia(origem, destino) {
    const origemNorm = origem.trim().toLowerCase();
    const destNorm = destino.trim().toLowerCase();
    
    const rota = BANCO_ROTAS.find(r => {
        const rOrig = r.origem.toLowerCase();
        const rDest = r.destino.toLowerCase();
        return (rOrig === origemNorm && rDest === destNorm) || (rOrig === destNorm && rDest === origemNorm);
    });
    
    return rota ? rota.distanciaKm : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputOrigem = document.getElementById('origin');
    const inputDestino = document.getElementById('destination');
    const inputDistancia = document.getElementById('distance');
    const chkDistanciaManual = document.getElementById('manual-distance');
    const form = document.getElementById('calculator-form');
    const listaCidades = document.getElementById('cities-list');
    
    // Preencher datalist
    const cidades = buscarCidades();
    cidades.forEach(cidade => {
        const opcao = document.createElement('option');
        opcao.value = cidade;
        listaCidades.appendChild(opcao);
    });
    
    // Autocompletar distância
    function tentarPreencherDistancia() {
        if (!chkDistanciaManual.checked && inputOrigem.value && inputDestino.value) {
            const dist = acharDistancia(inputOrigem.value, inputDestino.value);
            if (dist !== null) {
                inputDistancia.value = dist;
                inputDistancia.readOnly = true;
            } else {
                inputDistancia.value = '';
                inputDistancia.readOnly = false;
            }
        }
    }
    
    inputOrigem.addEventListener('change', tentarPreencherDistancia);
    inputDestino.addEventListener('change', tentarPreencherDistancia);
    
    chkDistanciaManual.addEventListener('change', (e) => {
        inputDistancia.readOnly = !e.target.checked;
        if (!e.target.checked) tentarPreencherDistancia();
    });
    
    // Submeter formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const distancia = parseFloat(inputDistancia.value);
        const transporteInput = document.querySelector('input[name="transport"]:checked');
        const modo = transporteInput ? transporteInput.value : null;
        
        if (!distancia || distancia <= 0 || !modo) {
            alert('Por favor, preencha a distância e selecione um meio de transporte válido.');
            return;
        }

        const botaoSubmit = form.querySelector('.form-submit');
        botaoSubmit.disabled = true;
        botaoSubmit.innerHTML = 'Calculando...';
        
        setTimeout(() => {
            const fatorEmissao = CONFIGURACAO.FATORES_EMISSAO[modo];
            const emissao = distancia * fatorEmissao;
            
            const emissaoCarro = distancia * CONFIGURACAO.FATORES_EMISSAO.car;
            const economiaKg = emissaoCarro - emissao;
            const economiaPercentual = emissaoCarro > 0 ? (economiaKg / emissaoCarro) * 100 : 0;
            
            const creditos = emissao / CONFIGURACAO.CREDITO_CARBONO.KG_POR_CREDITO;
            const custoCreditos = creditos * CONFIGURACAO.CREDITO_CARBONO.PRECO_MEDIO_BRL;
            
            exibirResultados({
                origem: inputOrigem.value || 'Local Origem',
                destino: inputDestino.value || 'Local Destino',
                distancia,
                modo,
                emissao,
                economiaKg,
                economiaPercentual,
                creditos,
                custoCreditos
            });

            botaoSubmit.disabled = false;
            botaoSubmit.innerHTML = 'Calcular Emissão';
        }, 800);
    });
    
    function exibirResultados(dados) {
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('comparison').classList.remove('hidden');
        document.getElementById('carbon-credits').classList.remove('hidden');
        
        const dadosModo = CONFIGURACAO.MODOS_TRANSPORTE[dados.modo];
        
        // Renderizar Resultados Principais
        let htmlResultados = `
            <h2 class="section-title">Resultados da Emissão</h2>
            <div class="results__grid">
                <div class="results__card">
                    <div class="results__card-icon">🗺️</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Rota</h3>
                        <p class="results__card-value">${dados.origem} → ${dados.destino}</p>
                    </div>
                </div>
                <div class="results__card">
                    <div class="results__card-icon">📏</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Distância</h3>
                        <p class="results__card-value">${formatarNumero(dados.distancia, 0)} km</p>
                    </div>
                </div>
                <div class="results__card results__card--highlight">
                    <div class="results__card-icon">🌿</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Emissão de CO₂</h3>
                        <p class="results__card-value results__card-value--large">${formatarNumero(dados.emissao)} kg</p>
                    </div>
                </div>
                <div class="results__card">
                    <div class="results__card-icon">${dadosModo.icone}</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Meio de Transporte</h3>
                        <p class="results__card-value">${dadosModo.nome}</p>
                    </div>
                </div>
        `;
        
        if (dados.modo !== 'car' && dados.economiaKg > 0) {
            htmlResultados += `
                <div class="results__card results__card--success">
                    <div class="results__card-icon">✅</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Economia vs Carro</h3>
                        <p class="results__card-value">${formatarNumero(dados.economiaKg)} kg</p>
                        <p class="results__card-subtitle">${formatarNumero(dados.economiaPercentual)}% menos emissões</p>
                    </div>
                </div>
            `;
        }
        htmlResultados += '</div>';
        document.getElementById('results-content').innerHTML = htmlResultados;
        
        // Renderizar Comparação
        const maxEmissao = Math.max(...Object.values(CONFIGURACAO.FATORES_EMISSAO).map(f => f * dados.distancia));
        
        let htmlComparacao = `
            <h2 class="section-title">Comparação entre Meios de Transporte</h2>
            <div class="comparison__grid">
        `;
        
        Object.keys(CONFIGURACAO.FATORES_EMISSAO).forEach(modoKey => {
            const emissaoModo = dados.distancia * CONFIGURACAO.FATORES_EMISSAO[modoKey];
            const metaModo = CONFIGURACAO.MODOS_TRANSPORTE[modoKey];
            const isSelected = modoKey === dados.modo;
            const barWidth = maxEmissao > 0 ? (emissaoModo / maxEmissao) * 100 : 0;
            
            const emissaoCarroBase = dados.distancia * CONFIGURACAO.FATORES_EMISSAO.car;
            const percentualVsCarro = emissaoCarroBase > 0 ? (emissaoModo / emissaoCarroBase) * 100 : 0;
            
            let color = '#10b981';
            if (percentualVsCarro > 25 && percentualVsCarro <= 75) color = '#f59e0b';
            else if (percentualVsCarro > 75 && percentualVsCarro <= 100) color = '#fb923c';
            else if (percentualVsCarro > 100) color = '#ef4444';
            
            htmlComparacao += `
                <div class="comparison__item${isSelected ? ' comparison__item--selected' : ''}">
                    <div class="comparison__header">
                        <span class="comparison__icon">${metaModo.icone}</span>
                        <span class="comparison__label">${metaModo.nome}</span>
                        ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
                    </div>
                    <div class="comparison__stats">
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">Emissão</span>
                            <span class="comparison__stat-value">${formatarNumero(emissaoModo)} kg CO₂</span>
                        </div>
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">vs Carro</span>
                            <span class="comparison__stat-value">${formatarNumero(percentualVsCarro)}%</span>
                        </div>
                    </div>
                    <div class="comparison__bar-container">
                        <div class="comparison__bar" style="width: ${barWidth}%; background-color: ${color};"></div>
                    </div>
                </div>
            `;
        });
        
        htmlComparacao += `</div>
            <div class="comparison__tip">
                <span class="comparison__tip-icon">💡</span>
                <p class="comparison__tip-text"><strong>Dica:</strong> Escolher meios de transporte mais sustentáveis ajuda a reduzir significativamente as emissões de CO₂!</p>
            </div>`;
        document.getElementById('comparison-content').innerHTML = htmlComparacao;
        
        // Renderizar Créditos
        document.getElementById('carbon-credits-content').innerHTML = `
            <h2 class="section-title">Créditos de Carbono</h2>
            <div class="carbon-credits__grid">
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-header">
                        <span class="carbon-credits__icon">🌳</span>
                        <h3 class="carbon-credits__card-title">Créditos Necessários</h3>
                    </div>
                    <div class="carbon-credits__card-body">
                        <p class="carbon-credits__value">${formatarNumero(dados.creditos, 4)}</p>
                        <p class="carbon-credits__helper">1 crédito = 1.000 kg CO₂</p>
                    </div>
                </div>
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-header">
                        <span class="carbon-credits__icon">💰</span>
                        <h3 class="carbon-credits__card-title">Custo Estimado</h3>
                    </div>
                    <div class="carbon-credits__card-body">
                        <p class="carbon-credits__value">${formatarMoeda(dados.custoCreditos)}</p>
                        <p class="carbon-credits__helper">Preço base de R$ 100/crédito</p>
                    </div>
                </div>
            </div>
            <div class="carbon-credits__info">
                <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
                <p class="carbon-credits__info-text">Créditos de carbono são certificados que representam a redução de uma tonelada de CO₂ da atmosfera. Ao comprar créditos, você compensa suas emissões financiando projetos ambientais.</p>
            </div>
        `;
        
        document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
