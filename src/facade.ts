import { LogisticaEntrega, LogisticaBicicleta, LogisticaMoto, LogisticaCarro } from "./entrega";
import { RestauranteFactory, PizzariaFactory, JaponesFactory } from "./restaurante";
import { Pedido, PedidoBuilder } from "./pedido";
import { RegistroPedidos } from "./RegistroPedidos";

// ===== Facade =====
// uma interface simples que esconde todas as partes do sistema de pedidos
export class PedidoFacade {
  private registro = RegistroPedidos.getInstancia();

  private escolherRestaurante(nome: string): RestauranteFactory {
    if (nome === "pizzaria") return new PizzariaFactory();
    if (nome === "japones") return new JaponesFactory();
    throw new Error("Restaurante não existe: " + nome);
  }

  private escolherEntrega(tipo: string): LogisticaEntrega {
    if (tipo === "bicicleta") return new LogisticaBicicleta();
    if (tipo === "moto") return new LogisticaMoto();
    if (tipo === "carro") return new LogisticaCarro();
    throw new Error("Entrega não existe: " + tipo);
  }

  // faz o pedido de um combo (prato, bebida e sobremesa) com uma chamada só
  fazerPedido(cliente: string, restaurante: string, entrega: string, observacao = ""): Pedido {
    const fabrica = this.escolherRestaurante(restaurante);

    const builder = new PedidoBuilder()
      .paraCliente(cliente)
      .adicionarItem(fabrica.criarPrato())
      .adicionarItem(fabrica.criarBebida())
      .adicionarItem(fabrica.criarSobremesa())
      .comEntrega(this.escolherEntrega(entrega));

    if (observacao) {
      builder.comObservacao(observacao);
    }

    const pedido = builder.build();
    this.registro.registrar(pedido.resumo());
    return pedido;
  }

  repetirPedido(pedido: Pedido): Pedido {
    const copia = pedido.clonar();
    this.registro.registrar(copia.resumo());
    return copia;
  }

  relatorio(): string[] {
    return this.registro.listar();
  }
}
