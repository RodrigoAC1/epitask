document.querySelector("#salvar").addEventListener("click", cadastrar)

let lista_produtos = []

window.addEventListener("load", () => {
    lista_produtos = JSON.parse (localStorage.getItem("lista_produtos"))
    lista_produtos.forEach((produtos) => {
        document.querySelector("#produtos").innerHTML += gerarCard(produtos)
    })
})

function cadastrar(){
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let nome = document.querySelector("#nome").value
    let descricao = document.querySelector("#descricao").value
    let tipo = document.querySelector("#tipo").value
    let valor = document.querySelector("#valor").value

    const produtos = {
        nome,
        descricao,
        tipo,
        valor,
    }


    if (produtos.nome.length == 0){
        document.querySelector("#produtos").classList.add("is-invalid")
        return
    }

    lista_produtos.push(produtos)

    document.querySelector("#produtos").innerHTML += gerarCard(produtos)

    document.querySelector("#nome").value=''
    document.querySelector("#descricao").value=''

    localStorage.setItem("lista_produtos", JSON.stringify(lista_produtos))

    modal.hide()

}

function apagar(botao){
    botao.parentNode.parentNode.parentNode.remove()
}

function gerarCard(produtos){
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
                        <a href="#" class="btn btn-success">
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" onClick='apagar(this) 'class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->` 
}