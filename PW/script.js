const barbers = [
    {
        id: 1,
        name: 'João Silva',
        specialty: 'Cabelo e Barba',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Pedro Santos',
        specialty: 'Cabelo Afro',
        image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=600&fit=crop',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Carlos Oliveira',
        specialty: 'Barba',
        image: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=800&h=600&fit=crop',
        rating: 4.7
    }
];

// Variáveis globais para armazenar seleções
let barbeiroProfissional = null;
let servicoEscolhido = null;

// Quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a grade de barbeiros
    mostrarBarbeiros();
    // Inicializa os horários disponíveis
    mostrarHorarios();
    // Inicializa o mapa
    if (document.getElementById('map')) {
        initMap();
    }
});

// Função para alternar entre login e cadastro
function toggleForms(tipo) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tipo === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

// Função para lidar com o login
function handleLogin(evento) {
    evento.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginPassword').value;
    
    // Aqui você pode adicionar validações
    alert('Login realizado com sucesso!');
    window.location.href = 'services.html';
}

// Função para lidar com o cadastro
function handleRegister(evento) {
    evento.preventDefault();
    const nome = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const senha = document.getElementById('registerPassword').value;
    const telefone = document.getElementById('registerPhone').value;
    
    // Aqui você pode adicionar validações
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'services.html';
}

// Função para mostrar os barbeiros na página
function mostrarBarbeiros() {
    const grid = document.getElementById('barbersGrid');
    if (!grid) return;

    let conteudoHTML = '';
    
    // Para cada barbeiro, cria um card
    for (let barbeiro of barbers) {
        conteudoHTML += `
            <div class="barber-card">
                <img src="${barbeiro.image}" alt="${barbeiro.name}">
                <h3>${barbeiro.name}</h3>
                <p>${barbeiro.specialty}</p>
                <p>Avaliação: ${barbeiro.rating}/5.0</p>
                <button onclick="selecionarBarbeiro(${barbeiro.id})">Selecionar</button>
            </div>
        `;
    }
    
    grid.innerHTML = conteudoHTML;
}

// Função para selecionar um barbeiro
function selecionarBarbeiro(id) {
    barbeiroProfissional = barbers.find(function(barbeiro) {
        return barbeiro.id === id;
    });
    
    document.getElementById('serviceSelection').classList.remove('hidden');
    document.getElementById('barbersGrid').classList.add('hidden');
}

// Função para selecionar um serviço
function selectService(nome, preco) {
    servicoEscolhido = {
        nome: nome,
        preco: preco
    };
    
    document.getElementById('scheduling').classList.remove('hidden');
    document.getElementById('serviceSelection').classList.add('hidden');
}

// Função para mostrar os horários disponíveis
function mostrarHorarios() {
    const select = document.getElementById('scheduleTime');
    if (!select) return;
    
    // Adiciona horários das 9h às 20h
    for (let hora = 9; hora <= 20; hora++) {
        const option = document.createElement('option');
        option.value = hora + ':00';
        option.textContent = hora + ':00';
        select.appendChild(option);
    }
}

// Função para fazer o agendamento
function fazerAgendamento(evento) {
    evento.preventDefault();
    
    const data = document.getElementById('scheduleDate').value;
    const hora = document.getElementById('scheduleTime').value;
    const pagamento = document.querySelector('input[name="payment"]:checked').value;
    
    const agendamento = {
        barbeiro: barbeiroProfissional,
        servico: servicoEscolhido,
        data: data,
        hora: hora,
        formaPagamento: pagamento
    };
    
    console.log('Agendamento:', agendamento);
    alert('Agendamento realizado com sucesso!');
    window.location.href = 'index.html';
}

// Adiciona o evento de submit ao formulário de agendamento
const formAgendamento = document.getElementById('schedulingForm');
if (formAgendamento) {
    formAgendamento.addEventListener('submit', fazerAgendamento);
}

// Função para inicializar o mapa
function initMap() {
    const localizacao = { lat: -23.624759, lng: -46.735951 };  // Coordenadas do SENAC Santo Amaro

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: localizacao,
    });

    const marker = new google.maps.Marker({
        position: localizacao,
        map: map,
        title: 'Barbearia Elite - SENAC Santo Amaro'
    });
}