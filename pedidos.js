import { lerLocalStorage, desenharProdutoSimples } from "./src/utilidades";

function criarPedidoHistorico(compra){
    const elementoPedido = `
    <p class="text-xl text-bold my-4">
        ${new Date(compra.dataPedido).toLocaleDateString(navigator.language, {hour:'2-digit', minute:'2-digit'})}
    </p>
    <section id="container-pedido-${compra.dataPedido}" class="bg-slate-300 p-3 rounded-md">
    </section>
    `
    const main = document.getElementsByTagName("main")[0]
    main.innerHTML += elementoPedido

    for(const idProduto in compra.pedido){
        desenharProdutoSimples(idProduto,`container-pedido-${compra.dataPedido}`, compra.pedido[idProduto])
    }
}       

function renderizarHistoricoPedidos(){
    const historico = lerLocalStorage('historico')
    for(const compra of historico){
        criarPedidoHistorico(compra)
    }
}

renderizarHistoricoPedidos()