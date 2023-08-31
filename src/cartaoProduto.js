import { catalogo } from "./utilidades"
import { adicionarCarrinho } from "./menuCarrinho"

export function renderizarCatalogo(){
    for(const produtoCatalogo of catalogo){
        const cartaoProduto = `
            <div class="boder-solid border-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg w-48 m-2 group " id="card-produto-${produtoCatalogo.id}">
                <img src="./assets/img/${produtoCatalogo.imagem}" 
                    class="group-hover:scale-110 duration-300 my-3 rounded-lg"
                    alt="Produto 1"
                />
                <p class="text-sm">${produtoCatalogo.marca}</p>
                <p class="text-sm">${produtoCatalogo.nome}</p>
                <p class="text-sm">$${produtoCatalogo.preco}</p>
                <button class="bg-slate-950 text-slate-200 hover:bg-slate-700" id="adicionar-${produtoCatalogo.id}">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>

            </div>
        `
        document.getElementById("container-produto").innerHTML += cartaoProduto
    }
    
    for (const produtoCatalogo of catalogo){
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener("click", ()=>adicionarCarrinho(produtoCatalogo.id))
        
    }
}