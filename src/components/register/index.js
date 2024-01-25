import styles from "./index.module.sass";

export default function RegisterPage() {
  return (
    <div className={styles.register}>
      <div>
        <img src="/photo_2024-01-24_22-08-56 (2).jpg" alt="svg" />
      </div>
      <div>
        <h1>{"Ro'yxatdan o'tish"}</h1>
        <img src="/Sign up-rafiki.svg" alt="svg" />
        <form>
          <input type="text" />
          <input type="text" />
          <button>Tasdiqlash</button>
        </form>
      </div>
    </div>
  );
}
