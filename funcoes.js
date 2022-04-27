const dados = require('fs').readFileSync('pedidos.json', 'utf-8')
let arquivo = JSON.parse(dados)

let itens = []
const regex = /(item_.)/;
for(let i = 0; i<arquivo.length;i++){
    let obj = Object.entries(arquivo[i])
        obj.map(key => {
        if(regex.test(key)){
            let item = key.join()
            itens.push(item)               
       } 
    })  
}

let merchant = []
const regex2 = /(merchant_.)/;
for(let i = 0; i<arquivo.length;i++){
    let obj = Object.entries(arquivo[i])
        obj.map(key => {
        if(regex2.test(key)){
            let merchantDados = key.join()
            merchant.push(merchantDados)               
       } 
    })  
}

let customer = []
const regex3 = /(customer_.)/;
for(let i = 0; i<arquivo.length;i++){
    let obj = Object.entries(arquivo[i])
        obj.map(key => {
        if(regex3.test(key)){
            let customerDados = key.join()
            customer.push(customerDados)               
       } 
    })  
}

function totalPrice(indice){  
    let {item_quantity, item_unitPrice} = arquivo[indice]
    const totalPrice = item_quantity * item_unitPrice
    return totalPrice.toFixed(2)   
}

function cartTotal(indice){
    let {item_discount} = arquivo[indice]
    const cartTotal = totalPrice(indice) - item_discount
    return cartTotal
}

function paymentsValue1(indice){
    let paymentsValue1 = cartTotal(indice)*0.33
    return paymentsValue1.toFixed(2)
}

function changeFor1(indice){
    let {'payments_payment[1]_method': metodoPagamento1} = arquivo[indice]
    
    if (metodoPagamento1 === "CASH"){
        pagamento1 = parseFloat(paymentsValue1(indice)) + parseFloat(paymentsValue1(indice)*0.07)
        
    }else{
        pagamento1 = 0
    }
    return pagamento1.toFixed(2)
}

function paymentsValue2(indice){
    let paymentsValue2 = cartTotal(indice)*0.67
    return paymentsValue2.toFixed(2)
}

function changeFor2(indice){
    let {'payments_payment[2]_method': metodoPagamento2} = arquivo[indice]
    if (metodoPagamento2 === "CASH"){
        pagamento2 = parseFloat(paymentsValue2(indice)) + parseFloat(paymentsValue2(indice)*0.11)
    }else{
        pagamento2 = 0
    }
    return pagamento2.toFixed(2)
}

function totalInCash(indice){
    let {'payments_payment[1]_method': metodoPagamento1} = arquivo[indice]
    let {'payments_payment[2]_method': metodoPagamento2} = arquivo[indice]
    let totalEmDinheiro = 0
    if(metodoPagamento1 === "CASH"){
        totalEmDinheiro = totalEmDinheiro + parseFloat(paymentsValue1(indice))
    }
    if(metodoPagamento2 ==="CASH"){
        totalEmDinheiro = totalEmDinheiro + parseFloat(paymentsValue2(indice))
    }
    return totalEmDinheiro
}

function change(indice){
    let troco = parseFloat(changeFor1(indice)) + parseFloat(changeFor2(indice)) - (parseFloat(totalInCash(indice)))
    return troco.toFixed(2)
}

console.log(itens)