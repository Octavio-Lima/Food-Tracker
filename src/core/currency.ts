export class Currency {
  static toCurrency(value: number): string {
    // Converter para int
    let cents = Math.floor(value * 100);

    let leftSide = "0";
    let rightSide = "00";

    // Se não for um numero, retornar uma string formatada corretamente
    if (isNaN(cents)) {
      return `R$ 0,00`;
    } else if (cents > 99 || cents < -99) {
      // Se for mais de 100 (ou -100 se for negativo) centavos
      // tem que separar o lado esquerdo e direito

      // Obter lado esquerdo
      leftSide = cents.toString().slice(0, -2);

      // Inverter
      leftSide = leftSide.split("").reverse().join("");

      // Agrupar em 3, e juntar os resultados com um ponto
      let grouped = leftSide.match(/.{1,3}/g)!.join(".");

      // separar tudo, reverter, e juntar de volta corretamente
      leftSide = grouped.split("").reverse().join("");

      // Centavos
      rightSide = PadNumber(parseInt(cents.toString().slice(-2)));
    } else {
      // Centavos
      rightSide = PadNumber(cents);
    }

    return `R$ ${leftSide},${rightSide}`;
  }

  static centsToCurrency(cents: number): string {
    // Converter para int
    cents = Math.floor(cents);

    let leftSide = "0";
    let rightSide = "00";

    // Se não for um numero, retornar uma string formatada corretamente
    if (isNaN(cents)) {
      return `R$ 0,00`;
    } else if (cents > 99 || cents < -99) {
      // Se for mais de 100 (ou -100 se for negativo) centavos
      // tem que separar o lado esquerdo e direito

      // Obter lado esquerdo
      leftSide = cents.toString().slice(0, -2);

      // Inverter
      leftSide = leftSide.split("").reverse().join("");

      // Agrupar em 3, e juntar os resultados com um ponto
      let grouped = leftSide.match(/.{1,3}/g)!.join(".");

      // separar tudo, reverter, e juntar de volta corretamente
      leftSide = grouped.split("").reverse().join("");

      // Centavos
      rightSide = PadNumber(parseInt(cents.toString().slice(-2)));
    } else {
      // Centavos
      rightSide = PadNumber(cents);
    }

    return `R$ ${leftSide},${rightSide}`;
  }

  // Converter string para centavos (int)
  static toFloat(value: string): number {
    // Remover texto e espaço sobrando
    value = value.replace("R", "").replace("$", "").trim();

    // Remover pontos, virgulas, e converter para int
    return parseFloat(value.replace(/[\.]/g, "").replace(",", "."));
  }

  // Converter string para centavos (int)
  static toCents(value: string): number {
    // Remover texto e espaço sobrando
    value = value.replace("R", "").replace("$", "").trim();

    // Remover pontos, virgulas, e converter para int
    return parseInt(value.replace(/[\.\,]/g, ""));
  }
}

export function PadNumber(number: number = 0) {
  let result;

  if (number < 0) result = (number > -10 ? "-0" : "-") + number * -1;
  else result = (number < 10 ? "0" : "") + number;

  return result;
}
