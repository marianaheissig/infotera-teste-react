import styles from "./Input.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarDay, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSharedData } from "../../context/SharedData";
import { Autocomplete, TextField } from "@mui/material";

export default function Input() {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3333";
  const { inputData, setInputData } = useSharedData();
  const [location, setLocation] = useState(inputData.location || null);
  const [startDate, setStartDate] = useState(inputData.startDate || "");
  const [endDate, setEndDate] = useState(inputData.endDate || "");
  const [people, setPeople] = useState(inputData.people || { adults: 0, children: 0 });
  const [showPeopleMenu, setShowPeopleMenu] = useState(false);
  const [suggestions, setSuggestions] = useState<{ label: string; id: number; name: string; region: string; type: string }[]>([]);
  const [minDateStart, setMinDateStart] = useState<string>();

  useEffect(() => {
    axios.get(`${baseUrl}/suggestions`).then((response) => {
      const formatted = response.data.map((item: any) => ({
        label: `${item.name}, ${item.region}`,
        ...item,
      }));
      setSuggestions(formatted);
      date();
    });
  }, []);

  const handleSearch = () => {
    setInputData({
      location,
      startDate,
      endDate,
      people,
    });
    navigate(`/search`);
  };

  const increase = (type: "adults" | "children") => {
    setPeople((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrease = (type: "adults" | "children") => {
    setPeople((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  function date() {
    const today = new Date().toISOString().split("T")[0];
    setMinDateStart(today);
  }

  return (
    <div className={styles.inputs}>
      <div className={`${styles.input} ${styles.firstInput}`}>
        <div className={styles.inputHeader}>
          <span className={styles.icon}>
            <FaMapMarkerAlt />
          </span>
          Destino
        </div>
        <Autocomplete
          options={suggestions}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
                height: "1rem",
              },
            },
          }}
          getOptionLabel={(option) => option.name} // ou option.label, depende
          onChange={(event, newValue) => {
            setLocation(newValue);
          }}
          value={location}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      <div className={styles.input}>
        <div className={styles.inputHeader}>
          <span className={styles.icon}>
            <FaCalendarDay />
          </span>
          Entrada
        </div>
        <input
          type="date"
          id="startDate"
          min={minDateStart}
          value={startDate}
          className={styles.inputField}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <div className={styles.inputHeader}>
          <span className={styles.icon}>
            <FaCalendarDay />
          </span>
          Saída
        </div>
        <input
          type="date"
          id="endDate"
          value={endDate}
          className={styles.inputField}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <div className={styles.inputHeader}>
          <span className={styles.icon}>
            <FaUserFriends />
          </span>
          Hóspedes
        </div>
        <input
          type="text"
          readOnly
          className={`${styles.guests} ${styles.inputField}`}
          value={`${people.adults} Adultos, ${people.children} crianças`}
          onClick={() => setShowPeopleMenu((prev) => !prev)}
        />
        {showPeopleMenu && (
          <div className={styles.peopleSelector}>
            <div className={styles.peopleRow}>
              <div className={styles.peopleType}>
                <span>Adultos</span>
              </div>
              <div className={styles.counter}>
                <button
                  className={styles.buttonCount}
                  onClick={() => decrease("adults")}
                >
                  -
                </button>
                <span>{people.adults}</span>
                <button
                  className={styles.buttonCount}
                  onClick={() => increase("adults")}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.peopleRow}>
              <div className={styles.peopleType}>
                <span>Crianças</span>
              </div>
              <div className={styles.counter}>
                <button
                  className={styles.buttonCount}
                  onClick={() => decrease("children")}
                >
                  -
                </button>
                <span>{people.children}</span>
                <button
                  className={styles.buttonCount}
                  onClick={() => increase("children")}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.apply}>
              <button onClick={() => setShowPeopleMenu(false)}>Aplicar</button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
    </div>
  );
}
