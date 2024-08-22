import { makeRequest } from "../request.js";
import { Device } from "./device-listing.js";

export async function DeleteDevice(device: Device) {
  let url = `/new-device/?id=${device.id}`;
  return await makeRequest(url, "delete");
}
