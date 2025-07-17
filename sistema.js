// Armazenamento simulado (em produção, substituir por banco de dados real)
let produtos = [
    {
        id: 1,
        codigo: '7891234567890',
        nome: 'Dipirona 500mg',
        descricao: 'Analgésico e antitérmico',
        preco: 8.50,
        quantidade: 100,
        validade: '2024-12-31'
    },
    // ... outros produtos
];

// Função para carregar alertas de estoque baixo
function carregarAlertas() {
    const alertas = produtos.filter(p => p.quantidade < 10);
    const alertasElement = document.getElementById('alertas');
    
    if (alertas.length === 0) {
        alertasElement.innerHTML = 'Nenhum alerta de estoque baixo';
    } else {
        alertasElement.innerHTML = `${alertas.length} produto(s) com estoque baixo`;
    }
}

// Função para sair do sistema
function sair() {
    if (confirm('Deseja realmente sair do sistema?')) {
        window.location.href = 'login.html'; // Página de login não incluída neste exemplo
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('alertas')) {
        carregarAlertas();
    }
});