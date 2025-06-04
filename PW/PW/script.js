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


let selectedBarber = null;
let selectedService = null;


document.addEventListener('DOMContentLoaded', function() {

  mostrarBarbeiros();
  

  mostrarHorarios();
  
 
  definirDataMinima();
  
 
  if (document.getElementById('map')) {
    initMap();
  }
  
  
  inicializarValidacaoFormularios();
  
 
  const formAgendamento = document.getElementById('schedulingForm');
  if (formAgendamento) {
    formAgendamento.addEventListener('submit', fazerAgendamento);
  }
  
  
  const telefoneInput = document.getElementById('registerPhone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', formatarTelefone);
  }

  
  checkLoggedInUser();
});

function checkLoggedInUser() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    const loginSection = document.querySelector('.auth-content');
    if (loginSection) {
      loginSection.innerHTML = `
        <div class="auth-forms">
          <h2>Bem-vindo, ${user.name}!</h2>
          <p class="text-center mb-4">Você está logado.</p>
          <button onclick="handleLogout()" class="action-button">Sair</button>
        </div>
      `;
    }
  }
}


function formatarTelefone(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length <= 2) {
    e.target.value = value.length ? `(${value}` : value;
  } else if (value.length <= 7) {
    e.target.value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
  } else {
    e.target.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
  }
}


function definirDataMinima() {
  const dateInput = document.getElementById('scheduleDate');
  if (dateInput) {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    
    const ano = amanha.getFullYear();
    const mes = String(amanha.getMonth() + 1).padStart(2, '0');
    const dia = String(amanha.getDate()).padStart(2, '0');
    
    dateInput.min = `${ano}-${mes}-${dia}`;
  }
}


function inicializarValidacaoFormularios() {
  
  const loginForm = document.getElementById('loginFormElement');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const email = document.getElementById('loginEmail');
      const senha = document.getElementById('loginPassword');
      const emailError = document.getElementById('loginEmailError');
      const senhaError = document.getElementById('loginPasswordError');
      const loginFeedback = document.getElementById('loginFeedback');
      
      
      emailError.textContent = '';
      senhaError.textContent = '';
      loginFeedback.textContent = '';
      loginFeedback.className = 'form-feedback';
      
      
      if (!email.value) {
        emailError.textContent = 'O email é obrigatório';
        isValid = false;
      } else if (!validarEmail(email.value)) {
        emailError.textContent = 'Digite um email válido';
        isValid = false;
      }
      
     
      if (!senha.value) {
        senhaError.textContent = 'A senha é obrigatória';
        isValid = false;
      }
      
      if (isValid) {
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email.value && u.password === senha.value);
        
        if (user) {
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          loginFeedback.textContent = 'Login realizado com sucesso!';
          loginFeedback.className = 'form-feedback success';
          setTimeout(() => {
            window.location.href = 'services.html';
          }, 1500);
        } else {
          
          loginFeedback.textContent = 'Email ou senha incorretos';
          loginFeedback.className = 'form-feedback error';
        }
      }
    });
  }
  
  
  const registerForm = document.getElementById('registerFormElement');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nome = document.getElementById('registerName');
      const email = document.getElementById('registerEmail');
      const senha = document.getElementById('registerPassword');
      const telefone = document.getElementById('registerPhone');
      const nomeError = document.getElementById('registerNameError');
      const emailError = document.getElementById('registerEmailError');
      const senhaError = document.getElementById('registerPasswordError');
      const telefoneError = document.getElementById('registerPhoneError');
      const registerFeedback = document.getElementById('registerFeedback');
      
      
      nomeError.textContent = '';
      emailError.textContent = '';
      senhaError.textContent = '';
      telefoneError.textContent = '';
      registerFeedback.textContent = '';
      registerFeedback.className = 'form-feedback';
      
     
      if (!nome.value) {
        nomeError.textContent = 'O nome é obrigatório';
        isValid = false;
      } else if (nome.value.length < 3) {
        nomeError.textContent = 'O nome deve ter pelo menos 3 caracteres';
        isValid = false;
      }
      
    
      if (!email.value) {
        emailError.textContent = 'O email é obrigatório';
        isValid = false;
      } else if (!validarEmail(email.value)) {
        emailError.textContent = 'Digite um email válido';
        isValid = false;
      }
      
     
      if (!senha.value) {
        senhaError.textContent = 'A senha é obrigatória';
        isValid = false;
      } else if (senha.value.length < 6) {
        senhaError.textContent = 'A senha deve ter pelo menos 6 caracteres';
        isValid = false;
      }
      
     
      if (!telefone.value) {
        telefoneError.textContent = 'O telefone é obrigatório';
        isValid = false;
      } else if (!validarTelefone(telefone.value)) {
        telefoneError.textContent = 'Digite um telefone válido no formato (99) 99999-9999';
        isValid = false;
      }
      
      if (isValid) {
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email.value)) {
          emailError.textContent = 'Este email já está cadastrado';
          return;
        }
        
        
        const newUser = {
          name: nome.value,
          email: email.value,
          password: senha.value,
          phone: telefone.value,
          createdAt: new Date().toISOString()
        };
        
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        
        registerFeedback.textContent = 'Cadastro realizado com sucesso!';
        registerFeedback.className = 'form-feedback success';
        
        
        setTimeout(() => {
          toggleForms('login');
        }, 1500);
      }
    });
  }
}


