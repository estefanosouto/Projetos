function carregarEstoque() {
    const tbody = document.getElementById('estoque-itens');
    tbody.innerHTML = '';
    
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td class="${produto.quantidade < 10 ? 'estoque-baixo' : ''}">${produto.quantidade}</td>
            <td>${formatarData(produto.validade)}</td>
            <td>
                <button onclick="editarProduto(${produto.id})">Editar</button>
                <button onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function formatarData(dataString) {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

function abrirModalCadastro() {
    document.getElementById('modal-titulo').textContent = 'Novo Produto';
    document.getElementById('form-produto').reset();
    document.getElementById('produto-id').value = '';
    document.getElementById('modal-produto').style.display = 'block';
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;
    
    document.getElementById('modal-titulo').textContent = 'Editar Produto';
    document.getElementById('produto-id').value = produto.id;
    document.getElementById('produto-codigo').value = produto.codigo;
    document.getElementById('produto-nome').value = produto.nome;
    document.getElementById('produto-descricao').value = produto.descricao;
    document.getElementById('produto-preco').value = produto.preco;
    document.getElementById('produto-quantidade').value = produto.quantidade;
    document.getElementById('produto-validade').value = produto.validade;
    
    document.getElementById('modal-produto').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal-produto').style.display = 'none';
}

function salvarProduto() {
    const id = document.getElementById('produto-id').value;
    const produto = {
        codigo: document.getElementById('produto-codigo').value,
        nome: document.getElementById('produto-nome').value,
        descricao: document.getElementById('produto-descricao').value,
        preco: parseFloat(document.getElementById('produto-preco').value),
        quantidade: parseInt(document.getElementById('produto-quantidade').value),
        validade: document.getElementById('produto-validade').value
    };
    
    if (id) {
        // Edição
        produto.id = parseInt(id);
        const index = produtos.findIndex(p => p.id === produto.id);
        produtos[index] = produto;
    } else {
        // Novo
        produto.id = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        produtos.push(produto);
    }
    
    carregarEstoque();
    fecharModal();
}

function excluirProduto(id) {
    if (confirm('Deseja realmente excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        carregarEstoque();
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarEstoque();
    
    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        const modal = document.getElementById('modal-produto');
        if (event.target === modal) {
            fecharModal();
        }
    }
});