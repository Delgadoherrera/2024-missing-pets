import axios, { AxiosResponse } from "axios";

interface Position {
  latitude: number;
  longitude: number;
}

interface PetImage {
  base64String: string;
}

export class PetServiceWeb {
  async newPetFound(
    value: any,
    position: Position,
    image: PetImage,
    email: string
  ): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://backend.missingpets.art/mascotas/nuevaMascotaPerdida/`,
        {
          position: position,
          value: value,
          image: image,
          email: email,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating new pet:", error);
      return null;
    }
  }
  async getNearPets(petDistance: number, position: Position): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://backend.missingpets.art/mascotas/mascotasPerdidas/`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
            distanceSlider: petDistance,
            latitude: position.latitude,
            longitude: position.longitude,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting nearby pets:", error);
      return null;
    }
  }
  async getMyPets(mail: string): Promise<any> {
    try {
      const response = await fetch(
        `https://backend.missingpets.art/mascotas/getMyPets/${mail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  async searchMyPet(petId: string, coords: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://backend.missingpets.art/mascotas/mascotaPerdida/${petId}`,
        {
          coords: coords,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching for pet:", error);
      return null;
    }
  }
  async editPet(petToEdit: any, data: any): Promise<void> {
    try {
      await axios.post(
        `https://backend.missingpets.art/mascotas/editarMascota/${petToEdit.idMascota}`,
        {
          file: "fotoMascota",
          formData: data,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error editing pet:", error);
    }
  }
  async startAdoption(petToEdit: any): Promise<void> {
    try {
      await axios.post(
        `https://backend.missingpets.art/mascotas/startAdoption/${petToEdit}`,
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
  async quitAdoption(petToEdit: any): Promise<void> {
    try {
      await axios.post(
        `https://backend.missingpets.art/mascotas/quitAdoption/${petToEdit}`,
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
  async addMyPet(formData: any, file: any, email: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "https://backend.missingpets.art/mascota/register",
        {
          file: file,
          formData: formData,
          user: email,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding pet:", error);
      return null;
    }
  }
  async stopSearch(petToEdit: any): Promise<void> {
    try {
      await axios.post(
        `https://backend.missingpets.art/mascotas/stopSearch/${petToEdit}`,
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
  async deletePet(petToEdit: any): Promise<void> {
    try {
      await axios.post(
        `https://backend.missingpets.art/mascotas/borrarMascota/${petToEdit}`,
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
