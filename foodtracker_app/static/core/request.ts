export async function makeRequest(url: string, method: "post" | "get" | "put" | "delete", body?: string) {
  let headers: any = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  };

  if (method == "post" || method == "put" || method == "delete") {
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]") as HTMLInputElement | null;
    headers["X-CSRFToken"] = csrf?.value ?? "Token Não Encontrado";
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
  });

  return response;
}
