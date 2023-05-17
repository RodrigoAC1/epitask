document.querySelector("#salvar").addEventListener("click", cadastrar)

let lista_produtos = []

window.addEventListener("load", () => {
    lista_produtos = JSON.parse (localStorage.getItem("lista_produtos")) || []
    atualizar()
})

document.querySelector("#indisponivel").addEventListener("click", () => {
    lista_produtos = JSON.parse (localStorage.getItem("lista_produtos")) || []
    lista_produtos = lista_produtos.filter(produtos => !produtos.disponivel)
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
    lista_produtos = JSON.parse (localStorage.getItem("lista_produtos")) || []
    const nome =  document.querySelector("#busca").value
    lista_produtos = lista_produtos.filter(produtos => produtos.nome.includes(nome))
    atualizar()
})

document.querySelector("#disponivel").addEventListener("click", () => {
    lista_produtos = JSON.parse (localStorage.getItem("lista_produtos")) || []
    lista_produtos = lista_produtos.filter(produtos => produtos.disponivel)
    atualizar()
})

function cadastrar(){
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let nome = document.querySelector("#nome").value
    let descricao = document.querySelector("#descricao").value
    let tipo = document.querySelector("#tipo").value
    let valor = document.querySelector("#valor").value

    const produtos = {
        id: Date.now(),
        nome,
        descricao,
        tipo,
        valor,
        vendido: false
    }


    if (produtos.nome.length == 0){
        document.querySelector("#produtos").classList.add("is-invalid")
        return
    }

    lista_produtos.push(produtos)

    document.querySelector("#produtos").innerHTML += gerarCard(produtos)

    document.querySelector("#nome").value=''
    document.querySelector("#descricao").value=''

    salvar()
    modal.hide()

}

function atualizar(){
    document.querySelector("#produtos").innerHTML = ""
    lista_produtos.forEach((produtos) => {
        document.querySelector("#produtos").innerHTML += gerarCard(produtos)
    })
}

function salvar(){
    localStorage.setItem("lista_produtos", JSON.stringify(lista_produtos))
}

function apagar(id){
    lista_produtos = lista_produtos.filter((produtos) => {
      return produtos.id != id  
    }) //arrow function
    salvar()
    atualizar()
}

function disponivel(id){
    let produtos_encontrados = lista_produtos.find((produtos) => {
        return produtos.id == id
    })
    produtos_encontrados.disponivel = true
    salvar()
    atualizar()

}

function gerarCard(produtos){
    const indisponivel = (produtos.disponivel) ? "disabled" : ""
    return `<div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-header">
                        ${produtos.nome}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${produtos.descricao}</p>
                        <p>
                            <span class="badge text-bg-warning">
                                ${produtos.tipo}
                            </span>
                        </p>
                        <p>${produtos.valor}pts</p>
                        <a href="#" onClick='disponivel(${produtos.id}) 'class="btn btn-success ${indisponivel}">
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" onClick='apagar(${produtos.id}) 'class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->` 
}