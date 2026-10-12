export class RegistroPedidos {
  private static instancia: RegistroPedidos;
  private pedidos: string[] = [];

  // construtor privado: ninguém de fora consegue dar "new"
  private constructor() {}

  static getInstancia(): RegistroPedidos {
    if (!RegistroPedidos.instancia) {
      RegistroPedidos.instancia = new RegistroPedidos();
    }
    return RegistroPedidos.instancia;
  }

  registrar(pedido: string) {
    this.pedidos.push(pedido);
  }

  listar() {
    return this.pedidos;
  }
}
