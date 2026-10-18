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

// cliente repete o pedido (Prototype) e adiciona uma sobremesa só no novo
const pedido3 = pedido1.clonar();
pedido3.adicionarItem(pizzaria.criarSobremesa());
registro.registrar(pedido3.resumo());

console.log(registro.listar());

// prova do Prototype: o clone é outro objeto e o original não mudou
console.log("Clone é outro pedido?", pedido3 !== pedido1);
console.log("Original continua igual:", pedido1.resumo());

// prova do Singleton: pegando de novo, é o mesmo registro
console.log("Mesma instância?", RegistroPedidos.getInstancia() === registro);
