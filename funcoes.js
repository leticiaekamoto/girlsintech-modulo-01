const dados = require("fs").readFileSync("pedidos.json", "utf-8");
let arquivo = JSON.parse(dados);
/**
 * trocar var para let. de preferencia não utilizar var,
 * os retornos dos regexs está sendo um array
 * as funções se repetem várias vezes, o ideal é construir algo para utilizar sempre que necessário.
 * podemos usar o exemplo abaixo
 */

const retornarEntitidade = (regex, arquivo) => {
  const entitidade = [];
  for (let i = 0; i < arquivo.length; i++) {
    let temporaria = {};
    const obj = arquivo[i];
    Object.keys(obj).forEach((key) => {
      if (regex.test(key)) {
        temporaria[key] = obj[key];
      }
    });
    entitidade.push(temporaria);
  }
  return entitidade;
};

let itens = [];
const regex = /(item_.)/;
for (let i = 0; i < arquivo.length; i++) {
  var obj = Object.entries(arquivo[i]);
  obj.map((key) => {
    if (regex.test(key)) {
      let item = key.join();
      itens.push(item);
    }
  });
}
const items = retornarEntitidade(regex, arquivo);
// console.log(items);

let merchant = [];
const regex2 = /(merchant_.)/;
for (let i = 0; i < arquivo.length; i++) {
  var obj = Object.entries(arquivo[i]);
  obj.map((key) => {
    if (regex2.test(key)) {
      let merchantDados = key.join();
      merchant.push(merchantDados);
    }
  });
}

const merchants = retornarEntitidade(regex2, arquivo);

let customer = [];
const regex3 = /(customer_.)/;
for (let i = 0; i < arquivo.length; i++) {
  var obj = Object.entries(arquivo[i]);
  obj.map((key) => {
    if (regex3.test(key)) {
      let customerDados = key.join();
      customer.push(customerDados);
    }
  });
}

// funções puras (pesquisar) são funções que recebem um tipo e retorna o mesmo tipo, ou seja, recebe um numero e retorna numero
function totalPrice(indice) {
  let { item_quantity, item_unitPrice } = arquivo[indice];
  const totalPrice = item_quantity * item_unitPrice;
  const fixedTwo = totalPrice.toFixed(2);
  return parseFloat(fixedTwo);
}

function cartTotal(indice) {
  let { item_discount } = arquivo[indice];
  const cartTotal = totalPrice(indice) - item_discount;
  return cartTotal;
}

function paymentsValue1(indice) {
  let paymentsValue1 = cartTotal(indice) * 0.33;
  return paymentsValue1.toFixed(2);
}

function changeFor1(indice) {
  let { "payments_payment[1]_method": metodoPagamento1 } = arquivo[indice];
  if (metodoPagamento1 !== "CASH") {
    return 0;
  }
  pagamento1 = parseFloat(paymentsValue1(indice)) + parseFloat(paymentsValue1(indice) * 0.07);
  return pagamento1.toFixed(2);
}

function paymentsValue2(indice) {
  let paymentsValue2 = cartTotal(indice) * 0.67;
  return paymentsValue2.toFixed(2);
}

function changeFor2(indice) {
  let { "payments_payment[2]_method": metodoPagamento2 } = arquivo[indice];
  if (metodoPagamento2 === "CASH") {
    pagamento2 = parseFloat(paymentsValue2(indice)) + parseFloat(paymentsValue2(indice) * 0.11);
  } else {
    pagamento2 = 0;
  }
  return pagamento2.toFixed(2);
}

function totalInCash(indice) {
  let { "payments_payment[1]_method": metodoPagamento1 } = arquivo[indice];
  let { "payments_payment[2]_method": metodoPagamento2 } = arquivo[indice];
  let totalEmDinheiro = 0;
  if (metodoPagamento1 === "CASH") {
    totalEmDinheiro = totalEmDinheiro + parseFloat(paymentsValue1(indice));
  }
  if (metodoPagamento2 === "CASH") {
    totalEmDinheiro = totalEmDinheiro + parseFloat(paymentsValue2(indice));
  }
  return totalEmDinheiro;
}

function change(indice) {
  let troco = parseFloat(changeFor1(indice)) + parseFloat(changeFor2(indice)) - parseFloat(totalInCash(indice));
  return troco.toFixed(2);
}
