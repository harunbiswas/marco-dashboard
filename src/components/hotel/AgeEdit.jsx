import { useState } from "react";

export default function AgeEdit({ isEdit }) {
  const [items, setItems] = useState([
    {
      id: 1,
      items: [
        {
          id: 1,
          label: "Age Limit",
          value: 10,
        },
        {
          id: 2,
          label: "Discount",
          value: "10%",
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          id: 1,
          label: "Age Limit",
          value: 10,
        },
        {
          id: 2,
          label: "Discount",
          value: "10%",
        },
      ],
    },
    {
      id: 3,
      items: [
        {
          id: 1,
          label: "Age Limit",
          value: 10,
        },
        {
          id: 2,
          label: "Discount",
          value: "10%",
        },
      ],
    },
  ]);

  const [show, setShow] = useState(2);

  // Function to update value dynamically
  const updateValue = (itemId, subItemId, newValue) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.items.map((subItem) => {
          if (subItem.id === subItemId) {
            if (typeof subItem.value === "number") {
              return { ...subItem, value: parseInt(newValue) };
            } else {
              return { ...subItem, value: newValue };
            }
          }
          return subItem;
        });
        return { ...item, items: updatedSubItems };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <div className="age-edit">
        {items.map((d, i) => {
          return (
            i < show && (
              <div key={i} className="age-edit-item">
                {d.items.map((d1, i) => (
                  <div key={i} className="age-edit-item-input">
                    <label htmlFor="">{d1.label}</label>
                    <input
                      disabled={!isEdit}
                      type="text"
                      value={d1.value || 0}
                      onChange={(e) => updateValue(d.id, d1.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )
          );
        })}
        <button
          onClick={() => {
            if (show === items.length) {
              setShow(2);
            } else {
              setShow(items.length);
            }
          }}
          className="age-edit-show"
        >
          {(show === items.length && "Show less") || "Show more"}
        </button>
      </div>
    </>
  );
}
