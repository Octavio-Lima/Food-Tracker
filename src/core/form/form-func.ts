export class Forms {
    static get(form: HTMLElement, query: string, nullValue = ""): string {
        let el = form.querySelector<HTMLInputElement>(query)?.value ?? nullValue;

        return el;
    }

    static getText(form: HTMLElement, query: string, nullValue = ""): string {
        let el = form.querySelector<HTMLInputElement>(query)?.textContent ?? nullValue;

        return el;
    }

    static getInt = (form: HTMLElement, query: string, nullValue = ""): number =>
        parseInt(form.querySelector<HTMLInputElement>(query)?.value ?? nullValue ?? "0");

    static set(form: HTMLElement, query: string, value: string) {
        let el = form.querySelector<HTMLInputElement>(query);
        if (el) el.value = value;
    }

    static setText(form: HTMLElement, query: string, value: string) {
        let el = form.querySelector<HTMLInputElement>(query);
        if (el) el.textContent = value;
    }

    static getTextInt(form: HTMLElement, query: string, nullValue = 0): number {
        let txt = form.querySelector<HTMLInputElement>(query)?.textContent;
        let val = parseInt(txt ?? nullValue.toString());

        return isNaN(val) ? nullValue : val;
    }
}
