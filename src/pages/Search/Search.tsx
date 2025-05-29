import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaFilter } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import { useSharedData } from "../../context/SharedData";

export default function Search() {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3333";
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelsFiltered, setHotelsFiltered] = useState<any[]>([]);
  const [info, setInfo] = useState<any>({});
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [starOptions, setStarOptions] = useState<
    { value: number ; label: string; count: number }[]
  >([]);
  const {inputData} = useSharedData()

  useEffect(() => {
    axios.get(`${baseUrl}/hotels`).then((response: any) => {
      setHotels(response.data);
      setHotelsFiltered(response.data);
      initializeStars();
    });
  }, []);

  const initializeStars = () => {
    const starCounts: Record<number, number> = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    hotels.forEach((hotel) => {
      const stars = hotel.hotel.stars || 0;
      starCounts[stars]++;
    });
    setStarOptions([
      { value: 0, label: "Não classificado", count: starCounts[0] },
      { value: 1, label: "1 Estrela", count: starCounts[1] },
      { value: 2, label: "2 Estrelas", count: starCounts[2] },
      { value: 3, label: "3 Estrelas", count: starCounts[3] },
      { value: 4, label: "4 Estrelas", count: starCounts[4] },
      { value: 5, label: "5 Estrelas", count: starCounts[5] },
    ]);
  };

  const handleFilter = (filters: any) => {
    const filtered = hotels.filter((hotel) => {
      const nameMatch = hotel.hotel.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const priceMatch =
        hotel.lowestPrice.amount >= filters.minPrice &&
        hotel.lowestPrice.amount <= filters.maxPrice;
      const starMatch =
        filters.stars.length === 0 || filters.stars.includes(hotel.hotel.stars);
      return nameMatch && priceMatch && starMatch;
    });
    setHotelsFiltered(filtered);
  };

  const handleHotelClick = (id: any) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <>
      <Navbar />
      <Input />

      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.text}>
            <p>
              <span>{inputData.location?.region}</span>
            </p>
            <p className={styles.subtext}>{hotels.length} hotéis encontrados</p>
          </div>

          <div className={styles.filter}>
            <button onClick={() => setIsFilterOn(!isFilterOn)}>
              <FaFilter className={styles.filterIcon} />
            </button>

            {isFilterOn && (
              <div className={styles.filterOpt}>
                <Filter
                  onFilter={handleFilter}
                  onClose={() => setIsFilterOn(false)}
                  starOptions={starOptions}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.hotels}>
          {hotelsFiltered.map((hotel) => (
            <div key={hotel.id} className={styles.hotel}>
              <div className={styles.img}>
                <img src={hotel.hotel.image} alt="" />
                <div className={styles.overlay}></div>
                <div className={styles["textOverlay"]}>
                  R${hotel.lowestPrice.amount} <span>/noite</span>
                </div>
              </div>
              <div className={styles.title}>
                <p>{hotel.hotel.name}</p>
              </div>
              <div className={styles.info}>
                <div className={styles.stars}>
                  {Array.from({ length: hotel.hotel.stars }).map((_, i) => (
                    <span key={i} style={{ color: "#F2BF09" }}>
                      <FaStar />
                    </span>
                  ))}
                </div>
                <button onClick={() => handleHotelClick(hotel.id)}>
                  Ver mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
