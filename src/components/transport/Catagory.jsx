import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";

export default function Catagory() {
  const [items, setItems] = useState([
    {
      id: 1,
      items: [
        {
          name: "Type",
          option: ["Adult", "Kids", "Luggage", "Dog"],
        },
        {
          name: "Age",
          option: ["18+", "6"],
        },
        {
          name: "Discount",
          option: ["5%", "10%"],
        },
        {
          name: "Cost",
          option: ["$", "$", "$"],
          value: 0,
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          name: "Type",
          option: ["Kids", "Adult", "Luggage", "Dog"],
        },
        {
          name: "Age",
          option: ["6", "18+"],
        },
        {
          name: "Discount",
          option: ["5%", "10%"],
        },
        {
          name: "Cost",
          option: ["$", "$", "$"],
          value: 0,
        },
      ],
    },
    {
      id: 3,
      items: [
        {
          name: "Type",
          option: ["Luggage", "Adult", "Kids", "Dog"],
        },
        {
          name: "Max Weight",
          option: ["Kg", "GR"],
          value: 15,
        },
        {
          name: "Miximum Laggage",
          option: ["5", "10"],
        },
        {
          name: "Cost",
          option: ["$", "$", "$"],
          value: 0,
        },
      ],
    },
    {
      id: 3,
      items: [
        {
          name: "Type",
          option: ["Luggage", "Adult", "Kids", "Dog"],
        },
        {
          name: "Max Weight  ",
          option: ["Kg", "GR"],
          value: 5,
          full: true,
        },

        {
          name: "Cost",
          option: ["$", "$", "$"],
          value: 0,
        },
      ],
    },
  ]);

  const updateItemValue = (itemId, itemName, newValue) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            items: item.items.map((subItem) => {
              if (subItem.name === itemName) {
                return {
                  ...subItem,
                  value: Number(newValue) || 0,
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="transport-catagory">
      {items.map((item, i) => (
        <div key={i} className="transport-catagory-item">
          {item.items.map((d, i) => (
            <div key={i} className={`form-group ${(d.full && "full") || ""}`}>
              <label htmlFor="">{d.name}</label>
              {((d.value || d.value === 0) && (
                <div className="form-group-inner">
                  <Select data={d.option} />
                  <Input
                    d={{ value: d.value, label: "Enter Cost" }}
                    handler={(e) => updateItemValue(item.id, d.name, e)}
                  />
                </div>
              )) || <Select data={d.option} />}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => {
          setItems((prev) => {
            return [
              ...prev,
              {
                id: items.length + 1,
                items: [
                  {
                    name: "Type",
                    option: ["Adult", "Kids", "Luggage", "Dog"],
                  },
                  {
                    name: "Age",
                    option: ["18+", "6"],
                  },
                  {
                    name: "Discount",
                    option: ["5%", "10%"],
                  },
                  {
                    name: "Cost",
                    option: ["$", "$", "$"],
                    value: 0,
                  },
                ],
              },
            ];
          });
        }}
        className="add-btn"
      >
        <AiOutlinePlus /> Add More Price
      </button>
    </div>
  );
}
