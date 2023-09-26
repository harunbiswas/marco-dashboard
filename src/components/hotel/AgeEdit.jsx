import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import values from "../../../values";

export default function AgeEdit({ isEdit, data, setData }) {
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
  ]);

  const handleRemoveParentItem = (parentId) => {
    const updatedItems = items.filter(
      (parentItem) => parentItem.id !== parentId
    );
    setItems(updatedItems);
  };

  const { id } = useParams();
  useEffect(() => {
    axios.get(`${values.url}/hotel/single?id=${id}`).then((d) => {
      setItems(d.data?.ageDeductions);
    });
  }, []);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ageDeductions: items,
      };
    });
  });

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
            <>
              <div key={i} className="age-edit-item">
                {d.items.map((d1, i) => (
                  <>
                    <div key={i} className="age-edit-item-input">
                      <label htmlFor="">{d1.label}</label>
                      <input
                        disabled={!isEdit}
                        type="text"
                        value={d1.value || 0}
                        onChange={(e) =>
                          updateValue(d.id, d1.id, e.target.value)
                        }
                      />
                    </div>
                  </>
                ))}

                {isEdit && (
                  <button
                    onClick={() => handleRemoveParentItem(d.id)}
                    className="delete"
                  >
                    <RiDeleteBin2Line />
                    Rimuovi
                  </button>
                )}
              </div>
            </>
          );
        })}
        {isEdit && (
          <button
            onClick={() => {
              setItems((prev) => {
                return [
                  ...prev,
                  {
                    id: items.length + 1,
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
                ];
              });
            }}
            className="age-edit-show"
          >
            Add More Age Reduction
          </button>
        )}
      </div>
    </>
  );
}
