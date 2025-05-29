import React from "react";
import styles from "./Home.module.css";
import Input from "../../components/Input/Input";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";


const Home = () => {
  return (
    <>
    <Navbar />
    <div className={styles.main}>
      <div className={styles.bigText}>
        <span className={styles.first}>Os melhores</span>{" "}
        <span className={styles.highlight}> Hoteis</span> e{" "}
        <span className={styles.highlight}>Destinos</span> para sua viagem
      </div>

      <div className={styles.bigInput}>
        <Input />
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Home;
