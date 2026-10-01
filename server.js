//1.Importando o framework e iniciando a aplicação
const express = require ('express');
const app = express();
process.env.PORT || 3000;


//2. Avisando ao Express onde estão os arquivos visuais (HTML/CSS)
//Isso faz o servidor entregar a interface automaticamente
app.use(express.static('public'));

//3. Nosso Banco de Dados Simulado (A Cozinha)
const cardapioDb = [
{ id: 1, nome: "X-Burger Clássico", categoria: "Lanche", preco: 25.50 },
{ id: 2, nome: "Batata Frita", categoria: "Acompanhamento", preco: 12.00 },
{ id: 3, nome: "Suco de Laranja", categoria: "Bebida", preco: 10.00 }
];

// Permite que o Node.js compreenda requisições no formato JSON
app.use(express.json());

//4. Nossa Rota API (O Garçom)
//Quando o front-end pedir os dados, o Node devolve esta lista em formato JSON
app.get('/api/cardapio', (req, res) => {
console.log("A API foi chamada! Enviando o cardápio completo...");
res.json(cardapioDb);
});

//Rota para bebidas
app.get('/api/cardapio/bebidas', (req, res) => {
  console.log("A API de bebidas foi chamada! Filtrando apenas bebidas...");
  const bebidas = cardapioDb.filter(item => item.categoria === 'Bebida');
  res.json(bebidas);
});

// Rota para RECEBER dados e salvar no sistema
app.post('/api/cardapio', (req, res) => {
    const dadosRecebidos = req.body;
    
    const novoItem = {
        id: cardapioDb.length + 1,
        nome: dadosRecebidos.nome,
        categoria: dadosRecebidos.categoria,
        preco: dadosRecebidos.preco
    };
    
    cardapioDb.push(novoItem); // Salva na lista
    
    console.log("Novo produto cadastrado:", novoItem.nome);
    res.status(201).json({ mensagem: "Sucesso", produto: novoItem });
});

app.listen(port, () => {
console.log(`✅ Servidor rodando perfeitamente na porta ${port}!`);
console.log(`👉 Acesse no navegador: http://localhost:${port}`);
});


