import { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";
import axios from "axios";

const Tag = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [options, setOptions] = useState([]); // Store fetched options
  const containerRef = useRef(null);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/tags`);
      setOptions(response.data.tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const clearOptions = () => {
    onChange([]);
  };

  const selectOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((o) => o !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const isOptionSelected = (option) => {
    return value.includes(option);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {value.length === 0 ? (
          <span className={styles.placeholder}>
            <div className="c-g6 pl-1">
              Select Tags
            </div>
          </span>
        ) : (
          value.map((v) => (
            <button
              key={v._id}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(v);
              }}
              className={styles["option-badge"]}
            >
              {v.name}
              <span className={styles["remove-btn"]}>&times;</span>
            </button>
          ))
        )}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option._id}
            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""
              } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
