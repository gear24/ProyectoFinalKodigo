import styles from "./financialBanner.module.css";

export const FinancialBanner = () => {
   return (
      <div className={styles.banner}>
         <div className={styles.imageContainer}>
            <img
               src="https://cdn-knihf.nitrocdn.com/ibKONdxVNJApfXYlVVFSuGXgWUgPJrvN/assets/images/optimized/rev-e3a39df/kodigowebstorage.blob.core.windows.net/kodigowebsite/2023/12/scc-home1-1024x576.png"
               alt="Estudiantes trabajando en computadoras"
               width={400}
               height={300}
               className={styles.image}
            />
         </div>
         <div className={styles.content}>
            <h2 className={styles.title}>
               ¿Necesitas ayuda para{" "}
               <span className={styles.highlight}>financiar tus estudios?</span>
            </h2>
            <p className={styles.description}>
               Conoce el Acuerdo de Ingresos Compartidos
            </p>
            <button className={styles.button}>Más Información</button>
         </div>
      </div>
   );
};
