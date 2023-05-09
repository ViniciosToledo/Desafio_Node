const POTENCIA_PAINEL = 550; // Potência do painel em Watts
const COMPRIMENTO_PAINEL = 1.95; // Comprimento do painel em metros
const LARGURA_PAINEL = 1.1; // Largura do painel em metros
const MAXIMO_PLACAS_POR_INVERSOR = 4; // Máximo de placas que podem ser conectadas a um inversor

function calcularSistema(potenciaTotal) {
  
  const potenciaPorPlaca = POTENCIA_PAINEL / 1000; // Potência por placa em KW
  const quantidadePlacas = Math.ceil(potenciaTotal / potenciaPorPlaca); // Quantidade de placas necessárias
  const quantidadeInversores = Math.ceil(quantidadePlacas / MAXIMO_PLACAS_POR_INVERSOR); // Quantidade de inversores necessários
  const comprimentoEstrutura = quantidadePlacas * COMPRIMENTO_PAINEL; // Comprimento da estrutura necessária
  const areaUtil = quantidadePlacas * COMPRIMENTO_PAINEL * LARGURA_PAINEL; // Área útil necessária

  return {
    quantidadePlacas,
    quantidadeInversores,
    potenciaPainel: POTENCIA_PAINEL,
    comprimentoEstrutura,
    areaUtil
  };
}

try {
  
  const potenciaTotal = Number(process.argv[2]); // Potência total do sistema em kW passada como parâmetro
  
  if (!potenciaTotal || isNaN(potenciaTotal) || potenciaTotal <= 0) {
    console.error('Potência total inválida. Informe um valor numérico maior que zero.');
    process.exit(1);
  }

  const resultado = calcularSistema(potenciaTotal);

  console.log(`Para uma potência total de ${potenciaTotal} KW, são necessários:`);
  console.log(`${resultado.quantidadePlacas} placas`);
  console.log(`${resultado.quantidadeInversores} inversores`);
  console.log(`Painéis de ${resultado.potenciaPainel} W`);
  console.log(`Comprimento de estrutura de ${resultado.comprimentoEstrutura.toFixed(2)} m`);
  console.log(`Área útil de ${resultado.areaUtil.toFixed(2)} m²`);
} catch (e) {
  console.error(e.message);
}

