import React, { useEffect, useRef, useState } from "react";

interface Option {
  id: number;
  label: string;
  value: string;
}

interface SearchableDropdownProps {
  options: Option[];
  selectedVal: string | null;
  handleChange: (value: string | null) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const toggle = (e: MouseEvent) => {
      setIsOpen(e.target === inputRef.current);
    };

    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option: Option) => {
    setQuery("");
    handleChange(option.value);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const filterOptions = (options: Option[]) => {
    return options.filter(
      (option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            tabIndex={isOpen ? 0 : -1}
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filterOptions(options).map((option) => (
          <div
            onClick={() => selectOption(option)}
            className={`option ${
              option.label === selectedVal ? "selected" : ""
            }`}
            key={option.id}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchableDropdown;
