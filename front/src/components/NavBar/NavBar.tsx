import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div>Associe à impact</div>
      <div>
        <div>Se connecter</div>
        <div>Inscription</div>
      </div>
    </div>
  );
};

export default NavBar;