function handleLogout() {
  localStorage.removeItem('currentUser');
  window.location.reload();
}


function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


function validarTelefone(telefone) {
  const re = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  return re.test(telefone);
}


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


function mostrarBarbeiros() {
  const grid = document.getElementById('barbersGrid');
  if (!grid) return;

  let conteudoHTML = '';


  for (let barbeiro of barbers) {
    conteudoHTML += `
      <div class="barber-card">
        <img src="${barbeiro.image}" alt="${barbeiro.name}">
        <h3>${barbeiro.name}</h3>
        <p>${barbeiro.specialty}</p>
        <p><i class="fas fa-star" style="color: var(--primary-yellow);"></i> ${barbeiro.rating}/5.0</p>
        <button onclick="selecionarBarbeiro(${barbeiro.id})"><i class="fas fa-check"></i> Selecionar</button>
      </div>
    `;
  }

  grid.innerHTML = conteudoHTML;
}


function selecionarBarbeiro(id) {
  
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    alert('Por favor, faça login para agendar um serviço');
    window.location.href = 'login.html';
    return;
  }

  selectedBarber = barbers.find(function(barbeiro) {
    return barbeiro.id === id;
  });

 
  const barberInfo = document.getElementById('selectedBarberInfo');
  if (barberInfo) {
    barberInfo.innerHTML = `
      <img src="${selectedBarber.image}" alt="${selectedBarber.name}">
      <div class="barber-details">
        <h3>${selectedBarber.name}</h3>
        <p>${selectedBarber.specialty}</p>
        <p><i class="fas fa-star" style="color: var(--primary-yellow);"></i> ${selectedBarber.rating}/5.0</p>
      </div>
    `;
  }

  document.getElementById('serviceSelection').classList.remove('hidden');
  document.getElementById('barbersGrid').classList.add('hidden');
}


function voltarParaBarbeiros() {
  document.getElementById('barbersGrid').classList.remove('hidden');
  document.getElementById('serviceSelection').classList.add('hidden');
  selectedBarber = null;
}


function selectService(nome, preco) {
  selectedService = {
    nome: nome,
    preco: preco
  };

 
  const resumo = document.getElementById('schedulingSummary');
  if (resumo) {
    resumo.innerHTML = `
      <div class="summary-item">
        <span class="summary-label">Barbeiro:</span>
        <span>${selectedBarber.name}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Serviço:</span>
        <span>${selectedService.nome}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Preço:</span>
        <span>R$ ${selectedService.preco.toFixed(2)}</span>
      </div>
    `;
  }

  document.getElementById('scheduling').classList.remove('hidden');
  document.getElementById('serviceSelection').classList.add('hidden');
}


