import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";

export default function Catagory({ setData, data, add }) {
  const [items, setItems] = useState([
    {
      id: 1,
      items: [
        {
          name: "Tipo",
          option: ["Adulti", "Bambini", "Bagagli", "Animale"],
          activeValue: "Adulti",
        },

        {
          name: "Sconto",
          value: 10,
        },
        {
          name: "Prezzo",
          option: ["€", "$", "$"],
          activeValue: "€",
          value: 0,
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          name: "Tipo",
          option: ["Bambini", "Adulti", "Bagagli", "Animale"],
          activeValue: "Bambini",
        },
        {
          name: "Età Massima",
          value: 6,
        },
        {
          name: "Sconto",
          value: 10,
        },
        {
          name: "Prezzo",
          option: ["€", "$", "$"],
          activeValue: "€",
          value: 0,
        },
      ],
    },
    {
      id: 3,
      items: [
        {
          name: "Tipo",
          option: ["Bagagli", "Adulti", "Bambini", "Animale"],
          activeValue: "Bagagli",
        },
        {
          name: "Massimo Peso",
          option: ["Kg", "GR"],
          value: 15,
          activeValue: "kg",
        },
        {
          name: "Numero Bagagli",
          option: ["5", "10"],
          activeValue: "5",
        },
        {
          name: "Prezzo",
          option: ["€", "$", "$"],
          value: 0,
          activeValue: "€",
        },
      ],
    },
    {
      id: 4,
      items: [
        {
          name: "Tipo",
          option: ["Animale", "Adulti", "Bambini", "Bagagli"],
          activeValue: "Animale",
        },
        {
          name: "Max Weight  ",
          option: ["Kg", "GR"],
          value: 5,
          full: true,
          activeValue: "Kg",
        },

        {
          name: "Prezzo",
          option: ["€", "$", "$"],
          value: 0,
          activeValue: "€",
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

  const removeItemById = (itemId) => {
    console.log(itemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleActiveValueChange = (sectionId, itemName, newActiveValue) => {
    setItems((prevItems) =>
      prevItems.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
          ...item,
          activeValue:
            section.id === sectionId && item.name === itemName
              ? newActiveValue
              : item.activeValue,
        })),
      }))
    );
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        pricing: items,
      };
    });
  }, [items]);

  // useEffect(() => {
  //   if (!add) {
  //     setItems(data && data);
  //   }
  // }, []);

  return (
    <div className="transport-catagory">
      {items.map((item, i) => (
        <div key={i} className="transport-catagory-item">
          {item.items.map((d, i) => (
            <div key={i} className={`form-group ${(d.full && "full") || ""}`}>
              <label htmlFor="">{d.name}</label>
              {((d.value || d.value === 0) && (
                <div className="form-group-inner">
                  {d.option && (
                    <Select
                      activeValue={d?.activeValue}
                      handler={(e) =>
                        handleActiveValueChange(item.id, d.name, e)
                      }
                      data={d.option}
                    />
                  )}
                  <Input
                    d={{ value: d.value, label: "Enter Cost" }}
                    handler={(e) => updateItemValue(item.id, d.name, e)}
                  />
                </div>
              )) || (
                <Select
                  activeValue={d?.activeValue}
                  handler={(e) => handleActiveValueChange(item.id, d.name, e)}
                  data={d.option}
                />
              )}
            </div>
          ))}
          <button onClick={() => removeItemById(item.id)}>
            <AiOutlineDelete />
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setItems((prev) => {
            return [
              ...prev,
              {
                id: new Date().getTime() + 1,
                items: [
                  {
                    name: "Tipo",
                    option: ["Adulti", "Bambini", "Bagagli", "Animale"],
                    activeValue: "Adulti",
                  },
                  {
                    name: "Sconto",
                    value: 10,
                  },
                  {
                    name: "Prezzo",
                    option: ["€", "$", "$"],
                    value: 0,
                    activeValue: "€",
                  },
                ],
              },
            ];
          });
        }}
        className="add-btn"
      >
        <AiOutlinePlus /> Aggiungi Prezzo
      </button>
    </div>
  );
}
