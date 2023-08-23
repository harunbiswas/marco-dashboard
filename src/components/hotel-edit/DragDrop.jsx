import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { BsUpload } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Input from "./Input";

export default function DrapDrop({ isDrag, handler, addHandler }) {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [url, setUrl] = useState("");
  const [value, setValue] = useState("");

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUrl(null);
    }
  };

  useEffect(() => {
    setUrl(value);
  }, [value]);

  const submitHandler = (img) => {
    if (img) {
      addHandler((prev) => {
        return [...prev, { src: img }];
      });
      handler(false);
      setUrl("");
      setValue("");
    }
  };

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  return (
    <div ref={wrp} className={`drag-drop ${(isDrag && "show") || ""}`}>
      <div ref={ref} className="drag-drop-inner booking-box">
        <div className="drag-drop-top">
          <h4>Upload Image</h4>
          <button onClick={() => handler(false)}>
            <GrClose />
          </button>
        </div>
        <div className="drag-drop-body">
          {(url && <img src={url} alt="" />) || (
            <>
              <div className="icon">
                <BsUpload />
              </div>
              <span>
                Drag & drop files or <label htmlFor="img"> Browse files</label>
              </span>

              <p>JPG, PNG or GIF - Max file size 2MB</p>
            </>
          )}
          <FileUploader
            handleChange={fileHandler}
            name="file"
            className="upload"
            types={fileTypes}
          />
          <input
            onChange={(e) => fileHandler(e)}
            type="file"
            accept="image/*"
            id="img"
          />
        </div>
        <div className="sep">
          <span>OR</span>
        </div>
        <div className="drag-drop-form">
          <div className="item">
            <Input
              handler={setValue}
              d={{ value: value, label: "Paster Image URL" }}
            />
            <button onClick={(e) => submitHandler(url)} className="btn">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
