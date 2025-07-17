let carrinho = [];

function buscarProduto() {
    const codigo = document.getElementById('codigo-barra').value;
    const produto = produtos.find(p => p.codigo === codigo);
    
    if (produto) {
        document.getElementById('produto-nome').textContent = produto.nome;
        document.getElementById('produto-preco').textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
        document.getElementById('produto-estoque').textContent = `Estoque: ${produto.quantidade}`;
    } else {
        alert('Produto não encontrado!');
    }
}

function adicionarAoCarrinho() {
    const codigo = document.getElementById('codigo-barra').value;
    const quantidade = parseInt(document.getElementById('produto-quantidade').value);
    const produto = produtos.find(p => p.codigo === codigo);
    
    if (!produto) {
        alert('Produto não encontrado!');
        return;
    }
    
    if (quantidade > produto.quantidade) {
        alert('Quantidade indisponível em estoque!');
        return;
    }
    
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.codigo === codigo);
    
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            id: produto.id,
            codigo: produto.codigo,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidade
        });
    }
    
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const tbody = document.getElementById('carrinho-itens');
    tbody.innerHTML = '';
    
    let total = 0;
    
    carrinho.forEach(item => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            <td><button onclick="removerItem('${item.codigo}')">Remover</button></td>
        `;
        
        tbody.appendChild(tr);
        total += item.preco * item.quantidade;
    });
    
    document.getElementById('total-venda').textContent = total.toFixed(2);
}

function removerItem(codigo) {
    carrinho = carrinho.filter(item => item.codigo !== codigo);
    atualizarCarrinho();
}

function finalizarVenda() {
    if (carrinho.length === 0) {
        alert('Nenhum item no carrinho!');
        return;
    }
    
    // Atualizar estoque
    carrinho.forEach(item => {
        const produto = produtos.find(p => p.codigo === item.codigo);
        produto.quantidade -= item.quantidade;
    });
    
    // Registrar venda (em produção, salvar no banco de dados)
    const venda = {
        data: new Date().toISOString(),
        itens: carrinho,
        total: document.getElementById('total-venda').textContent
    };
    
    alert(`Venda finalizada com sucesso! Total: R$ ${venda.total}`);
    carrinho = [];
    atualizarCarrinho();
    document.getElementById('codigo-barra').value = '';
}

function cancelarVenda() {
    if (confirm('Deseja cancelar esta venda?')) {
        carrinho = [];
        atualizarCarrinho();
    }
}