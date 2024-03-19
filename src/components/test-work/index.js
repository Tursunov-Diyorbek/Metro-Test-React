import { Modal, Typography } from "antd";
import Navbar from "../navbar";
import style from "./index.module.sass";
import "./style.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImClock } from "react-icons/im";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const TestWork = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [isRunning, setIsRunning] = useState(true);
  const [data, setData] = useState([{}, {}, {}, {}]);
  const [active, setActive] = useState(-1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <Fade delay={300}>
              <Typography className={style.question}>
                1) Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eos, cum. Minima eos laboriosam ipsam aperiam cumque. Inventore
                id illo veritatis?
              </Typography>
            </Fade>
          </div>

          <div>
            <div className="cards">
              {data?.map((card, index) => {
                return (
                  <Fade delay={index * 200} style={{ width: "100%" }}>
                    <div
                      key={index}
                      onClick={() => {
                        setActive(index);
                      }}
                      className={`card ${active == index && "actice-card"}`}
                      style={{ width: "100%" }}
                    >
                      <span
                        className={`${active == index ? "check" : "no-check"}`}
                      >
                        <span
                          className={`${active == index && "check-active"}`}
                        ></span>
                      </span>
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae, optio.
                      </Typography>
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        </div>

        <Fade delay={300}>
          <div className={style.footer}>
            <div className={style.button}>
              <button>
                <FaArrowLeft />
              </button>
            </div>
            <div className={style.button} onClick={showModal}>
              <button>Yakunlash</button>
            </div>
            <div className={style.button}>
              <button>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </Fade>
      </div>

      <Modal
        title="Natija"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal"
        footer={false}
      >
        <div>
          <div className="name">
            <Typography className="left">User Name:</Typography>
            <Typography>Diyor Tursunov</Typography>
          </div>

          <div className="name">
            <Typography className="left">Otasini ismi:</Typography>
            <Typography>Diyor Tursunov</Typography>
          </div>

          <div className="name">
            <Typography className="left">Familiya:</Typography>
            <Typography>Diyor Tursunov</Typography>
          </div>

          <div className="name">
            <Typography className="left">Sinov boshlanish vaqti:</Typography>
            <Typography>28/01/2024 10:00</Typography>
          </div>

          <div className="name">
            <Typography className="left">Sinov tugash vaqti:</Typography>
            <Typography>28/01/2024 12:20</Typography>
          </div>

          <div className="name">
            <Typography className="left">Umumiy testlar soni:</Typography>
            <Typography>20ta</Typography>
          </div>

          <div className="name">
            <Typography className="left">Percentage:</Typography>
            <Typography>70%</Typography>
          </div>
        </div>

        <div className="name">
          <Typography className="left" style={{ width: "115px" }}>
            Description:
          </Typography>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,
            consequuntur.
          </Typography>
        </div>

        <div className="flex">
          <div className={style.buttons}>
            <button>Cancel</button>
          </div>
          <div className={style.buttons}>
            <button>History</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TestWork;
