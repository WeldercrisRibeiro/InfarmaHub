// assets/js/usuarios.js

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

// Inicializa Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const TABLE_NAME = 'users';

// Elementos DOM
const modal = document.getElementById('userModal');
const form = document.getElementById('userForm');
const tbody = document.getElementById('usersBody');
const btnNovo = document.getElementById('newUserBtn');
const btnFechar = document.getElementById('closeModalBtn');

// Inputs
const inpNome = document.getElementById('inputNome');
const inpUser = document.getElementById('inputUsuario');
const inpPass = document.getElementById('inputSenha');
const inpRole = document.getElementById('inputRole');
const modalTitle = document.getElementById('modalTitle');

let editId = null; // Controla se é edição ou novo

// --- FUNÇÕES DE MODAL ---
const abrirModal = (titulo = "Novo Usuário") => {
    modalTitle.textContent = titulo;
    modal.classList.add('open');
};

const fecharModal = () => {
    modal.classList.remove('open');
    form.reset();
    editId = null;
};

// --- CRUD SUPABASE ---

// 1. Carregar Usuários
const loadUsers = async () => {
    // Ordena por nome
    const { data: users, error } = await supabaseClient
        .from(TABLE_NAME)
        .select('*')
        .order('role', { ascending: true });

    if (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao carregar lista de usuários.');
        return;
    }
    renderTable(users);
};

// 2. Salvar (Criar ou Editar)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome_completo = inpNome.value.trim();
    const usuario = inpUser.value.trim();
    const senha = inpPass.value.trim();
    const role = inpRole.value;

    if (!usuario || !senha) return alert("Preencha todos os campos!");

    const userData = { nome_completo, usuario, senha, role };

    let error = null;

    if (editId) {
        // UPDATE
        const res = await supabaseClient.from(TABLE_NAME).update(userData).eq('id', editId);
        error = res.error;
    } else {
        // INSERT
        // Verifica se usuário já existe
        const check = await supabaseClient.from(TABLE_NAME).select('id').eq('usuario', usuario);
        if (check.data && check.data.length > 0) {
            return alert("Este nome de usuário já existe!");
        }

        const res = await supabaseClient.from(TABLE_NAME).insert([userData]);
        error = res.error;
    }

    if (error) {
        alert("Erro ao salvar: " + error.message);
    } else {
        fecharModal();
        loadUsers(); // Recarrega tabela
    }
});

// 3. Excluir Usuário
window.deletarUser = async (id, nome) => {
    if (confirm(`Tem certeza que deseja remover o usuário "${nome}"?`)) {
        const { error } = await supabaseClient.from(TABLE_NAME).delete().eq('id', id);
        
        if (error) alert("Erro ao deletar: " + error.message);
        else loadUsers();
    }
};

// 4. Preparar Edição
window.editarUser = async (id) => {
    const { data, error } = await supabaseClient.from(TABLE_NAME).select('*').eq('id', id).single();
    
    if (error || !data) return alert("Erro ao buscar dados do usuário.");

    // Preenche o form
    inpNome.value = data.nome_completo || '';
    inpUser.value = data.usuario || '';
    inpPass.value = data.senha || '';
    inpRole.value = data.role || 'suporte';

    editId = id;
    abrirModal("Editar Usuário");
};

// --- RENDERIZAÇÃO ---
const renderTable = (users) => {
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        
        // --- ATUALIZAÇÃO DE CORES AQUI ---
        let roleClass = '';
        
        // Normaliza para minúsculo para evitar erros de digitação
        const role = (user.role ||'suporte'||'admin'||'implantacao').toLowerCase();

        if (role === 'admin' || role === 'master') {
            // Master/TI: Roxo (Exclusivo)
            roleClass = 'bg-purple-100 text-purple-800 border border-purple-200';
        } else {
            // Operador/Outros: Cinza (Normal)
            roleClass = 'bg-gray-100 text-gray-800 border border-gray-200';
        }
        
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.nome_completo || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${user.usuario}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-bold uppercase ${roleClass}">
                    ${user.role || 'operador'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                •••${user.senha.slice(-2)} </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button onclick="editarUser(${user.id})" class="text-primary hover:text-blue-900 mr-4" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletarUser(${user.id}, '${user.usuario}')" class="text-red-500 hover:text-red-700" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// Event Listeners
btnNovo.addEventListener('click', () => {
    form.reset();
    editId = null;
    abrirModal("Novo Usuário");
});

btnFechar.addEventListener('click', fecharModal);

// Carregar ao iniciar
loadUsers();