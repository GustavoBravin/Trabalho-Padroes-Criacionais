# Trabalho-Padroes-Criacionais
Um repositorio referente a um trabalho de padrão de projetos que será realizado em sala de aula

## Sobre o sistema
Sistema de pedidos de restaurante (delivery) feito em TypeScript. O cliente escolhe o restaurante, monta o pedido, escolhe a entrega, o pedido é registrado e pode ser repetido.

O sistema usa os cinco padrões criacionais: Factory Method, Abstract Factory, Builder, Prototype e Singleton.

## Como rodar
É preciso ter o [Node.js](https://nodejs.org) instalado.

```bash
npx tsx src/main.ts
```

## Estrutura
```
├── src/
│   ├── entrega.ts           (Factory Method)
│   ├── RegistroPedidos.ts   (Singleton)
│   ├── restaurante.ts       (Abstract Factory)
│   ├── pedido.ts            (Builder e Prototype)
│   └── main.ts              (sistema rodando)
├── docs/
│   ├── TEMA.md              (domínio do sistema)
│   └── PADROES.md           (explicação dos padrões)
└── README.md
```
