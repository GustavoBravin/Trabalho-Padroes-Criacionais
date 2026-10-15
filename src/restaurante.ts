// ===== Produtos (cada restaurante tem prato, bebida e sobremesa) =====
export interface Prato {
  nome(): string;
  preco(): number;
}

export interface Bebida {
  nome(): string;
  preco(): number;
}

export interface Sobremesa {
  nome(): string;
  preco(): number;
}

// ===== Produtos da pizzaria =====
export class Pizza implements Prato {
  nome() { return "Pizza"; }
  preco() { return 60; }
}

export class Refrigerante implements Bebida {
  nome() { return "Refrigerante"; }
  preco() { return 8; }
}

export class PetitGateau implements Sobremesa {
  nome() { return "Petit gâteau"; }
  preco() { return 20; }
}

// ===== Produtos do japonês =====
export class Temaki implements Prato {
  nome() { return "Temaki"; }
  preco() { return 35; }
}

export class ChaVerde implements Bebida {
  nome() { return "Chá verde"; }
  preco() { return 7; }
}

export class Mochi implements Sobremesa {
  nome() { return "Mochi"; }
  preco() { return 15; }
}

// ===== Abstract Factory =====
export interface RestauranteFactory {
  criarPrato(): Prato;
  criarBebida(): Bebida;
  criarSobremesa(): Sobremesa;
}

export class PizzariaFactory implements RestauranteFactory {
  criarPrato() { return new Pizza(); }
  criarBebida() { return new Refrigerante(); }
  criarSobremesa() { return new PetitGateau(); }
}

export class JaponesFactory implements RestauranteFactory {
  criarPrato() { return new Temaki(); }
  criarBebida() { return new ChaVerde(); }
  criarSobremesa() { return new Mochi(); }
}
