// JS para operações CRUD com Fetch API

const API_URL = 'http://localhost:3000/alunos';

const form = document.getElementById('aluno-form');
const idInput = document.getElementById('aluno-id');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const salvarBtn = document.getElementById('salvar-btn');
const cancelarBtn = document.getElementById('cancelar-btn');
const tabela = document.getElementById('alunos-table').querySelector('tbody');

let editando = false;

async function carregarAlunos() {
    tabela.innerHTML = '<tr><td colspan="6">Carregando...</td></tr>';
    try {
        const resp = await fetch(API_URL);
        const alunos = await resp.json();
        tabela.innerHTML = '';
        if (!Array.isArray(alunos) || alunos.length === 0) {
            tabela.innerHTML = '<tr><td colspan="6">Nenhum aluno cadastrado.</td></tr>';
        } else {
            alunos.forEach(aluno => {
                const cc = aluno.cc ?? '';
                const nome = aluno.nome || '';
                const apelido = aluno.apelido || '';
                const idade = aluno.idade ?? '';
                const curso_id = aluno.curso ?? aluno.curso_id ?? '';
                const id = aluno._id || aluno.id || '';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cc}</td>
                    <td>${nome}</td>
                    <td>${apelido}</td>
                    <td>${idade}</td>
                    <td>${curso_id}</td>
                    <td>
                        <button class="acao editar" 
                            data-id="${id}" 
                            data-cc="${cc}"
                            data-nome="${nome}" 
                            data-apelido="${apelido}"
                            data-idade="${idade}" 
                            data-curso="${curso_id}">Editar</button>
                        <button class="acao apagar" data-id="${id}">Apagar</button>
                    </td>
                `;
                tabela.appendChild(tr);
            });
        }
    } catch (e) {
        tabela.innerHTML = '<tr><td colspan="6">Erro ao carregar alunos.</td></tr>';
    }
}

// Delegação de eventos para os botões de editar/apagar
tabela.onclick = async (e) => {
    const btn = e.target;
    if (btn.classList.contains('editar')) {
        editando = true;
        idInput.value = btn.getAttribute('data-id');
        nomeInput.value = btn.getAttribute('data-nome');
        // Adicione campos para apelido e curso se existirem no formulário
        if (document.getElementById('apelido')) {
            document.getElementById('apelido').value = btn.getAttribute('data-apelido');
        }
        if (document.getElementById('curso')) {
            document.getElementById('curso').value = btn.getAttribute('data-curso');
        }
        idadeInput.value = btn.getAttribute('data-idade');
        salvarBtn.textContent = 'Salvar';
        cancelarBtn.style.display = 'inline-block';
    }
    if (btn.classList.contains('apagar')) {
        const id = btn.getAttribute('data-id');
        if (confirm('Deseja realmente apagar este aluno?')) {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            carregarAlunos();
        }
    }
};

form.onsubmit = async (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const apelido = document.getElementById('apelido').value.trim();
    const idade = parseInt(idadeInput.value, 10);
    const curso = document.getElementById('curso').value;

    if (!nome || !apelido || isNaN(idade) || !curso) return;

    const alunoData = { nome, apelido, idade, curso };

    if (editando && idInput.value) {
        await fetch(`${API_URL}/${idInput.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alunoData)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alunoData)
        });
    }
    cancelarEdicao();
    carregarAlunos();
};

cancelarBtn.onclick = cancelarEdicao;

function cancelarEdicao() {
    editando = false;
    idInput.value = '';
    form.reset();
    salvarBtn.textContent = 'Adicionar';
    cancelarBtn.style.display = 'none';
}

carregarAlunos();