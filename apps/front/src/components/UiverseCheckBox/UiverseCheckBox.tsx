import styles from "./UiverseCheckBox.module.css";

export default function UiverseCheckBox(props: {
  id: string;
  activeFilters: {
    id: string;
    type: "city" | "stake";
    value: string;
  }[];
  onChange(isChecked: boolean): void;
  isChecked: boolean;
}) {
  return (
    <div className={styles.checkboxWrapper13}>
      <input
        type="checkbox"
        id="c1-13"
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.isChecked}
      />
    </div>
  );
}
