# Padrões Criacionais utilizados

Sistema de pedidos de restaurante (delivery): o cliente escolhe o restaurante, monta o pedido, escolhe a entrega, o pedido é registrado e pode ser repetido.

| Parte do sistema | Padrão | Arquivo |
|---|---|---|
| Escolher a entrega | Factory Method | `src/entrega.ts` |
| Registrar o pedido | Singleton | `src/RegistroPedidos.ts` |
| Escolher o restaurante | Abstract Factory | `src/restaurante.ts` |
| Montar o pedido | Builder | `src/pedido.ts` |
| Repetir o pedido | Prototype | `src/pedido.ts` |

---

## Factory Method

**Onde:** `src/entrega.ts`, na classe `LogisticaEntrega` e nas subclasses `LogisticaBicicleta`, `LogisticaMoto` e `LogisticaCarro`.

**Problema:** o sistema tem vários tipos de entrega (bicicleta, moto e carro) e cada um tem uma taxa diferente. Se o código criasse a entrega direto com `new`, ele ficaria preso a uma classe específica.

**Por quê:** a classe `LogisticaEntrega` tem o método `criarEntrega()`, e cada subclasse decide qual entrega concreta vai ser criada. O método `calcularFrete()` usa a entrega sem saber qual é. Para adicionar um tipo novo de entrega, basta criar uma subclasse nova, sem alterar o código que já existe.

---

## Singleton

**Onde:** `src/RegistroPedidos.ts`, na classe `RegistroPedidos`.

**Problema:** todos os pedidos precisam ficar guardados em um único lugar. Se existissem dois registros, cada parte do sistema veria uma lista diferente de pedidos.

**Por quê:** o construtor é `private`, então ninguém consegue criar outro registro com `new`. O único jeito de acessar é pelo `getInstancia()`, que cria o registro na primeira vez e depois devolve sempre o mesmo objeto.

---

## Abstract Factory

**Onde:** `src/restaurante.ts`, na interface `RestauranteFactory` e nas fábricas `PizzariaFactory` e `JaponesFactory`.

**Problema:** cada restaurante tem uma família de produtos (prato, bebida e sobremesa) que combinam entre si. Os itens de um restaurante não podem se misturar com os de outro.

**Por quê:** cada fábrica cria a família inteira do seu restaurante. A `PizzariaFactory` cria pizza, refrigerante e petit gâteau, e a `JaponesFactory` cria temaki, chá verde e mochi. O resto do sistema usa só a interface `RestauranteFactory`, sem depender das classes concretas. Para adicionar um restaurante novo, basta criar uma fábrica nova.

---

## Builder

**Onde:** `src/pedido.ts`, na classe `PedidoBuilder`, que monta a classe `Pedido`.

**Problema:** o pedido tem várias partes (cliente, itens, entrega e observação), e algumas delas são opcionais, como a observação. Criar tudo isso de uma vez em um construtor com muitos parâmetros fica confuso.

**Por quê:** o `PedidoBuilder` monta o pedido passo a passo, com os métodos `paraCliente()`, `adicionarItem()`, `comEntrega()` e `comObservacao()`. Cada método devolve o próprio builder, então dá para encadear as chamadas. No final, o `build()` confere se o pedido tem cliente, itens e entrega antes de entregar o objeto pronto.

---

## Prototype

**Onde:** `src/pedido.ts`, na interface `Prototype` e no método `clonar()` da classe `Pedido`.

**Problema:** o cliente pode repetir um pedido que já fez. Montar tudo de novo com o Builder seria repetir trabalho.

**Por quê:** o método `clonar()` cria um pedido novo copiando o cliente, os itens, a entrega e a observação do pedido original. A lista de itens é copiada, então adicionar um item no clone não muda o pedido original. No `main.ts`, o cliente repete o pedido e adiciona uma sobremesa só no novo.

---

## Como os padrões se integram

No `src/main.ts`, o fluxo completo é:

1. O cliente escolhe o restaurante, e a fábrica (**Abstract Factory**) cria os itens.
2. O **Builder** monta o pedido com os itens, a entrega e a observação.
3. A entrega vem da `LogisticaEntrega` (**Factory Method**), que calcula o frete.
4. O pedido é guardado no `RegistroPedidos` (**Singleton**).
5. O cliente repete o pedido usando o `clonar()` (**Prototype**).
