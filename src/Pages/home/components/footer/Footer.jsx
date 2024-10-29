import styles from "./Footer.module.css";

export const Footer = () => {
   return (
      <footer className={styles.footer}>
         <div className={styles.container}>
            <div className={styles.newsletter}>
               <h2 className={styles.newsletterTitle}>
                  SUSCRÍBETE A NUESTRO NEWSLETTER
               </h2>
               <p className={styles.newsletterDescription}>
                  Recibe noticias sobre nuestros programas.
               </p>
               <form className={styles.newsletterForm}>
                  <input
                     type="email"
                     placeholder="Email"
                     className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterButton}>
                     ENVIAR
                  </button>
               </form>
            </div>

            <div className={styles.linksContainer}>
               <div className={styles.linkColumn}>
                  <h3>Bootcamps</h3>
                  <a href="#">AI for Business</a>
                  <a href="#">Programming</a>
                  <a href="#">Fundamentals</a>
                  <a href="#">Data Fundamentals</a>
                  <a href="#">Full Stack Jr.</a>
                  <a href="#">Java Developer</a>
                  <a href="#">Data Analyst Jr.</a>
               </div>
               <div className={styles.linkColumn}>
                  <h3>Nosotros</h3>
                  <a href="#">Somos Kodigo</a>
                  <a href="#">FAQs</a>
                  <a href="#">AIC</a>
                  <a href="#">Blogs</a>
                  <a href="#">Alianzas</a>
               </div>
               <div className={styles.linkColumn}>
                  <h3>Profesional</h3>
                  <a href="#">KodiJobs</a>
                  <a href="#">Careers</a>
               </div>
            </div>

            <p className={styles.copyright}>
               Copyright © 2024 Kodigo. All Rights Reserved
            </p>
         </div>
      </footer>
   );
};
