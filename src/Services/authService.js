const API_URI = "http://localhost:5000";

export const login = async (user) => {
   try {
      const response = await fetch(`${API_URI}/api/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
         // Si la respuesta no es exitosa, lanzamos el error usando el atributo `message`
         throw new Error(data.message || "Error al iniciar sesión");
      }
      return data;
   } catch (error) {
      if (error.response) {
         // La petición se realizó y el servidor respondió con un código de estado fuera del rango 2xx
         console.error(
            `Error ${error.response.status}: ${
               error.response.data.message || "Error en el servidor"
            }`
         );
         throw new Error(
            `Error ${error.response.status}: ${
               error.response.data.message || "Error en el servidor"
            }`
         );
      } else if (error.request) {
         // La petición se hizo pero no hubo respuesta
         console.error("No hubo respuesta del servidor");
         throw new Error("No hubo respuesta del servidor");
      } else {
         // Error al configurar la petición
         console.error("Error al hacer la petición:", error.message);
         throw new Error(error.message);
      }
   }
};

export const register = async (user) => {
   try {
      const response = await fetch(`${API_URI}/api/auth/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
         // Si la respuesta no es exitosa, lanzamos el error usando el atributo `message`
         throw new Error(data.message || "Error al registrar usuario.");
      }
      return data;
   } catch (error) {
      if (error.response) {
         // La petición se realizó y el servidor respondió con un código de estado fuera del rango 2xx
         console.error(
            `Error ${error.response.status}: ${
               error.response.data.message || "Error en el servidor"
            }`
         );
         throw new Error(
            `Error ${error.response.status}: ${
               error.response.data.message || "Error en el servidor"
            }`
         );
      } else if (error.request) {
         // La petición se hizo pero no hubo respuesta
         console.error("No hubo respuesta del servidor");
         throw new Error("No hubo respuesta del servidor");
      } else {
         // Error al configurar la petición
         console.error("Error al hacer la petición:", error.message);
         throw new Error(error.message);
      }
   }
};
