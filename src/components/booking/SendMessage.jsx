import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

export default function SendMessage() {
  const [isSend, setIsSend] = useState(false);
  const ref = useRef(null);
  const [row, setRow] = useState(1);
  const [value, setValue] = useState(
    "Messaggio descrizione gnenfkb gmkpgo mgmgk"
  );

  useEffect(() => {
    if (isSend) {
      setTimeout(() => {
        ref.current.style.opacity = "0";
      }, 2500);
      setTimeout(() => {
        setIsSend(false);
        ref.current.style.opacity = "1";
      }, 3000);
    }
  }, [isSend]);

  useEffect(() => {
    if ((value.match(/\n/g) || []).length >= 0) {
      setRow((value.match(/\n/g) || []).length + 1);
    }
  }, [value]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        setIsSend(true);
      }}
      className="form send-message"
      action=""
    >
      <div className="form-body">
        <div className="form-group">
          <label htmlFor="textaria"> nvia Messaggio</label>
          <textarea
            onChange={(e) => {
              setValue(e.target.value);
            }}
            name=""
            id="textaria"
            cols="30"
            rows={row}
            value={value}
          ></textarea>
        </div>

        <div className="form-group send">
          <button className={(isSend && "animat") || "no"}>
            <span ref={ref}>
              {(isSend && "Message Sent") || "Send Message"}
              <div className="icon">
                <IoSend />
              </div>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
