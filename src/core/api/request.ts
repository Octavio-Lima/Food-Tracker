type methods = "post" | "get" | "put" | "delete";

export class API {
    headers: any = {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "X-CSRFToken": document.querySelector<HTMLInputElement>("[name=csrfmiddlewaretoken]")?.value ?? "Erro",
    };

    args = (method: methods, body?: Object): RequestInit => ({
        method: method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : null,
    });

    get = async (url: string) => await fetch(url, this.args("get"));
    post = async (url: string, body: Object) => await fetch(url, this.args("post", body));
    put = async (url: string, body: Object) => await fetch(url, this.args("put", body));
    delete = async (url: string) => await fetch(url, this.args("delete"));
}
