// Selecionando elementos
const formulario = document.getElementById("formulario");
const tabela = document.querySelector("#tabelaAlunos tbody");

// Carregar dados do localStorage ao iniciar a página
let listaAlunos = JSON.parse(localStorage.getItem("alunos")) || [];
renderizarTabela();

// Evento de adicionar aluno
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let nota1 = parseFloat(document.getElementById("nota1").value);
    let nota2 = parseFloat(document.getElementById("nota2").value);

    // Validação
    if (!nome || isNaN(nota1) || isNaN(nota2)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let media = ((nota1 + nota2) / 2).toFixed(2);
    let status = media >= 6 ? "Aprovado" : "Reprovado";

    // Criar o objeto aluno
    let aluno = { nome, nota1, nota2, media, status };
    listaAlunos.push(aluno);

    // Salvar no localStorage
    localStorage.setItem("alunos", JSON.stringify(listaAlunos));

    // Atualizar a tabela
    renderizarTabela();

    // Limpar campos
    formulario.reset();
});

// Função para inserir os dados na tabela
function renderizarTabela() {
    tabela.innerHTML = "";

    listaAlunos.forEach(aluno => {
        let linha = document.createElement("tr");

        linha.classList.add(aluno.status === "Aprovado" ? "aprovado" : "reprovado");

        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.nota1}</td>
            <td>${aluno.nota2}</td>
            <td>${aluno.media}</td>
            <td>${aluno.status}</td>
        `;

        tabela.appendChild(linha);
    });
}
