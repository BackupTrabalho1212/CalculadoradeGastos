const form = document.getElementById('gastoForm');
const listaGastos = document.getElementById('listaGastos');
const totalGastos = document.getElementById('totalGastos');

let gastos = [];
let total = 0;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const categoria = document.getElementById('categoria').value;

    const gasto = { descricao, valor, categoria };
    gastos.push(gasto);
    atualizarLista();
    
    form.reset();
});

function atualizarLista() {
    listaGastos.innerHTML = '';
    total = 0;

    gastos.forEach((gasto, index) => {
        total += gasto.valor;

        const li = document.createElement('li');
        li.className = 'lista-gasto';
        li.innerHTML = `
            ${gasto.descricao} - R$ ${gasto.valor.toFixed(2)} 
            <span class="categoria">${gasto.categoria}</span>
            <button onclick="editarGasto(${index})">Editar</button>
            <button onclick="removerGasto(${index})">Excluir</button>
        `;

        if (gasto.valor > 100) {
            li.classList.add('red');
        }

        listaGastos.appendChild(li);
    });

    totalGastos.innerText = `R$ ${total.toFixed(2)}`;
}

function removerGasto(index) {
    gastos.splice(index, 1);
    atualizarLista();
}

function editarGasto(index) {
    const descricao = prompt('Nova Descrição:', gastos[index].descricao);
    const valor = prompt('Novo Valor:', gastos[index].valor);
    const categoria = prompt('Nova Categoria:', gastos[index].categoria);

    if (descricao && valor >= 0 && categoria) {
        gastos[index] = { descricao, valor: parseFloat(valor), categoria };
        atualizarLista();
    }
}