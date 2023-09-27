import axios from "axios";

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

  async deleteConv(data: any): Promise<void> {
    try {
      await axios.post(
        `https://backend.missingpets.art/mensajes/borrarConversacion`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error adopting pet:", error);
    }
  }
}
