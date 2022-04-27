<h1 align="center">
    <img src="GirlsInTech.jpg">
</h1>

# Sobre 👩‍💻🧡
Projeto desenvolvido no **Programa de Estágio Girls in Tech** da Empresa *Quiq*, que tem por objetivo garantir o uso de lógica e entendimento do conteúdo estudado até o momento.

A proposta foi de remodelar o arquivo JSON recebido, que não utiliza boas práticas de estrutura de dados e gerar um novo arquivo a partir dela.

---

## Explicação da resolução 📝

### Bloco original 
```bash
    "item_id": 26551,
    "item_name": "Handcrafted Soft Tuna",
    "item_description": "withdrawal azure Handmade",
    "item_quantity": 45,
    "item_unitPrice": 7.244,
    "item_totalPrice": 325.98,
    "item_discount": 27.74
```

### Bloco reorganizado
```bach
    "item":{
        "id": 26551,
        "name": "Handcrafted Soft Tuna",
        "description": "withdrawal azure Handmade",
        "quantity": 45,
        "unitPrice": 7.244,
        "totalPrice": 325.98,
        "discount": 27.74
        }
```
Para uma melhor performance de execução e tornar o código mais limpo, dividi os atributos que se referiam a mesma propriedade, criando um objeto tendo como chave o nome do atributo e dentro dele os dados.


## Tecnologias Utilizadas 💻 

- [Node.js](https://nodejs.org/en/)

*Desenvolvido por Leticia Sayuri Ekamoto Lorentz*

