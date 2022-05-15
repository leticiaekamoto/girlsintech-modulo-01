const dados = require('fs').readFileSync('pedidos.json', 'utf-8');
let arquivo = JSON.parse(dados);

const regexItem = /(item_.)/;
const regexMerchant = /(merchant_.)/;
const regexCustomer = /(customer_.)/;

function retornarEntidade(regex, arquivo){
    const entidade = [];
    for(let i = 0; i<arquivo.length;i++){
        let obj = arquivo[i];
        let temporaria = {};
        Object.keys(obj).forEach(key => {
            if(regex.test(key)){
                temporaria[key] = obj[key]
            };
        });
        entidade.push(temporaria);
    }
    return entidade;
}

const itens = retornarEntidade(regexItem, arquivo);
const merchant = retornarEntidade(regexMerchant, arquivo);
const customer = retornarEntidade(regexCustomer, arquivo);

function totalPrice(indice){  
    let {item_quantity, item_unitPrice} = arquivo[indice];
    let totalPrice = (item_quantity * item_unitPrice).toFixed(2);
    totalPrice = parseFloat(totalPrice);
    return totalPrice;
}

function cartTotal(indice){
    let {item_discount} = arquivo[indice];
    const cartTotal = totalPrice(indice) - item_discount;
    return cartTotal;
}

function paymentsValue1(indice){
    let paymentsValue1 = (cartTotal(indice)*0.33).toFixed(2);
    paymentsValue1 = parseFloat(paymentsValue1);
    return paymentsValue1;
}

function changeFor1(indice){
    let {'payments_payment[1]_method': metodoPagamento1} = arquivo[indice];
    
    if (metodoPagamento1 === "CASH"){
        pagamento1 = (paymentsValue1(indice) + (paymentsValue1(indice)*0.07)).toFixed(2);
        pagamento1 = parseFloat(pagamento1);
    }else{
        pagamento1 = 0;
    }
    return pagamento1;
}


function paymentsValue2(indice){
    let paymentsValue2 = (cartTotal(indice)*0.67).toFixed(2);
    paymentsValue2 = parseFloat(paymentsValue2);
    return paymentsValue2;
}

function changeFor2(indice){
    let {'payments_payment[2]_method': metodoPagamento2} = arquivo[indice];
    if (metodoPagamento2 === "CASH"){
        pagamento2 = (paymentsValue2(indice) + paymentsValue2(indice)*0.11).toFixed(2);
        pagamento2 = parseFloat(pagamento2);
    }else{
        pagamento2 = 0;
    }
    return pagamento2;
}

function totalInCash(indice){
    let {'payments_payment[1]_method': metodoPagamento1} = arquivo[indice];
    let {'payments_payment[2]_method': metodoPagamento2} = arquivo[indice];
    let totalEmDinheiro = 0;
    if(metodoPagamento1 === "CASH"){
        totalEmDinheiro = totalEmDinheiro + paymentsValue1(indice);
    }
    if(metodoPagamento2 ==="CASH"){
        totalEmDinheiro = totalEmDinheiro + paymentsValue2(indice);
    }
    return totalEmDinheiro;
}

function change(indice){
    let troco = (changeFor1(indice) + changeFor2(indice) - (totalInCash(indice))).toFixed(2);
    troco = parseFloat(troco);
    return troco
}

