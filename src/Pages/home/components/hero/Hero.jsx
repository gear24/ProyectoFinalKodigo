import { Search } from "lucide-react";
import styles from "./Hero.module.css";
export const Hero = () => {
   return (
      <section className={styles.hero}>
         <div className={styles.container}>
            <div className={styles.content}>
               <h1 className={styles.title}>
                  Transforma tu pasión en tu profesión
               </h1>
               <p className={styles.subtitle}>
                  Estudia una carrera tecnológica y descubre tu potencial para
                  recodificar el futuro
               </p>
               <div className={styles.searchBar}>
                  <input
                     type="text"
                     placeholder="¿Qué quieres estudiar?"
                     className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchButton}>
                     <Search size={24} />
                     <span>¡Vamos!</span>
                  </button>
               </div>
            </div>
            <div className={styles.images}>
               <img
                  src="https://cdn-knihf.nitrocdn.com/ibKONdxVNJApfXYlVVFSuGXgWUgPJrvN/assets/images/optimized/rev-e3a39df/kodigowebstorage.blob.core.windows.net/kodigowebsite/2023/11/programmers-cooperating-at-information-technology-2021-08-26-17-34-31-utc-copy-1.webp"
                  alt="People working on laptops"
                  className={styles.image}
               />
               <img
                  src="https://cdn-knihf.nitrocdn.com/ibKONdxVNJApfXYlVVFSuGXgWUgPJrvN/assets/images/optimized/rev-e3a39df/kodigowebstorage.blob.core.windows.net/kodigowebsite/2023/11/company-employees-gathered-for-morning-briefing-in-2022-01-27-16-28-38-utc-copy-1.webp"
                  alt="Team collaborating"
                  className={styles.image}
               />
            </div>
         </div>
      </section>
   );
};
