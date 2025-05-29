import { useEffect, useState } from "react";
import { useSharedData } from "../../context/SharedData";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import styles from "./Checkout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { hotelData, roomData, inputData, peopleInfo, setPeopleInfo } = useSharedData();
  const [tax, setTax] = useState<number>();
  const [totalPriceTax, setTotalPriceTax] = useState<number>();
  const [totalPeople, setTotalPeople] = useState<number>();
  const [contact, setContact] = useState(peopleInfo?.contact || "");
  const [emailContact, setEmailContact] = useState(peopleInfo?.emailContact || "");
  const [phoneContact, setPhoneContact] = useState(peopleInfo?.phoneContact || "");
  const [obsContact, setObsContact] = useState(peopleInfo?.obsContact || "");
  const [guestsNames, setGuestsNames] = useState<{ firstName: string; lastName: string }[]>([]);

  useEffect(() => {
    calculatePrice();
  }, []);

  function calculatePrice() {
    const calculatedPeople =
      inputData.people.adults + inputData.people.children;
    const totalDays = Math.floor((new Date(inputData.endDate).getTime() -new Date(inputData.startDate).getTime()) /(1000 * 3600 * 24));
    const totalPrice = roomData.price.amount * calculatedPeople * totalDays;
    const calculatedTax = totalPrice * 0.08;
    setTotalPeople(calculatedPeople);
    setTax(calculatedTax);
    setTotalPriceTax(totalPrice + calculatedTax);
    const initialGuests = Array.from({ length: calculatedPeople }, () => ({
      firstName: "",
      lastName: "",
    }));
    setGuestsNames(initialGuests);
  }

  function book() {
    const bookingData = {
      contact: contact,
      emailContact: emailContact,
      phoneContact: phoneContact,
      obsContact: obsContact,
      peoples: guestsNames,
    };
    setPeopleInfo(bookingData);
    navigate(`/success`)
  }

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <p className={styles.title}>Finalize sua reserva!</p>
        <div className={styles.resume}>
          <div className={styles.guests}>
            <div className={styles.hotel}>
              <p>Hotel: {hotelData?.hotel.name}</p>
              <div className={styles.guest}>
                {guestsNames.map((guest, i) => (
                  <div className={styles.fields} key={i}>
                    <div className={styles.input}>
                      <label>Nome (hóspede)</label>
                      <input
                        type="text"
                        placeholder="Nome"
                        value={guest.firstName}
                        onChange={(e) => {
                          const updated = [...guestsNames];
                          updated[i].firstName = e.target.value;
                          setGuestsNames(updated);
                        }}
                      />
                    </div>
                    <div className={styles.input}>
                      <label>Sobrenome</label>
                      <input
                        type="text"
                        placeholder="Sobrenome"
                        value={guest.lastName}
                        onChange={(e) => {
                          const updated = [...guestsNames];
                          updated[i].lastName = e.target.value;
                          setGuestsNames(updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bookingGuest}>
              <p>Contato da reserva</p>
              <div className={styles.fields}>
                <div className={styles.input}>
                  <label>Nome (hospede)</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Nome"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email"
                    id="email"
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>Telefone (Whatsapp)</label>
                  <input
                    type="tel"
                    placeholder="(XX)XXXXX-XXXX"
                    value={phoneContact}
                    onChange={(e) => setPhoneContact(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.singleField}>
                <div className={styles.input}>
                  <label>Oservacoes</label>
                  <textarea
                    name="obs"
                    id="obs"
                    placeholder="sua mensagem"
                    value={obsContact}
                    onChange={(e) => setObsContact(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.overview}>
            <p className={styles.title}>Sua reserva</p>
            <div className={styles.hotelInfo}>
              <p className={styles.name}>{hotelData?.hotel.name}</p>
              <p className={styles.address}>{hotelData?.hotel.address}</p>
              <div className={styles.roomInfo}>
                <p className={styles.roomName}>{roomData.roomType.name}</p>
                <div className={styles.refund}>
                  <div className={styles.noRefund}>
                    {roomData.cancellationPolicies.refundable ? (
                      <p className={styles.refundable}>
                        <FaRegCheckCircle />
                        Cancelamento gratuito
                      </p>
                    ) : (
                      <p className={styles.noRefundable}>
                        <FaRegTimesCircle />
                        Multa de cancelamento
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.price}>
                <div className={styles.taxes}>
                  <p className={styles.text}>Impostos e taxas</p>
                  <p className={styles.value}>R$ {tax?.toFixed(2)}</p>
                </div>
                <div className={styles.total}>
                  <p className={styles.text}>Total</p>
                  <p className={styles.totalValue}>
                    R$ {totalPriceTax?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => book()}>Reservar</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
