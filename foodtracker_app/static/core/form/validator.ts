import { ValidatorRules } from "./validator-rules.js";

export class Validator {
  errorMessage: string[] = [];
  rules = new ValidatorRules();

  isValid(input: string): boolean {
    return false;
  }

  validateErrors() {
    this.errorMessage = this.errorMessage.filter((v) => v != "");
    return this.errorMessage.length == 0;
  }
}

export class RequiredValidator extends Validator {
  isValid(input: string): boolean {
    this.errorMessage = [];

    this.errorMessage.push(this.rules.isEmpty(input));

    return this.validateErrors();
  }
}

export class PhoneValidator extends Validator {
  isValid(input: string): boolean {
    this.errorMessage = [];

    this.errorMessage.push(this.rules.invalidPhone(input));

    return this.validateErrors();
  }
}

export class MoneyValidator extends Validator {
  isValid(input: string): boolean {
    this.errorMessage = [];

    this.errorMessage.push(this.rules.isNanMoney(input));

    return this.validateErrors();
  }
}
