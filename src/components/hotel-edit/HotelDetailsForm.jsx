import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import AgeEdit from "../hotel/AgeEdit";
import DetailsImgs from "./DetailsImgs";
import DetailsInputs from "./DetailsInputs";
import Rating from "./Rating";
import TagInput from "./TagInput";

export default function HotelDetailsForm({ data, setData, fixtData }) {
  const [existingStrengths, setExistingStrengths] = useState([]);
  const [existingServices, setExistingServices] = useState([]);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    (async () => {
      try {
        const { data: tags } = await axios.get(`${values.url}/tag`, {
          headers: {
            token,
          },
        });
        setExistingServices(tags.hotelServices ?? []);
        setExistingStrengths(tags.hotelStrengths ?? []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="hotel-details-form">
      <div className="images">
        <h4>Immagini Hotel</h4>
        <p>Aggiungi una o più immagini dell'hotel da far vedere all'utente</p>
        <DetailsImgs data={data} setData={setData} />
      </div>
      <div className="hotel-form-details">
        <h4>Dettagli Hotel</h4>
        <p>Inserisci o modifica i dettagli dell'hotel qui sotto</p>

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
          tags={existingServices}
          handler={setExistingServices}
          name="hotelServices"
          setData={setData}
          data={data}
          fixtData={fixtData}
        />
        <h4>Punti di forza</h4>
        <TagInput
          tags={existingStrengths}
          handler={setExistingStrengths}
          name="hotelStrengths"
          setData={setData}
          data={data}
          fixtData={fixtData}
        />
      </div>

      <div className="service age-edit-wrp">
        <h4>Riduzioni Età</h4>
        <p>
          Questi valori verranno presi come default per tutte le offerte
          dell’hotel. Tuttavia potranno essere modificati anche per le singole
          offerte
        </p>
        <AgeEdit isEdit={true} data={data} setData={setData} />
      </div>
    </div>
  );
}
