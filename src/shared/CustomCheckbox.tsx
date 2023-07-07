import { useRef } from "react";
import "../styles/CustomCheckbox.scss";
import CheckIcon from "../assets/icon-check.svg";

interface Props {
  handleToggle: () => void;
  checked: boolean;
}

const CustomCheckbox: React.FC<Props> = ({ handleToggle, checked }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!checked) {
      divRef.current?.classList.add("hover");
    }
  };

  const handleMouseLeave = () => {
    divRef.current?.classList.remove("hover");
  };

  return (
    <div
      ref={divRef}
      className={`custom-checkbox ${checked ? "checked" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
    >
      {checked && <img src={CheckIcon} alt="check-icon" />}
    </div>
  );
};

export default CustomCheckbox;
