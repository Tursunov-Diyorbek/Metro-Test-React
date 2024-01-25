import styles from "./index.module.sass";

export default function Loading() {
  return (
    <div className={styles.fixed}>
      <div className={styles.loader}></div>
    </div>
  );
}
