import { Prato, Bebida, Sobremesa } from "./restaurante";
import { LogisticaEntrega } from "./entrega";

export type Item = Prato | Bebida | Sobremesa;

// ===== Produto (o objeto que o Builder monta) =====
export class Pedido {
  cliente = "";
  itens: Item[] = [];
  entrega!: LogisticaEntrega;
  observacao = "";

  subtotal(): number {
    return this.itens.reduce((soma, item) => soma + item.preco(), 0);
  }

  frete(): number {
    return this.entrega.calcularFrete(this.subtotal());
  }

  total(): number {
    return this.subtotal() + this.frete();
  }

  resumo(): string {
    const nomes = this.itens.map((item) => item.nome()).join(", ");
    let texto = this.cliente + ": " + nomes + " - total R$" + this.total().toFixed(2);
    if (this.observacao) {
      texto += " (obs: " + this.observacao + ")";
    }
    return texto;
  }
}

// ===== Builder =====
export class PedidoBuilder {
  private pedido = new Pedido();

  paraCliente(nome: string): PedidoBuilder {
    this.pedido.cliente = nome;
    return this;
  }

  adicionarItem(item: Item): PedidoBuilder {
    this.pedido.itens.push(item);
    return this;
  }

  comEntrega(entrega: LogisticaEntrega): PedidoBuilder {
    this.pedido.entrega = entrega;
    return this;
  }

  comObservacao(texto: string): PedidoBuilder {
    this.pedido.observacao = texto;
    return this;
  }

  build(): Pedido {
    if (!this.pedido.cliente) throw new Error("Pedido sem cliente");
    if (this.pedido.itens.length === 0) throw new Error("Pedido sem itens");
    if (!this.pedido.entrega) throw new Error("Pedido sem entrega");
    return this.pedido;
  }
}
