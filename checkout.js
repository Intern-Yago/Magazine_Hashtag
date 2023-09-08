import { atualizarPrecoLocalStorage } from "./src/localStorage";
import { apagarLocalStorage, desenharProdutoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

function desenharProdutosCheckout(){
    const idsProdutoQuantidade = lerLocalStorage("carrinho") ?? {}
    for(const idProduto in idsProdutoQuantidade){
        desenharProdutoSimples(idProduto, "container-produtos-checkout", idsProdutoQuantidade[idProduto])
    
    }
}

function finalizarCompra(e){
    e.preventDefault()
    const idsProdutoQuantidade = lerLocalStorage("carrinho") ?? {}
    if(Object.keys(idsProdutoQuantidade).length === 0){
        return
    }
    const dataAtual = new Date()
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoQuantidade
    }
    const historicoPedidos = lerLocalStorage("historico") ?? []
    const historicoPedidosAtualizado = [pedidoFeito, ...historicoPedidos]
    salvarLocalStorage("historico", historicoPedidosAtualizado)

    apagarLocalStorage("carrinho")
    window.location.href = './pedidos.html'
}

document.addEventListener('submit', (e) => finalizarCompra(e))

desenharProdutosCheckout()
atualizarPrecoLocalStorage("preco-total")
