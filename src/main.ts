import { LogisticaMoto, LogisticaCarro, LogisticaBicicleta } from "./entrega";
import { RegistroPedidos } from "./RegistroPedidos";

const registro = RegistroPedidos.getInstancia();

const moto = new LogisticaMoto();
registro.registrar("Pizza R$80 - frete moto R$" + moto.calcularFrete(80).toFixed(2));

const carro = new LogisticaCarro();
registro.registrar("Sushi R$120 - frete carro R$" + carro.calcularFrete(120).toFixed(2));

const bicicleta = new LogisticaBicicleta();
registro.registrar("Hamburguer R$40 - frete bicicleta R$" + bicicleta.calcularFrete(40).toFixed(2));

console.log(registro.listar());

// prova do Singleton: pegando de novo, é o mesmo registro
console.log("Mesma instância?", RegistroPedidos.getInstancia() === registro);
