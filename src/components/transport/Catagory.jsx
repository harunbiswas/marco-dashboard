import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";

export default function Catagory({
  setData,
  data,
  add,
  transportData,
  isPrice,
  setIsPrice,
}) {
  const typesOption = ["Adulti", "Bambini", "Bagagli", "Animale"];
  const carencyOtion = ["€", "$", "$"];
  const discountOtion = [5, 10, 15];
  const ageOption = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
  ];
  const unitOption = ["Kg", "Gr"];
  const countOption = [5, 10, 15];

  const [items, setItems] = useState([
    {
      itemId: 1,
      name: "Adulti",
      discount: discountOtion[0],
      cost: 0,
      carency: "€",
      age: ageOption[0],
      maxWeight: 0,
      count: countOption[0],
      unit: unitOption[0],
    },
    {
      itemId: 2,
      name: "Bambini",
      discount: discountOtion[0],
      cost: 0,
      carency: "€",
      age: ageOption[0],
      maxWeight: 0,
      count: countOption[0],
      unit: unitOption[0],
    },
    {
      itemId: 3,
      name: "Bagagli",
      discount: discountOtion[0],
      cost: 0,
      carency: "€",
      age: ageOption[0],
      maxWeight: 0,
      count: countOption[0],
      unit: unitOption[0],
    },
    {
      itemId: 4,
      name: "Animale",
      discount: discountOtion[0],
      cost: 0,
      carency: "€",
      age: ageOption[0],
      maxWeight: 0,
      count: countOption[0],
      unit: unitOption[0],
    },
  ]);

  const removeItemById = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        pricing: items,
      };
    });
  }, [items]);

  const rx = /^(\d+(\.\d{0,2})?)?$/;

  useEffect(() => {
    if (!add && transportData) {
      setItems(transportData?.pricing || []);
    } else {
      setItems([]);
    }
  }, [transportData]);

  // [
  //   {
  //     itemId: 1,
  //     name: "Adulti",
  //     discount: discountOtion[0],
  //     cost: 0,
  //     carency: "€",
  //     age: ageOption[0],
  //     maxWeight: 0,
  //     count: countOption[0],
  //     unit: unitOption[0],
  //   },
  //   {
  //     itemId: 2,
  //     name: "Bambini",
  //     discount: discountOtion[0],
  //     cost: 0,
  //     carency: "€",
  //     age: ageOption[0],
  //     maxWeight: 0,
  //     count: countOption[0],
  //     unit: unitOption[0],
  //   },
  //   {
  //     itemId: 3,
  //     name: "Bagagli",
  //     discount: discountOtion[0],
  //     cost: 0,
  //     carency: "€",
  //     age: ageOption[0],
  //     maxWeight: 0,
  //     count: countOption[0],
  //     unit: unitOption[0],
  //   },
  //   {
  //     itemId: 4,
  //     name: "Animale",
  //     discount: discountOtion[0],
  //     cost: 0,
  //     carency: "€",
  //     age: ageOption[0],
  //     maxWeight: 0,
  //     count: countOption[0],
  //     unit: unitOption[0],
  //   },
  // ]

  return (
    <div className="transport-catagory">
      {items.map((item, i) => (
        <div key={i} className="transport-catagory-item-wrp">
          <div className="transport-catagory-item">
            <div className={`form-group`}>
              <label htmlFor="">Tipo</label>
              <Select
                activeValue={item.name}
                handler={(e) => {
                  setItems((prevItems) => {
                    return prevItems.map((i) => {
                      if (i.itemId === item.itemId) {
                        return { ...i, name: e };
                      }
                      return i;
                    });
                  });
                }}
                data={typesOption}
              />
            </div>
            {item.name === "Bambini" && (
              <div className={`form-group`}>
                <label htmlFor="">Età Massima</label>
                <Input
                  d={{ value: item.age }}
                  handler={(e) => {
                    setItems((prevItems) => {
                      return prevItems.map((i) => {
                        if (i.itemId === item.itemId) {
                          return {
                            ...i,
                            age:
                              (e &&
                                Number(
                                  rx.test(e.toString())
                                    ? (e <= 17 && e) || 17
                                    : 0
                                )) ||
                              0,
                          };
                        }
                        return i;
                      });
                    });
                  }}
                />
              </div>
            )}
            {(item.name === "Adulti" || item.name === "Bambini") && (
              <div className={`form-group discount`}>
                <label htmlFor="">Sconto</label>
                <span>%</span>
                <Input
                  d={{ value: item.discount }}
                  handler={(e) => {
                    setItems((prevItems) => {
                      return prevItems.map((i) => {
                        if (i.itemId === item.itemId) {
                          return {
                            ...i,
                            discount: rx.test(e.toString())
                              ? (e < 100 && e) || 100
                              : 0,
                          };
                        }
                        return i;
                      });
                    });
                  }}
                />
              </div>
            )}{" "}
            {(item.name === "Bagagli" || item.name === "Animale") && (
              <div className={`form-group`}>
                <label htmlFor="">Massimo Peso</label>
                <div className="form-group-inner">
                  <Select
                    activeValue={item.unit}
                    handler={(e) => {
                      setItems((prevItems) => {
                        return prevItems.map((i) => {
                          if (i.itemId === item.itemId) {
                            return { ...i, unit: e };
                          }
                          return i;
                        });
                      });
                    }}
                    data={unitOption}
                  />{" "}
                  <Input
                    d={{ value: item.maxWeight }}
                    handler={(e) => {
                      setItems((prevItems) => {
                        return prevItems.map((i) => {
                          if (i.itemId === item.itemId) {
                            return {
                              ...i,
                              maxWeight: Number(
                                rx.test(e.toString())
                                  ? e
                                  : e.length < 2
                                  ? 0
                                  : item.maxWeight
                              ),
                            };
                          }
                          return i;
                        });
                      });
                    }}
                  />
                </div>
              </div>
            )}
            {item.name === "Bagagli" && (
              <div className={`form-group`}>
                <label htmlFor="">Numero Bagagli</label>
                <Select
                  activeValue={item.count}
                  handler={(e) => {
                    setItems((prevItems) => {
                      return prevItems.map((i) => {
                        if (i.itemId === item.itemId) {
                          return { ...i, count: e };
                        }
                        return i;
                      });
                    });
                  }}
                  data={countOption}
                />
              </div>
            )}
            <div className={`form-group`}>
              <label htmlFor="">Cost</label>
              <div className="form-group-inner">
                <Select
                  activeValue={item.carency}
                  handler={(e) => {
                    setItems((prevItems) => {
                      return prevItems.map((i) => {
                        if (i.itemId === item.itemId) {
                          return { ...i, carency: e };
                        }
                        return i;
                      });
                    });
                  }}
                  data={carencyOtion}
                />{" "}
                <Input
                  d={{ value: item.cost }}
                  handler={(e) => {
                    setItems((prevItems) => {
                      return prevItems.map((i) => {
                        if (i.itemId === item.itemId) {
                          return {
                            ...i,
                            cost:
                              (rx.test(e.toString()) && e) ||
                              (e.length < 2 ? 0 : item.cost),
                          };
                        }
                        return i;
                      });
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <button onClick={() => removeItemById(item.itemId)}>
            <AiOutlineDelete />
          </button>
        </div>
      ))}

      <button
        style={{ color: isPrice && "red" }}
        onClick={() => {
          setIsPrice(false);
          setItems((prev) => {
            return [
              ...prev,
              {
                itemId:
                  (items.length && items[items.length - 1].itemId + 1) || 1,
                name: "Adulti",
                discount: discountOtion[0],
                cost: 0,
                carency: "€",
                age: ageOption[0],
                maxWeight: 0,
                count: countOption[0],
                unit: unitOption[0],
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
