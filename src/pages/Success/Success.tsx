import { useSharedData } from "../../context/SharedData";
import styles from "./Success.module.css";

const Success = () => {
  const { hotelData, peopleInfo } = useSharedData();
  return (
    <>
      <div className={styles.main}>
        <p className={styles.bigtext}>Reserva realizada com sucesso!</p>
        <div className={styles.infos}>
          <div className={styles.hotel}>
            <p>
              Hotel: <span>{hotelData.hotel.name}</span>
            </p>
          </div>

          <div className={styles.guests}>
            <p>Hospedes</p>
            {peopleInfo?.peoples?.map((people: any, index: any) => (
              <div key={index} className={styles.room}>
                <p>
                  Nome:{" "}
                  <span>
                    {people.firstName} {people.lastName}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className={styles.contact}>
            <p>Contato</p>
            <p>
              Nome: <span>{peopleInfo.contact}</span>
            </p>
            <p>
              Email: <span>{peopleInfo.emailContact}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
