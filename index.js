const express = require('express')
const app = express()

app.use(express.json())


// ALUNOS

const alunos = [
    {
        id: 1,
        nome: "Arthur Duque",
        email: "arthur@gmail.com"
    },
    {
        id: 2,
        nome: "Pedro Sperati",
        email: "pedro@gmail.com"
    },
    {
        id: 3,
        nome: "Julia Lopes",
        email: "julia@gmail.com",
    },
    {
        id: 4,
        nome: "Arthur Sperati",
        email: "arthur@gmail.com"
    // Exemplo: Frutas = ["Maçã", "Banana", "Uva", "Abacaxi"]
    },
]

app.get('/', function (req, res) {
    res.send("Hello World!, you did it!")
})

app.get('/alunos', function (req, res) {
    const nome = req.query.nome

    // Se não passar query param, retorna todos
    // A exclamação inverte o valor
    if(!nome){
        return res.json(alunos)
    }

    const alunosFiltrados = alunos.filter(a=>
        a.nome.toLowerCase().includes(nome.toLowerCase())
    )

    res.json(alunosFiltrados)
})

app.post("/alunos", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const emailQueVeioDoCliente = req.body.email

    if(!nomeQueVeioDoCliente || !emailQueVeioDoCliente){
        return res.status(400).json({erro: "Nome e e-mail são obrigatórios!"})
    }

    const NovoAluno = {
        id: 5,
        nome: nomeQueVeioDoCliente,
        email: emailQueVeioDoCliente
    }

    // Adicionar novo aluno no final da lista
    alunos.push(NovoAluno)
    res.status(201).send()
})

// Buscar aluno por id
app.get("/alunos/:id", function(req, res){
     const id = parseInt(req.params.id) // O query aprameter volta como texto

     const aluno = alunos.find(a => a.id == id)

     //Se a variável for nula é igual a falso, caso tenha algo, caso exista, é verdadeira
     if(aluno){
        return res.json(aluno)
     } else {
        res.status(404).json("Aluno não encontrado")
     }
})

app.put("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id)
    // const nome = req.body.email

    // Desestruturação do objeto
    const {nome, email} = req.body

    // A EXCLAMAÇÃO (!) MOSTRA QUE É NULO
    if(!nome || !email){
        return res.status(400).json("Nome e email são obrigatórios!")
    }

     //Descobrir em qual posição do rray/lista o aluno está pelo id

    const indexDoAluno = alunos.findIndex(a => a.id == id)

    if(indexDoAluno === -1){
        return res.status(404).json("Aluno não Encontrado")
    }

// Substituir os dados do aluno pelos novos da requisição

    alunos[indexDoAluno].email = email
    alunos[indexDoAluno].nome = nome

    return res.json(alunos[indexDoAluno])

})


app.delete("/alunos/:id", function(req, res) {
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)

    if(index === -1){
        return res.status(404).json("Aluno não encontrado")
    }

    // Remove elementos a partir de um index
    // Nesse caso ele remove um elemento a partir do index que foi informado
    // Exemplo: Frutas = ["Maçã", "Banana", "Uva", "Abacaxi"]
    // frutas.splice(1, 2) essa função vai retornar o que foi removido no caso Banana e Uva
    // No caso da banana e da uva foram removidos 2 elementos após o index 1
    // E a lista de frutas ficará apenas ["Maçã", "Banana"]
    const alunoRemovido = alunos.splice(index, 1)
    return res.status(204).json("ALuno deletado com sucesso!")
})


// PROFESSORES

const professores = [
    {
        id: 1,
        nome: "Elioenai Piovezan",
        disciplina: "Língua Português",
        anoContratacao: 2021,
    },
    {
        id: 2,
        nome: "Ana Maria",
        disciplina: "Inglês",
        anoContratacao: 2014,
    },
]

app.get('/professores', function (req, res) {
    const anoContratacao = req.query.anoContratacao

    // Se não passar query param, retorna todos
    // A exclamação inverte o valor
    if(!anoContratacao){
        return res.json(professores)
    }

    const professoresFiltrados = professores.filter(a=>
        a.anoContratacao == anoContratacao
    )

    res.json(professoresFiltrados)
})

app.post("/professores", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const disciplinaQueVeioDoCliente = req.body.disciplina
    const anoContratacaoQueVeioDoCliente = req.body.anoContratacao

    if(!nomeQueVeioDoCliente || !disciplinaQueVeioDoCliente || !anoContratacaoQueVeioDoCliente){
        return res.status(400).json({erro: "Nome, e-mail e ano de contratação são obrigatórios!"})
    }

    const NovoProfessor = {
        id: 3,
        nome: nomeQueVeioDoCliente,
        disciplina: disciplinaQueVeioDoCliente,
        anoContratacao: anoContratacaoQueVeioDoCliente,
    }

    // Adicionar novo professor no final da lista
    professores.push(NovoProfessor)
    res.status(201).send()
})

app.put("/professores/:id", function(req, res){
    const id = parseInt(req.params.id)
    // const nome = req.body.email

    // Desestruturação do objeto
    const {nome, disciplina, anoContratacao} = req.body

    // A EXCLAMAÇÃO (!) MOSTRA QUE É NULO
    if(!nome || !anoContratacao || !disciplina){
        return res.status(400).json("Nome, disciplina e ano de contratação são obrigatórios!")
    }

    //Descobrir em qual posição do rray/lista o professor está pelo id

    const anoDoProf = professores.findIndex(a => a.id == id)

    if(anoDoProf === -1){
        return res.status(404).json("Professor não encontrado!")
    }

// Substituir os dados do professor pelos novos da requisição

    professores[anoDoProf].nome = nome
    professores[anoDoProf].disciplina = disciplina
    professores[anoDoProf].anoContratacao = anoContratacao

    return res.json(professores[anoDoProf])

})

app.delete("/professores/:id", function(req, res) {
    const id = parseInt(req.params.id)
    const index = professores.findIndex(a => a.id === id)

    if(index === -1){
        return res.status(404).json("Professor não encontrado")
    }

    // Remove elementos a partir de um index
    // Nesse caso ele remove um elemento a partir do index que foi informado
    // Exemplo: Frutas = ["Maçã", "Banana", "Uva", "Abacaxi"]
    // frutas.splice(1, 2) essa função vai retornar o que foi removido no caso Banana e Uva
    // No caso da banana e da uva foram removidos 2 elementos após o index 1
    // E a lista de frutas ficará apenas ["Maçã", "Banana"]
    const professorRemovido = professores.splice(index, 1)
    return res.status(204).json("Professor deletado com sucesso!")
})

// Monitora / Escuta a porta 3000
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000!")
})