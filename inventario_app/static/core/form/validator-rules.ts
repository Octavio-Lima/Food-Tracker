export class ValidatorRules {
  isEmpty(input: string) {
    return input.length == 0 ? "Este campo é obrigatório" : "";
  }

  hasSpace(input: string) {
    return input.match(/\s/) ? "Este campo não pode conter espaço" : "";
  }

  invalidPhone(input: string): string {
    return input.replace(/\D/g, "").length < 10 && input.replace(/\D/g, "").length > 0
      ? "Número informado inválido"
      : "";
  }

  tooShort(input: string): string {
    return input.length < 8 ? "A senha deve conter no mínimo 8 caractéres" : "";
  }

  noNumbers(input: string): string {
    return !input.match(/\d/) ? "A senha deve conter pelo menos um número" : "";
  }

  noLetters(input: string): string {
    return !input.match(/\D/) ? "A senha deve conter pelo menos uma letra" : "";
  }

  noUpperLowerLetters(input: string): string {
    return !input.match(/[A-Z]/) || !input.match(/[a-z]/)
      ? "A senha deve conter pelo menos uma letra minuscula e uma maiuscula"
      : "";
  }

  noPasswordMatch(password: string, confirm: string): string {
    return confirm != password ? "A senha informada está incorreta" : "";
  }

  invalidEmail(input: string): string {
    let validEmail = String(input)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    return !validEmail ? "E-Mail inválido" : "";
  }

  isNanMoney(value: string): string {
    return value.toLowerCase().includes("nan") ? "Valor inválido" : "";
  }
}
