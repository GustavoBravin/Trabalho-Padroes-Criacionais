abstract class entrega {
    abstract calcularTaxa(valor: number): number;
}


class entregadebicicleta extends entrega {
 calcularTaxa(valor: number): number {
     return 0.05* valor
 }
 criarPagamento(valor: number): number {
 return this.calcularTaxa(valor);
 }
}

class entregademoto extends entrega {
 calcularTaxa(valor: number): number {
     return 0.025 * valor
 }
 criarPagamento(valor: number): number {
 return this.calcularTaxa(valor);
 }
}

class entregadecarro extends entrega {
 calcularTaxa(valor: number): number {
     return 0.015 * valor
 }
 criarPagamento(valor: number): number {
 return this.calcularTaxa(valor);
 }
}

