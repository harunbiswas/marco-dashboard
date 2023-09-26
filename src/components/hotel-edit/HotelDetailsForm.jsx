import { useState } from "react";
import { BiSwim } from "react-icons/bi";
import AgeEdit from "../hotel/AgeEdit";
import DetailsImgs from "./DetailsImgs";
import DetailsInputs from "./DetailsInputs";
import Rating from "./Rating";
import TagInput from "./TagInput";

export default function HotelDetailsForm({ data, setData }) {
  const [include, setInclude] = useState([
    {
      icon: <BiSwim />,
      name: "Private beach",
    },
    {
      icon: <BiSwim />,
      name: "Pool",
    },
    {
      icon: <BiSwim />,
      name: "Spa",
    },
    {
      icon: <BiSwim />,
      name: "Parking included",
    },
    {
      icon: <BiSwim />,
      name: "free wifi",
    },
  ]);

  const [strengths, setStrengths] = useState([
    {
      icon: <BiSwim />,
      name: "Private beach",
    },
    {
      icon: <BiSwim />,
      name: "Pool",
    },
    {
      icon: <BiSwim />,
      name: "Spa",
    },
    {
      icon: <BiSwim />,
      name: "Parking included",
    },
    {
      icon: <BiSwim />,
      name: "free wifi",
    },
  ]);

  return (
    <from className="hotel-details-form">
      <div className="images">
        <h4>Hotel Images</h4>
        <p>
          Add 2 or more images of the hotel to give the customer a better
          experience
        </p>
        <DetailsImgs data={data} setData={setData} />
      </div>
      <div className="hotel-form-details">
        <h4>Hotel Details</h4>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical
        </p>

        <DetailsInputs data={data} setData={setData} />
      </div>
      <div className="hotel-details-form-rating">
        <h4>Stelle Struttura</h4>
        <p>
          Clicca da sinistra verso destra per selezionare il numero di stelle
          della struttura.
        </p>
        <Rating data={data} setData={setData} />
      </div>

      <div className="service">
        <h4>Dettagli Servizi</h4>
        <p>Aggiungi una descrizione sui servizi dell’hotel</p>
        <div className="hotel-form-details-item full">
          <label htmlFor="">Dettagli Servizi</label>
          <div className="inner">
            <textarea
              name="services"
              placeholder="Inserisci una descrizione sui servizi dell’hotel"
              value={data?.serviceDetails}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    serviceDetails: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="hotel-edit-bottom">
        <h4>Service Included</h4>
        <TagInput
          tags={include}
          handler={setInclude}
          name="include"
          setData={setData}
        />
        <h4>Strengths</h4>
        <TagInput
          tags={strengths}
          handler={setStrengths}
          name="strengths"
          setData={setData}
        />
      </div>

      <div className="service age-edit-wrp">
        <h4>Age Reductions</h4>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical
        </p>
        <AgeEdit isEdit={true} data={data} setData={setData} />
      </div>
    </from>
  );
}
