import { FinancialBanner } from "./components/banner/FinancialBanner";
import { Bootcamps } from "./components/bootcamps/Bootcamps";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Hero } from "./components/hero/Hero";
import { Stats } from "./components/stats/Stats";
import styles from "./home.module.css";

export const Home = () => {
   return (
      <div className={styles.home}>
         <Header />
         <main>
            <div>
               <Hero />
               <Stats />
               <Bootcamps />
               <FinancialBanner />
            </div>
         </main>
         <Footer />
      </div>
   );
};
