// Função de Login
function acionarBotaoLogin() {
    var usuario = document.getElementById('txtusuario').value;
    var senha = document.getElementById('txtSenha').value;

    // Verifica se os campos estão preenchidos
    if (usuario == "") {
        alert("Preencha o campo Usuário!");
    } else if (senha == "") {
        alert("Digite a Senha!");
    } else {
        // Validação do usuário e senha
        if (usuario == "barbearia@exemplo.com" && senha == "senha123") {
            window.location.href = 'dashboard.html'; // Redireciona para a página de sucesso após login
        } else {
            alert("Usuário ou senha incorretos!");
        }
    }
}

// Função de Cadastro
function acionarBotaoCadastro() {
    var nome = document.getElementById('txtNome').value;
    var email = document.getElementById('txtEmail').value;
    var mensagem = document.getElementById('txtMensagem').value;

    // Verifica se os campos estão preenchidos
    if (nome == "") {
        alert("Preencha o campo Nome!");
    } else if (email == "") {
        alert("Preencha o campo E-mail!");
    } else if (mensagem == "") {
        alert("Preencha o campo Mensagem!");
    } else {
        // Validação simples de exemplo
        if (nome == "João Silva" && mensagem == "Cadastro_2025") {
            window.location.href = 'dashboard.html'; // Redireciona para a página de sucesso
        } else {
            alert("Cadastro não aprovado. Verifique suas informações.");
        }
    }
}

