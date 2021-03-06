"use strict";

const ccxt = require ('ccxt');
const checkArb = require('./check-arb');

// Taker
// const costs = {
//  foxbit : 0.005,
//  mercado : 0.007,
//  flowbtc : 0.0035
// }

// Maker
// const costs = {
// 	foxbit : 0.0025,
// 	mercado : 0.003,
// 	flowbtc : 0.0035
// }

// Repositorio das moedas: https://github.com/ccxt/ccxt
// API BINANCE https://api.binance.com/api/v3/ticker/price

// Colocar COINNEST

async function fetchDataNegocieCoins() {

    const negociecoins = new ccxt.negociecoins ();

    const market = await negociecoins.fetchTicker('BTC/BRL');

    return {
        name: 'negociecoins',
        cost: 0.005,
        bid: market.bid,
        ask: market.ask
    };
};

async function fetchDataBleuTrade() {

    const bleutrade = new ccxt.bleutrade ();

    const market = await bleutrade.fetchTicker('ETH/BTC');

    return {
        name: 'bleutrade',
        cost: 0.005,
        bid: market.bid,
        ask: market.ask
    };
};

async function fetchDataFoxBit() {

  const foxbit = new ccxt.foxbit ();

  const market = await foxbit.fetchTicker('BTC/BRL');

  return {
      name: 'foxbit',
      cost: 0.005,
      bid: market.bid,
      ask: market.ask
  };
};

async function fetchDataBraziliex() {

    const braziliex = new ccxt.foxbit ();

    const market = await braziliex.fetchTicker('BTC/BRL');

    return {
        name: 'braziliex',
        cost: 0.005,
        bid: market.bid,
        ask: market.ask
    };
};

async function fetchDataMercadoBitcoin() {

  const mercado = new ccxt.mercado();

  const market = await mercado.fetchTicker('BTC/BRL');

  return {
      name: 'mercado bitcoin',
      cost: 0.007,
      bid: market.bid,
      ask: market.ask
  };
};

async function fetchDataFlowBTC() {

  const flowbtc = new ccxt.flowbtc();

  const market = await flowbtc.fetchTicker('BTC/BRL');

  return {
      name: 'flowbtc',
      cost: 0.0035,
      bid: market.bid,
      ask: market.ask
  };
};

async function fetchData() {

    console.log('Procurando oportunidades....');

    try {

        // const dataFoxBit = await fetchDataFoxBit();
        // const dataMercadoBitcoin = await fetchDataMercadoBitcoin();
        // const dataBraziliex = await fetchDataBraziliex();
        // const dataNegocieCoins = await fetchDataNegocieCoins();
        //const dataFlowBTC = await fetchDataFlowBTC();

        Promise.all([
            // await fetchDataFoxBit(),
            await fetchDataMercadoBitcoin(),
            //await fetchDataFlowBTC(),
            await fetchDataBraziliex(),
            await fetchDataNegocieCoins(),
            //await fetchDataBleuTrade() //ETH/BTC
          ])
          .then((response) => {
              checkArb(response);
              console.log('')
              console.log('Aguardando 1 minuto para procurar oportunidade novamente.')
              console.log('')
              setTimeout(fetchData, 60000);
          })
          .catch((err)=> {
              console.error(`Erro: ${err.message}`);
              console.log('')
              console.log('Aguardando 1 minuto para procurar oportunidade novamente.')
              console.log('')
              setTimeout(fetchData, 60000);
          });
    }

    catch (err) {
        console.error(err.message);
        setTimeout(fetchData, 60000);
    }
    
}

fetchData();