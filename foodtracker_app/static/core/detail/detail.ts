import { Device } from "../device/device-listing.js";
import { Currency } from "../currency.js";

export function setDetailValues(device: Device) {
  set("nome", device.nome);
  set("tipoDispositivo", device.tipoDispositivo);
  set("marca", device.marca);
  set("patri", device.patri);
  set("numeroCelular", device.numeroCelular);
  set("usuario", device.usuario);
  set("status", device.status);
  set("valor", Currency.toCurrency(device.valor));
}

const set = (name: string, value: string) =>
  (document.querySelector(`#detail-table [name="${name}"]`)!.textContent = value);
