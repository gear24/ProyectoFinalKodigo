import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../Services/Request";
import { MutatingDots } from "react-loader-spinner"; // Importamos el tipo de loader
import styles from "./bootcamps.module.css";

const Bootcamps = () => {
   const { getAllBootcamps, bootcamps, errorMessage } = useAuth();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [visibleItems, setVisibleItems] = useState(1); // Número de elementos visibles
   const carouselRef = useRef(null);

   const fetchBootcamps = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
         setError("No estás autenticado. Por favor, inicia sesión.");
         setLoading(false);
         return;
      }

      try {
         await getAllBootcamps(token); // llamada a getAllBootcamps con token
      } catch (error) {
         console.error("Error al obtener bootcamps:", error);
         setError("Error al obtener bootcamps.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchBootcamps();
   }, []); // Array vacío para ejecutar solo al montar el componente

   useEffect(() => {
      // Calcular cuántos elementos caben en la pantalla
      const updateVisibleItems = () => {
         if (carouselRef.current) {
            const cardWidth = carouselRef.current.querySelector(
               `.${styles.bootcampCard}`
            ).offsetWidth;
            const containerWidth = carouselRef.current.offsetWidth;
            setVisibleItems(Math.floor(containerWidth / cardWidth));
         }
      };

      updateVisibleItems();
      window.addEventListener("resize", updateVisibleItems);

      return () => window.removeEventListener("resize", updateVisibleItems);
   }, [bootcamps]);

   // Controles de carousel
   const handlePrev = () => {
      if (currentIndex > 0) {
         setCurrentIndex((prevIndex) => prevIndex - 1);
      }
   };

   const handleNext = () => {
      const maxIndex = Math.max(
         0,
         bootcamps.filter((bootcamp) => bootcamp.active).length - visibleItems
      );
      if (currentIndex < maxIndex) {
         setCurrentIndex((prevIndex) => prevIndex + 1);
      }
   };

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
      );
   }

   if (error || errorMessage) {
      return <h2>{error || errorMessage}</h2>;
   }

   return (
      <div className={styles.bootcamps}>
         <button
            className={`${styles.carouselButton} ${styles.left}`}
            onClick={handlePrev}
            disabled={currentIndex === 0} // Deshabilitar cuando está en el primer bootcamp
         >
            {"<"}
         </button>
         <div className={styles.carouselContainer} ref={carouselRef}>
            <div
               className={styles.carouselTrack}
               style={{
                  transform: `translateX(-${
                     currentIndex * (100 / visibleItems)
                  }%)`,
                  transition: "transform 0.3s ease-in-out",
               }}
            >
               {bootcamps
                  .filter((bootcamp) => bootcamp.active)
                  .map((bootcamp) => (
                     <div className={styles.bootcampCard} key={bootcamp.id}>
                        <h2>{bootcamp.name}</h2>
                        <p>{bootcamp.description}</p>
                        <p>Tecnologías: {bootcamp.technologies.join(", ")}</p>

                        <a href="/inscribete" className={styles.enrollButton}>
                           Inscríbete
                        </a>
                     </div>
                  ))}
            </div>
         </div>
         <button
            className={`${styles.carouselButton} ${styles.right}`}
            onClick={handleNext}
            disabled={
               currentIndex >=
               Math.max(
                  0,
                  bootcamps.filter((bootcamp) => bootcamp.active).length -
                     visibleItems
               )
            }
         >
            {">"}
         </button>
      </div>
   );
};

export default Bootcamps;
