import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Select from "../basic/Select";
// import OfferTags from "../hotel/OfferTags";
import axios from "axios";
import Cookies from "js-cookie";
import { BiPlus } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import values from "../../../values";
import { useHotelContext } from "../../context/hotel.context";
import AgeReduction from "./AgeReduction";
import Breakdown from "./Breakdown";
import Input from "./Input";
import Supplement from "./Supplement";
import TagInput from "./TagInput";
import TextArea from "./TextArea";

const updateOffer = (data, newOffer, offerId) => {
  const updatedOffers = data.offers.map((offer) => {
    if (offer._id === offerId) return newOffer;
    return offer;
  });
  const updatedData = { ...data, offers: updatedOffers };
  console.log("Data after offer is updated", updatedData);
  return updatedData;
};

const addNewOffer = (data, newOffer) => {
  if (Array.isArray(data.offers)) data.offers.push(newOffer);
  else data.offers = [newOffer];
  const updatedData = { ...data };
  return updatedData;
};

export default function AddNewOffer({
  isAdd,
  setIsAdd,
  isAddNewOfferClicked,
  setIsAddNewOfferClicked,
  offer,
  setOffer,
  submitHandler,
  data,
  setData,
}) {
  const { isNewHotelAdding } = useHotelContext();
  const [tagsLoading, setTagsLoading] = useState(true);
  const [title, setTitle] = useState(offer ? offer.name : "");
  const [offerID, setOfferID] = useState(
    offer ? offer.id : values.generateUniqueString()
  );

  const [description, setDescription] = useState(
    offer ? offer.description : ""
  );

  const [startDate, setStartDate] = useState(
    offer ? new Date(offer.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    offer ? new Date(offer.endDate) : null
  );
  const [packages, setPackage] = useState(offer ? offer?.packages : "");
  const [omaggi, setOmaggi] = useState(offer ? offer?.omaggi : "");
  const [supplement, setSupplement] = useState(
    offer.supplement ? offer.supplement : []
  );

  const [minStay, setMinStay] = useState(offer ? offer.minStay : "");
  const [maxStay, setMaxStay] = useState(offer ? offer.maxStay : "");

  const [beverageAvailability, setBeverageAvailability] = useState(
    offer ? offer.beverageAvailability : ""
  );

  const [items, setItems] = useState(
    offer
      ? offer.breakdown
      : [
          { breakdownId: 1, name: "", priceType: "", currency: "€", price: 0 },
          { breakdownId: 2, name: "", priceType: "", currency: "€", price: 0 },
          { breakdownId: 3, name: "", priceType: "", currency: "€", price: 0 },
        ]
  );

  const [ages, setAges] = useState(
    offer
      ? offer.ageReduction
      : [
          { reductionId: 1, boardType: "", agelimit: 0, discount: 10 },
          { reductionId: 2, boardType: "", agelimit: 0, discount: 10 },
        ]
  );

  const [offerTags, setOfferTags] = useState(offer ? offer?.tags : []);

  const [existingTags, setExistingTags] = useState([]);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    (async () => {
      try {
        const { data: tags } = await axios.get(`${values.url}/tag`, {
          headers: {
            token,
          },
        });
        setExistingTags(tags.offerTags ?? []);
      } catch (error) {
        console.log(error);
      }
      setTagsLoading(false);
    })();
  }, []);

  const handleBreakdownChange = (value, id, property) => {
    console.log("handleBreakdownChange", items);
    const updatedItems = items.map((item) => {
      return item.breakdownId === id
        ? {
            ...item,
            [property]: value,
          }
        : item;
    });
    // console.log(updatedItems);
    setItems(updatedItems);
  };

  const handleAgeChange = (value, id, property) => {
    console.log("handleAgeChange", ages);
    const updatedAges = ages.map((age) => {
      return age.reductionId === id
        ? {
            ...age,
            [property]: (value > 18 && 18) || value,
          }
        : age;
    });
    // console.log(updatedAges);
    setAges(updatedAges);
  };

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    if (isAddNewOfferClicked) setOfferID(values.generateUniqueString());
  }, [isAdd]);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsAdd(false);
      }
    });
  }, []);

  const handleSave = async () => {
    const newOfferData = {
      name: title,
      id: offerID,
      description,
      startDate,
      endDate,
      minStay,
      maxStay,
      beverageAvailability,
      tags: offerTags,
      breakdown: items,
      ageReduction: ages,
      packages,
      omaggi,
      supplement,
    };
    console.log({
      newOffer: newOfferData,
      hotelId: data._id,
    });
    if (isNewHotelAdding) {
      if (isAddNewOfferClicked) {
        setData((prevData) => addNewOffer(prevData, newOfferData));
      } else {
        setData((prevData) => updateOffer(prevData, newOfferData, offer._id));
      }
    } else {
      try {
        if (isAddNewOfferClicked) {
          await axios.post(
            `${values.url}/hotel/offer`,
            {
              newOffer: newOfferData,
              hotelId: data._id,
            },
            {
              headers: {
                token,
              },
            }
          );
          setData((prevData) => addNewOffer(prevData, newOfferData));
        } else {
          await axios.put(
            `${values.url}/hotel/offer`,
            {
              updatedOffer: newOfferData,
              hotelId: data._id,
              offerId: offer._id,
            },
            {
              headers: {
                token,
              },
            }
          );
          setData((prevData) => updateOffer(prevData, newOfferData, offer._id));
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsAdd(false);
    setIsAddNewOfferClicked(false);
    setOffer(null);
  };

  // update
  const [isSpa, setIsSpa] = useState(false);
  const [isRestu, setIsRestu] = useState(false);

  return (
    <div ref={wrp} className={`add-new-offer  ${(isAdd && "show") || ""}`}>
      <div ref={ref} className="add-new-offer-inner booking-box">
        <div className="add-new-offer-top">
          <h4>
            {isAddNewOfferClicked
              ? "Crea una nuova offerta"
              : "Modifica Offerta"}
          </h4>
          <button
            onClick={() => {
              setIsAdd(false);
              setIsAddNewOfferClicked(false);
              setOffer(null);
            }}
          >
            <GrClose />
          </button>
        </div>
        <div className="add-new-offer-body">
          <div className="offer-details">
            <h4>Dettagli Offerta</h4>
            <p>Inserisci o modifica i dettagli dell’offerta</p>
            <div className="add-new-offer-details">
              <div className="item">
                <label htmlFor="title">Nome Offerta</label>
                <Input
                  handler={setTitle}
                  d={{ value: title, label: "Enter title" }}
                />
              </div>
              <div className="item">
                <label htmlFor="title">ID Offerta</label>
                <Input
                  handler={setOfferID}
                  d={{ value: offerID, label: "#" }}
                />
              </div>
              <div className="item full">
                <label htmlFor="title">Descrizione offerta</label>
                <TextArea
                  value={description}
                  handler={(e) => setDescription(e)}
                  pls="Inserisci la descrizione dell’offerta"
                />
              </div>

              <div className="buttons">
                {((isSpa || offer?.packages) && (
                  <div className="hotel-form-details-item  full">
                    <label htmlFor="">Descrizione Spa</label>
                    <div className="inner">
                      <textarea
                        name="hotelDescription"
                        placeholder="Inserisci una descrizione delle spa"
                        value={packages}
                        onChange={(e) => {
                          setPackage(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                )) || (
                  <button
                    onClick={(e) => {
                      setIsSpa(true);
                    }}
                  >
                    <BiPlus />
                    Aggiungi Desc. Pacchetto Incluso
                  </button>
                )}{" "}
                {isRestu || offer?.omaggi ? (
                  <div className="hotel-form-details-item full">
                    <label htmlFor="hotelDescription">
                      Descrizione ristorante
                    </label>
                    <div className="inner">
                      <textarea
                        name="hotelDescription"
                        placeholder="Inserisci una descrizione delle ristorante"
                        value={omaggi}
                        onChange={(e) => setOmaggi(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      console.log(isRestu);
                      setIsRestu(true);
                    }}
                  >
                    <BiPlus />
                    Aggiungi Desc. Omaggi
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="offer-details">
            <h4>Validità Offerta</h4>
            <p>Inserisci il periodo di validità</p>
            <div className="add-new-offer-details">
              <div className="item">
                <label htmlFor="Valida dal">Valida dal</label>
                <input
                  type="date"
                  value={startDate && startDate.toLocaleDateString("en-CA")}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  name=""
                  id=""
                  placeholder="select date"
                />
              </div>
              <div className="item">
                <label htmlFor="Valida fino al">Valida fino al</label>
                <input
                  type="date"
                  value={endDate && endDate.toLocaleDateString("en-CA")}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  name=""
                  id=""
                  min={
                    startDate && new Date(startDate).toISOString().split("T")[0]
                  }
                  placeholder="select date"
                />
              </div>
            </div>
          </div>{" "}
          <div className="offer-details">
            <h4>Condizioni Offerta</h4>

            <div className="add-new-offer-details">
              <div className="item">
                <label htmlFor="Minimo notti">Minimo notti</label>
                {/* <Select data={["2 days", "3 days", "4 days"]} /> */}
                <Input
                  type="number"
                  handler={setMinStay}
                  d={{ value: minStay }}
                />
              </div>
              <div className="item">
                <label htmlFor="Massimo notti">Massimo notti</label>
                {/* <Select data={["5 days", "3 days", "4 days"]} /> */}
                <Input
                  type="number"
                  handler={setMaxStay}
                  d={{ value: maxStay }}
                />
              </div>
              <div className="item">
                <label htmlFor="title">Bevande incluse</label>
                <Select
                  data={["Incluse", "Non Incluse"]}
                  activeValue={beverageAvailability || "Non Incluse"}
                  handler={(e) => {
                    setBeverageAvailability(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="offer-details">
            <h4>Tags</h4>
            {/* <OfferTags /> */}
            {!tagsLoading && (
              <TagInput
                tags={existingTags}
                handler={setExistingTags}
                name="offerTags"
                setData={setOfferTags}
                data={offerTags}
                fixtData={offer?.tags}
              />
            )}
          </div>{" "}
          <div className="offer-details">
            <h4>Supplementi</h4>
            <Supplement supplement={supplement} setSupplement={setSupplement} />
          </div>
          <div className="offer-details">
            <h4>Prezzi</h4>
            <div className="breakdown">
              {items.map((item, i) => (
                <Breakdown
                  minStay={minStay}
                  maxStay={maxStay}
                  handler={(value, id, property) =>
                    handleBreakdownChange(value, id, property)
                  }
                  key={i}
                  data={item}
                  i={i}
                />
              ))}
            </div>
          </div>
          <div className="offer-details">
            <h4>Riduzioni Età</h4>
            <div className="breakdown">
              {ages.map((age, i) => (
                <AgeReduction
                  handler={(value, id, property) =>
                    handleAgeChange(value, id, property)
                  }
                  key={i}
                  data={age}
                />
              ))}
              <button
                onClick={() => {
                  setAges((prev) => {
                    return [
                      ...prev,
                      {
                        reductionId: ages.length + 1,
                        boardType: "",
                        agelimit: 0,
                        discount: 10,
                      },
                    ];
                  });
                }}
              >
                <AiOutlinePlus /> Add More Age Reduction
              </button>
            </div>
          </div>
          <div className="offer-details">
            <h4>Opzioni Extra</h4>

            <div className="add-new-offer-details">
              <div className="item extrasdjfsjdfkj">
                <input type="checkbox" />
                <label htmlFor="Minimo notti">
                  Disattiva l'aggiornamento automatico di questa offerta{" "}
                  <button title="Questa opzione, se attivata consente di evitare l'aggiornamento automatico di questa offerta, insieme alle relative informazioni e opzioni, dal Flusso XML. Inoltre, se questa offerta non è presente nel Flusso XML delle offerte, essa non verrà eliminata.">
                    <BsInfoCircle />
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-edit-footer">
          <div className="left">
            <button onClick={() => setIsAdd(false)}>Discard</button>
          </div>
          <div className="right">
            {/* <button onClick={handleSave}>Save Changes</button> */}
            <button onClick={handleSave} className="submit">
              {isAddNewOfferClicked ? "Aggiungi Offerta" : "Salva Modifiche"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
