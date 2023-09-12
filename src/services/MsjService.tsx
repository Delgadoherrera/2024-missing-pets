export class MensajesService {
  getAllMyMsg(id: any) {
    return fetch(`https://backend.missingpets.art/mensajes/getAllMyMsg/${id}`)
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getMessages(id: any, emisor: any) {
    return fetch(
      `https://backend.missingpets.art/mensajes/getMessagesById/${id}/${emisor}`
    )
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
