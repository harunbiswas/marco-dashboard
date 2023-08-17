import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

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

  return (
    <div className="images-wrp">
      {imgs.map((img, i) => (
        <img key={i} src={img.src} alt="" />
      ))}

      <button>
        <AiOutlinePlus />
        Add More
      </button>
    </div>
  );
}
