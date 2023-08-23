import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import DrapDrop from "./DragDrop"; // Import the DrapDrop component

const DetailsImgs = () => {
  const [imgs, setImgs] = useState([
    {
      id: "image-1",
      src: "https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: "image-2",
      src: "https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    // ... other images
  ]);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImgs = [...imgs];
    const [movedImage] = updatedImgs.splice(fromIndex, 1);
    updatedImgs.splice(toIndex, 0, movedImage);
    setImgs(updatedImgs);
  };

  const [isDrag, setIsDrag] = useState(false);

  const handleRemoveItem = (index) => {
    const updatedImgs = imgs.filter((item, idx) => idx !== index);
    setImgs(updatedImgs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="images-wrp">
        {imgs.map((img, index) => (
          <DraggableImage
            key={img.id}
            index={index}
            img={img}
            moveImage={moveImage}
            handleRemoveItem={() => handleRemoveItem(index)}
          />
        ))}

        <button onClick={() => setIsDrag(true)}>
          <AiOutlinePlus />
          Add More
        </button>

        <DrapDrop handler={setIsDrag} isDrag={isDrag} addHandler={setImgs} />
      </div>
    </DndProvider>
  );
};

const DraggableImage = ({ img, index, moveImage, handleRemoveItem }) => {
  const [, drag] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} className="images-item">
      <img src={img.src} alt="" />
      <button onClick={handleRemoveItem}>
        <GrFormClose />
      </button>
    </div>
  );
};

export default DetailsImgs;
