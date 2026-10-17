import { LogisticaMoto, LogisticaCarro } from "./entrega";
import { RegistroPedidos } from "./RegistroPedidos";
import { PizzariaFactory, JaponesFactory, RestauranteFactory } from "./restaurante";
import { PedidoBuilder } from "./pedido";

const registro = RegistroPedidos.getInstancia();

// cliente escolhe o restaurante (Abstract Factory)
const pizzaria: RestauranteFactory = new PizzariaFactory();
const japones: RestauranteFactory = new JaponesFactory();

// monta o pedido (Builder) e escolhe a entrega (Factory Method)
const pedido1 = new PedidoBuilder()
  .paraCliente("Ana")
  .adicionarItem(pizzaria.criarPrato())
  .adicionarItem(pizzaria.criarBebida())
  .comEntrega(new LogisticaMoto())
  .comObservacao("sem cebola")
  .build();

const pedido2 = new PedidoBuilder()
  .paraCliente("Bruno")
  .adicionarItem(japones.criarPrato())
  .adicionarItem(japones.criarBebida())
  .adicionarItem(japones.criarSobremesa())
  .comEntrega(new LogisticaCarro())
  .build();

// pedido é registrado (Singleton)
registro.registrar(pedido1.resumo());
registro.registrar(pedido2.resumo());

console.log(registro.listar());

// prova do Singleton: pegando de novo, é o mesmo registro
console.log("Mesma instância?", RegistroPedidos.getInstancia() === registro);
