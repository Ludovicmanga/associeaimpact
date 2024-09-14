import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div>Associé à impact</div>
      <div>
        <div>Se connecter</div>
        <div>Inscription</div>
      </div>
    </div>
  );
};

export default NavBar;
