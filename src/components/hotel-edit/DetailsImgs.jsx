import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import DrapDrop from "./DragDrop";

export default function DetailsImgs() {
  const [imgs, setImgs] = useState([
    {
      src: "https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      src: "https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      src: "https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ]);

  const [isDrag, setIsDrag] = useState(false);

  const handleRemoveItem = (index) => {
    const updatedImgs = imgs.filter((item, idx) => idx !== index);
    setImgs(updatedImgs);
  };

  return (
    <div className="images-wrp">
      {imgs.map((img, i) => (
        <div key={i} className="images-item">
          <img src={img.src} alt="" />
          <button onClick={(e) => handleRemoveItem(i)}>
            <GrFormClose />
          </button>
        </div>
      ))}

      <button onClick={() => setIsDrag(true)}>
        <AiOutlinePlus />
        Add More
      </button>

      <DrapDrop handler={setIsDrag} isDrag={isDrag} addHandler={setImgs} />
    </div>
  );
}
