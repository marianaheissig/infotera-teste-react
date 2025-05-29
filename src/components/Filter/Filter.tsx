import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import styles from "./Filter.module.css";

interface StarOption {
  value: number;
  label: string;
  count: number;
}

interface FilterProps {
  starOptions: StarOption[];
  onFilter: (filters: Filters) => void;
  onClose: () => void;
}

interface Filters {
  name: string;
  minPrice: number;
  maxPrice: number;
  stars: number[];
}

const Filter: React.FC<FilterProps> = ({ starOptions, onFilter }) => {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
  });

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  function clearFilter() {
    const cleared = { name: "", minPrice: 0, maxPrice: 1000, stars: [] };
    setFilters(cleared);
  }

  function toggleStar(value: number) {
    setFilters((prev) => {
      const exists = prev.stars.includes(value);
      const stars = exists
        ? prev.stars.filter((s) => s !== value)
        : [...prev.stars, value];
      return { ...prev, stars };
    });
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.header}>
        <p>Filtros</p>
        <div className={styles.clear} onClick={clearFilter}>
          <FaRegTrashAlt />
          Limpar filtros
        </div>
      </div>

      <div className={styles.hotel}>
        <p className={styles.label}>Hotel</p>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="Nome do hotel"
        />
      </div>

      <div className={styles.price}>
        <p className={styles.titlePanel}>Preço</p>
        <div className={styles.labelSlider}>
          <span>R$ {filters.minPrice}</span>
          <span> - </span>
          <span>R$ {filters.maxPrice}</span>
        </div>
        <div className={styles.slider}>
          <input
            type="range"
            min={92}
            max={400}
            value={filters.minPrice}
            className={styles.thumb}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value) })
            }
          />
          <input
            type="range"
            min={92}
            max={400}
            value={filters.maxPrice}
            className={styles.thumb}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <hr />

      <div className={styles.stars}>
        <p className={styles.titlePane}>Estrelas</p>
        {starOptions.map((star) => (
          <div key={star.value} className={styles.starCheck}>
            <label>
              <input
                type="checkbox"
                checked={filters.stars.includes(star.value)}
                onChange={() => toggleStar(star.value)}
              />
              {star.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
