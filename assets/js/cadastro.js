import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const TABLE_NAME = 'empresas';

// Elementos
const newClientBtn = document.getElementById('newClientBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const clientModal = document.getElementById('clientModal');
const clientForm = document.getElementById('clientForm');
const dataBody = document.getElementById('dataBody');

// Inputs
const inputName = document.getElementById('inputName');
const inputCnpj = document.getElementById('inputCnpj');
const inputService = document.getElementById('inputService');
const inputVarejo = document.getElementById('inputVarejo');
const inputObservation = document.getElementById('inputObservation');

let dataEditId = null; 

if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.href = "../index.html";
}

const openModal = () => clientModal.classList.add('open');
const closeModal = () => {
    clientModal.classList.remove('open');
    clientForm.reset();
    dataEditId = null;
};

// 1. Carregar
const loadData = async () => {
    const { data: empresas, error } = await supabaseClient
        .from(TABLE_NAME)
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erro Supabase:', error);
        return;
    }
    renderTable(empresas); 
};

// 2. Salvar
clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = inputName.value.trim();
    const cnpj = inputCnpj.value.trim();
    const service = inputService.value;
    const versaoVarejo = inputVarejo.value.trim();
    const observationValue = inputObservation.value.trim(); 

    if (!name || !cnpj || !service) {
        alert("Preencha os campos obrigatórios!");
        return;
    }
    
    const clientData = { 
        name: name, 
        cnpj: cnpj, 
        service: service, 
        versaoVarejo: versaoVarejo, 
        observacao: observationValue // <--- Mudei de inputObservation para observacao
    };

    if (!dataEditId && await cnpjAlreadyExists(cnpj)) {
        alert("CNPJ já cadastrado!");
        return;
    }

    let error = null;

    try {
        if (dataEditId) {
            const res = await supabaseClient.from(TABLE_NAME).update(clientData).eq('id', dataEditId);
            error = res.error;
        } else {
            const res = await supabaseClient.from(TABLE_NAME).insert([clientData]);
            error = res.error;
        }

        if (error) throw error;

        closeModal();
        loadData();

    } catch (err) {
        console.error('Erro no processo:', err);
        alert('Erro ao salvar: ' + err.message);
    }
});

const cnpjAlreadyExists = async (cnpj) => {
    const { data } = await supabaseClient.from(TABLE_NAME).select('id').eq('cnpj', cnpj);
    return data && data.length > 0;
};

// Editar
window.handleEdit = async (id) => {
    const { data, error } = await supabaseClient.from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) return alert('Erro ao buscar dados.');
    
    inputName.value = data.name || '';
    inputCnpj.value = data.cnpj || '';
    inputService.value = data.service || '';
    inputVarejo.value = data.versaoVarejo || '';
    
    // --- CORREÇÃO AQUI ---
    inputObservation.value = data.observacao || ''; // Mudei para data.observacao

    dataEditId = data.id; 
    openModal();
};

// Remover
window.handleRemove = async (id, name) => {
    if (confirm(`Remover "${name}"?`)) {
        const { error } = await supabaseClient.from(TABLE_NAME).delete().eq('id', id);
        if (error) alert('Erro ao remover.');
        else loadData();
    }
};

// Renderizar
const renderTable = (data) => {
    dataBody.innerHTML = ''; 
    data.forEach((client) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm text-gray-700';
        
        // --- CORREÇÃO AQUI TAMBÉM ---
        // Usando client.observacao
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900">${client.name}</td>
            <td class="px-6 py-4">${client.cnpj}</td>
            <td class="px-6 py-4">${client.service}</td>
            <td class="px-6 py-4">${client.versaoVarejo || '-'}</td>
            <td class="px-6 py-4 text-gray-500">${client.observacao || '-'}</td> 
            <td class="px-4 py-4 text-center"><button onclick="handleEdit(${client.id})" class="text-blue-600 hover:bg-blue-50 p-2 rounded"><i class="fas fa-edit"></i></button></td>
            <td class="px-4 py-4 text-center"><button onclick="handleRemove(${client.id}, '${client.name}')" class="text-red-500 hover:bg-red-50 p-2 rounded"><i class="fas fa-trash-alt"></i></button></td>
        `;
        dataBody.appendChild(row);
    });
};

// Event Listeners
newClientBtn.addEventListener('click', () => { clientForm.reset(); dataEditId = null; openModal(); });
if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if(clientModal) clientModal.addEventListener('click', (e) => { if (e.target === clientModal) closeModal(); });

window.onload = loadData;