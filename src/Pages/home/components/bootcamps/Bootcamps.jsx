import { useEffect, useState } from "react";
import { useAuth } from "../../../../Services/Request";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner"; // Importamos el tipo de loader
import styles from "./bootcamps.module.css";

export const Bootcamps = () => {
   const { getAllBootcamps } = useAuth();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [bootcamps, setBootcamps] = useState([]);

   const fetchBootcamps = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
         setError("No estás autenticado. Por favor, inicia sesión.");
         setLoading(false);
         return;
      }

      try {
         const fetchedBootcamps = await getAllBootcamps(token);
         setBootcamps(Array.isArray(fetchedBootcamps) ? fetchedBootcamps : []);
      } catch (error) {
         console.error("Error al obtener bootcamps:", error);
         setError("Error al obtener bootcamps.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchBootcamps();
   }, [getAllBootcamps, bootcamps]);

   if (loading) {
      return (
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
            }}
         >
            <MutatingDots color="#00BFFF" height={100} width={100} />
         </div>
      ); // Loader
   }

   if (error) {
      return <h2>{error}</h2>; // Mostrar mensaje de error
   }

   return (
      <div className={styles.bootcamps}>
         <div className={styles.bootcampCards}>
            {bootcamps
               .filter((bootcamp) => bootcamp.active)
               .map((bootcamp) => (
                  <div className={styles.bootcampCard} key={bootcamp.id}>
                     <h2>{bootcamp.name}</h2>
                     <p>{bootcamp.description}</p>
                     <p>Tecnologías: {bootcamp.technologies.join(", ")}</p>
                  </div>
               ))}
         </div>
      </div>
   );
};
