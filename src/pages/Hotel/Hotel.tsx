import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaRegCheckCircle, FaRegTimesCircle, FaStar } from "react-icons/fa";
import { useSharedData } from "../../context/SharedData";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Input from "../../components/Input/Input";
import styles from "./Hotel.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Hotel = () => {
  type Hotel = {
    id: number;
    hotel: {
      name: string;
      address: string;
      stars: number;
      image: string;
      description: string;
    };
    lowestPrice: {
      currency: string;
      amount: number;
    };
    rooms: any[];
  };
  const navigate = useNavigate();
  const { setHotelData, setRoomData } = useSharedData();
  const id = useParams().id;
  const [item, setItem] = useState<Hotel | undefined>();
  const [hotels, setHotels] = useState<any[]>([]);

  const baseUrl = "http://localhost:3333";

  useEffect(() => {
    axios.get(`${baseUrl}/hotels`).then((response) => {
      setHotels(response.data);
      const foundHotel = response.data.find((hotel: any) => hotel.id == id);
      setItem(foundHotel);
    });
  }, []);

  function goCheckout(item: any, room: any) {
    setHotelData(item);
    setRoomData(room);
    navigate(`/checkout`);
  }

  return (
    <>
      <Navbar />
      <Input />
      <div className={styles.main}>
        <div className={styles.hotelInfo}>
          <img src={item?.hotel.image} alt="" />

          <div className={styles.text}>
            <div className={styles.title}>{item?.hotel.name}</div>
            <div className={styles.address}>
              <FaMapMarkerAlt className="icon" />
              {item?.hotel.address}
            </div>
            <div className={styles.stars}>
              {Array.from({ length: item?.hotel.stars ?? 0 }).map((_, i) => (
                <span key={i} style={{ color: "#F2BF09" }}>
                  <FaStar />
                </span>
              ))}
            </div>
            <div className={styles.description}>
              <p>{item?.hotel.description}</p>
            </div>
          </div>
        </div>
        <div className={styles.roomsInfo}>
          <p>Quartos disponiveis</p>

          {item?.rooms?.map((room, index) => (
            <div key={index} className={styles.room}>
              <div className={styles.roomInfo}>
                <p>{room.roomType.name}</p>
                {room.cancellationPolicies.refundable ? (
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
              <div className={styles.roomBooking}>
                <div className={styles.price}>
                  <p className={styles.value}>
                    <span>R${room.price.amount}</span> /noite
                  </p>
                  <p className={styles.subtext}>Pagamento no hotel</p>
                </div>
                <button onClick={() => goCheckout(item, room)}>
                  Reservar agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hotel;
