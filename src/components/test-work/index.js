import { Typography } from "antd";
import Navbar from "../navbar";
import style from "./index.module.sass";
import "./style.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImClock } from "react-icons/im";
import { useEffect, useState } from "react";

export default function TestWork() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          clearInterval(timer);
          setIsRunning(false);
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [seconds, minutes]);

  return (
    <div className={style.parent}>
      <Navbar />

      <div className={style.container}>
        <div className={style.container__questionP}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "4px",
              fontWeight: "800",
            }}
          >
            <ImClock />
            <p>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography className={style.question}>
              1) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos,
              cum. Minima eos laboriosam ipsam aperiam cumque. Inventore id illo
              veritatis?
            </Typography>
          </div>

          <div>
            <ul className="ul">
              <li className="li">
                <input type="radio" id="f-option" name="selector" />
                <label for="f-option">Pizza</label>

                <div class="check"></div>
              </li>

              <li className="li">
                <input type="radio" id="s-option" name="selector" />
                <label for="s-option">Bacon</label>

                <div class="check">
                  <div class="inside"></div>
                </div>
              </li>

              <li className="li">
                <input type="radio" id="t-option" name="selector" />
                <label for="t-option">Cats</label>

                <div class="check">
                  <div class="inside"></div>
                </div>
              </li>

              <li className="li">
                <input type="radio" id="t-option2" name="selector" />
                <label for="t-option2">Cats</label>

                <div class="check">
                  <div class="inside"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.footer}>
          <div className={style.button}>
            <button>
              <FaArrowLeft />
            </button>
          </div>
          <div className={style.button}>
            <button>Yakunlash</button>
          </div>
          <div className={style.button}>
            <button>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
