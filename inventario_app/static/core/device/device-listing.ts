export function GetDeviceList(): Device[] {
  let deviceList: Device[] = [];

  document.querySelectorAll<HTMLTableRowElement>(".device").forEach((device) => deviceList.push(new Device(device)));

  return deviceList;
}

export class Device {
  id: number;
  nome: string;
  tipoDispositivo: string;
  marca: string;
  patri: string;
  numeroCelular: string;
  numeroConta: string;
  usuario: string;
  status: string;
  valor: number;
  serial: string;
  reparos: boolean;
  element: Element;

  constructor(entry: Element) {
    const json = this.#parse(entry.getAttribute("data-device")!);

    this.id = json["id"];
    this.nome = json["nome"];
    this.tipoDispositivo = json["tipoDispositivo"];
    this.marca = json["marca"];
    this.patri = json["patri"];
    this.numeroCelular = json["numeroCelular"];
    this.numeroConta = json["numeroConta"];
    this.usuario = json["usuario"];
    this.status = json["status"];
    this.valor = json["valor"];
    this.serial = json["serial"];
    this.reparos = json["reparos"];

    this.element = entry;
  }

  #parse(data: string) {
    let parsed = data.replace(/False/g, "false").replace(/True/g, "true").replace(/'/g, '"').replace(/None/g, "null");

    return JSON.parse(parsed);
  }

  display() {
    this.element.classList.remove("hide");
  }

  hide() {
    this.element.classList.add("hide");
  }
}
