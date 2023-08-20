import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
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

  return (
    <div className="images-wrp">
      {imgs.map((img, i) => (
        <img key={i} src={img.src} alt="" />
      ))}

      <button onClick={() => setIsDrag(true)}>
        <AiOutlinePlus />
        Add More
      </button>

      <DrapDrop handler={setIsDrag} isDrag={isDrag} addHandler={setImgs} />
    </div>
  );
}
