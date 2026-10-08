export abstract class entrega {
  abstract calcularTaxa(valor: number): number;
}

export class entregadebicicleta extends entrega {
  calcularTaxa(valor: number): number {
    return 0.05 * valor;
  }
}

export class entregademoto extends entrega {
  calcularTaxa(valor: number): number {
    return 0.025 * valor;
  }
}

export class entregadecarro extends entrega {
  calcularTaxa(valor: number): number {
    return 0.015 * valor;
  }
}

export abstract class LogisticaEntrega {
  abstract criarEntrega(): entrega;

  calcularFrete(valor: number): number {
    const e = this.criarEntrega();
    return e.calcularTaxa(valor);
  }
}

export class LogisticaBicicleta extends LogisticaEntrega {
  criarEntrega(): entrega { return new entregadebicicleta(); }
}

export class LogisticaMoto extends LogisticaEntrega {
  criarEntrega(): entrega { return new entregademoto(); }
}

export class LogisticaCarro extends LogisticaEntrega {
  criarEntrega(): entrega { return new entregadecarro(); }
}