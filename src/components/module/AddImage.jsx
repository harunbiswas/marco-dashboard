import { useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import DrapDrop from "../hotel-edit/DragDrop";

export default function AddImage() {
  const [imgs, setImgs] = useState([
    {
      src: "https://cdn.pixabay.com/photo/2019/07/07/14/03/fiat-500-4322521_640.jpg",
    },
  ]);
  const [addImg, setImg] = useState(false);

  const deleteImg = (indexToRemove) => {
    setImgs((prevImgs) =>
      prevImgs.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="module-edit-add-img">
      <DrapDrop isDrag={addImg} handler={setImg} addHandler={setImgs} />
      {imgs.map((img, i) => (
        <div key={i} className="img">
          <img src={img.src} alt="" />
          <button onClick={() => deleteImg(i)}>
            <AiFillDelete />
          </button>
        </div>
      ))}
      <button onClick={() => setImg(true)} className="add-btn">
        <AiOutlinePlus />
      </button>
    </div>
  );
}
