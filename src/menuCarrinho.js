import { catalogo, lerLocalStorage, salvarLocalStorage } from "./utilidades"

export const idsProdutoQuantidade = lerLocalStorage("carrinho") ?? {}
export var valorTotal

export function atualizarPreco(val){
    valorTotal = val
}

function abrirCarrinho(){
    document.getElementById("carrinho").classList.add("right-[0px]")
    document.getElementById("carrinho").classList.remove("right-[-360px]")
}

function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[0px]")
    document.getElementById("carrinho").classList.add("right-[-360px]")   
}

function irParaCheckout(){
    if(Object.keys(idsProdutoQuantidade).length === 0){
        return
    }
    window.location.href = './checkout.html'
}

export function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho")
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho")
    const botaoCheckout = document.getElementById("botao-checkout")
    botaoFecharCarrinho.addEventListener('click', fecharCarrinho)
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho)
    botaoCheckout.addEventListener("click", irParaCheckout)
}

function aumentarPreco(preco){
    valorTotal = preco + valorTotal
    document.getElementById("preco-total").innerText = `Total: $${valorTotal}`
}

function incrementarQuantidade(idProduto){
    let produto = catalogo.find(p => p.id == idProduto)
    aumentarPreco(produto.preco)
    idsProdutoQuantidade[idProduto]++
    salvarLocalStorage('carrinho', idsProdutoQuantidade)
    atualizarQuantidade(idProduto)

}
function decrementarQuantidade(idProduto){
    let produto = catalogo.find(p => p.id == idProduto)
    aumentarPreco(produto.preco*-1)
    idsProdutoQuantidade[idProduto]--
    salvarLocalStorage('carrinho', idsProdutoQuantidade)
    atualizarQuantidade(idProduto)
    
}

function atualizarQuantidade(idProduto){
    idsProdutoQuantidade[idProduto] < 1 ? removerCarrinho(idProduto) : document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoQuantidade[idProduto]
    
}

function removerCarrinho(idProduto){
    let p = catalogo.find(p => p.id == idProduto)
    aumentarPreco(p.preco*-idsProdutoQuantidade[idProduto])
    const containerProdutosCarrinho= document.getElementById("produtos-carrinho")
    const produto = document.getElementById(idProduto)
    delete idsProdutoQuantidade[idProduto]
    salvarLocalStorage('carrinho', idsProdutoQuantidade)
    containerProdutosCarrinho.removeChild(produto)
}

export function desenharProduto(idProduto){
    const produto = catalogo.find(p => p.id == idProduto)
    
    const containerProdutosCarrinho= document.getElementById("produtos-carrinho")
    const elementoArticle = document.createElement('article')
    elementoArticle.id=`${idProduto}`
    const articleClasses = ["flex", "bg-slate-100", 'rounded-lg', 'p-1', 'relative']
    for( const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass)
    }
    const cartaoProdutoCarrinho = `
        <button id="fechar-carrinho-${produto.id}" class=" absolute top-0 right-2">
            <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
        </button>
        <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
        <div class="p-2 flex flex-col justify-between">
            <p class="text-slate-900 text-sm">${produto.nome}</p>
            <p class="text-slate-400 text-xs">Tamanho: M</p>
            <p class="text-green-700 text-lg">$${produto.preco}</p>
        </div>
        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
            <button id="decrementar-produto-${produto.id}">
                -
            </button>
            <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoQuantidade[produto.id]}</p>
            <button class="ml-2" id="incrementar-produto-${produto.id}">
                +
            </button>
        </div>
    `
    elementoArticle.innerHTML = cartaoProdutoCarrinho
    containerProdutosCarrinho.appendChild(elementoArticle)
    document.getElementById(`fechar-carrinho-${produto.id}`).addEventListener('click', ()=> {removerCarrinho(idProduto)})
    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click",() => decrementarQuantidade(produto.id))
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click",() => incrementarQuantidade(produto.id))

}

export function adicionarCarrinho(idProduto){
    if(idProduto in idsProdutoQuantidade){
        incrementarQuantidade(idProduto)
        return;
    }
    idsProdutoQuantidade[idProduto] = 0
    salvarLocalStorage('carrinho', idsProdutoQuantidade)
    desenharProduto(idProduto)
    incrementarQuantidade(idProduto)

    

}