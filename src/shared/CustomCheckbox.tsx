import "../styles/CustomCheckbox.scss";
import CheckIcon from "../assets/icon-check.svg";

interface Props {
  handleToggle: () => void;
  checked: boolean;
}

const CustomCheckbox: React.FC<Props> = ({ handleToggle, checked }) => {
  return (
    <div
      className={`custom-checkbox ${checked ? "checked" : ""}`}
      onClick={handleToggle}
    >
      {checked && <img src={CheckIcon} alt="check-icon" />}
    </div>
  );
};

export default CustomCheckbox;