function voltarParaServicos() {
  document.getElementById('serviceSelection').classList.remove('hidden');
  document.getElementById('scheduling').classList.add('hidden');
  selectedService = null;
}


function mostrarHorarios() {
  const select = document.getElementById('scheduleTime');
  if (!select) return;
  

  select.innerHTML = '<option value="">Selecione um horário</option>';


  for (let hora = 9; hora <= 20; hora++) {
    const option = document.createElement('option');
    option.value = hora + ':00';
    option.textContent = hora + ':00';
    select.appendChild(option);
  }
}


function fazerAgendamento(evento) {
  evento.preventDefault();
  

  let isValid = true;
  const data = document.getElementById('scheduleDate');
  const hora = document.getElementById('scheduleTime');
  const pagamento = document.querySelector('input[name="payment"]:checked');
  
  const dataError = document.getElementById('scheduleDateError');
  const horaError = document.getElementById('scheduleTimeError');
  const pagamentoError = document.getElementById('paymentError');
  

  dataError.textContent = '';
  horaError.textContent = '';
  pagamentoError.textContent = '';
  

  if (!data.value) {
    dataError.textContent = 'Selecione uma data para o agendamento';
    isValid = false;
  }
  

  if (!hora.value) {
    horaError.textContent = 'Selecione um horário para o agendamento';
    isValid = false;
  }
  
  
  if (!pagamento) {
    pagamentoError.textContent = 'Selecione uma forma de pagamento';
    isValid = false;
  }
  
  if (!isValid) return;

  const agendamento = {
    barbeiro: selectedBarber,
    servico: selectedService,
    data: data.value,
    hora: hora.value,
    formaPagamento: pagamento.value,
    usuario: JSON.parse(localStorage.getItem('currentUser'))
  };


  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  agendamentos.push(agendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  

  mostrarConfirmacao(agendamento);
  
  document.getElementById('scheduling').classList.add('hidden');
  document.getElementById('confirmationSection').classList.remove('hidden');
}


function mostrarConfirmacao(agendamento) {
  const detalhes = document.getElementById('confirmationDetails');
  

  const dataObj = new Date(agendamento.data);
  const dia = dataObj.getDate().toString().padStart(2, '0');
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataObj.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  
  
  let formaPagamento = '';
  switch(agendamento.formaPagamento) {
    case 'credit':
      formaPagamento = 'Cartão de Crédito';
      break;
    case 'pix':
      formaPagamento = 'PIX';
      break;
    case 'cash':
      formaPagamento = 'Dinheiro';
      break;
  }
  
  detalhes.innerHTML = `
    <div class="summary-item">
      <span class="summary-label">Barbeiro:</span>
      <span>${agendamento.barbeiro.name}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Serviço:</span>
      <span>${agendamento.servico.nome}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Data:</span>
      <span>${dataFormatada}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Horário:</span>
      <span>${agendamento.hora}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Preço:</span>
      <span>R$ ${agendamento.servico.preco.toFixed(2)}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Forma de Pagamento:</span>
      <span>${formaPagamento}</span>
    </div>
  `;
}


function voltarParaInicio() {
  window.location.href = 'index.html';
}

function initMap() {
 
  const localizacao = { lat: -23.624759, lng: -46.735951 };
  
  try {
    const map = L.map('map').setView([localizacao.lat, localizacao.lng], 15);
    
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
   
    const marker = L.marker([localizacao.lat, localizacao.lng]).addTo(map);
    marker.bindPopup("<b>Barbearia Elite</b><br>SENAC Santo Amaro").openPopup();
  } catch (error) {
    console.error('Erro ao inicializar o mapa:', error);
    document.getElementById('map').innerHTML = '<div class="map-error">Não foi possível carregar o mapa. Por favor, entre em contato conosco para obter direções.</div>';
  }
}