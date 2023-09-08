import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtroCatalogo";
import { renderizarCarrinho, atualizarPrecoLocalStorage } from "./src/localStorage";
import { inicializarCarrinho } from "./src/menuCarrinho";

renderizarCatalogo()
renderizarCarrinho()
inicializarCarrinho()
atualizarPrecoLocalStorage("preco-total")
inicializarFiltros()