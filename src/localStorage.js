import { atualizarPreco, desenharProduto, idsProdutoQuantidade} from "./menuCarrinho"
import { catalogo } from "./utilidades"

export function renderizarCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho")
    containerProdutosCarrinho.innerHTML = ""
    for(const idProduto in idsProdutoQuantidade){
        desenharProduto(idProduto)
    }
}

export function atualizarPrecoLocalStorage(idPreco){
    const precoCarrinho = document.getElementById(idPreco)
    let precoToTalCarrinho = 0
    for (const idProdutoCarrinho in idsProdutoQuantidade){
        precoToTalCarrinho += catalogo.find(p => p.id == idProdutoCarrinho).preco * idsProdutoQuantidade[idProdutoCarrinho]
    }
    precoCarrinho.innerText = `Total: $${precoToTalCarrinho}`
    atualizarPreco(precoToTalCarrinho)
}