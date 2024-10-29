import { Users, Briefcase, TrendingUp, DollarSign } from "lucide-react";
import styles from "./Stats.module.css";

export const Stats = () => {
   return (
      <section className={styles.stats}>
         <div className={styles.container}>
            <div className={styles.statItem}>
               <Users className={styles.icon} />
               <h3 className={styles.statValue}>4 MILLONES</h3>
               <p className={styles.statLabel}>
                  DE VACANTES EN TECNOLOGÍA PARA 2030
               </p>
            </div>
            <div className={styles.statItem}>
               <Briefcase className={styles.icon} />
               <h3 className={styles.statValue}>70%</h3>
               <p className={styles.statLabel}>
                  EMPLEADOS EN COMPAÑÍAS TOP TECH
               </p>
            </div>
            <div className={styles.statItem}>
               <TrendingUp className={styles.icon} />
               <h3 className={styles.statValue}>67%</h3>
               <p className={styles.statLabel}>
                  DE NUEVOS EMPLEOS EN TECNOLOGÍA
               </p>
            </div>
            <div className={styles.statItem}>
               <DollarSign className={styles.icon} />
               <h3 className={styles.statValue}>40%</h3>
               <p className={styles.statLabel}>MÁS DE INGRESOS PROMEDIO</p>
            </div>
         </div>
      </section>
   );
};
