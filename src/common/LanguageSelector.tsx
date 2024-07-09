import React, { useState } from "react";
import SearchableDropdown from "../Components/ui/Dropdown";
import { Languages } from "../constants/languages";

const LanguageSelector: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div>
      <SearchableDropdown
        options={Languages}
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
  );
};

export default LanguageSelector;
