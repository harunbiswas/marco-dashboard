import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import values from "../../../values";
import Bootcump from "../basic/BootCump";
import ExportBtn from "../basic/ExportBtn";
import CopyLink from "../booking/CopyLink";
import Input from "../hotel-edit/Input";
import TextArea from "../hotel-edit/TextArea";
import AddImage from "../module/AddImage";
import FixedOffer from "../module/FixecOffer";
import ModuleTemplate from "../module/ModuleTemplate";
import SaveTemplate from "../module/SaveTemplate";
import SectionThree from "../module/SectionThree";
import SectionTwo from "../module/SectionTwo";

export default function EditModule() {
  const { id } = useParams();

  const [isDelete, setIsDele] = useState(false);

  const navigate = useNavigate();
  const [tempLoad, setTempLoad] = useState(false);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const [data, setData] = useState({});
  const [fixtData, setFixtData] = useState({});

  const [moduleData, setModuleData] = useState({});

  const [isTemplate, setIsTemplate] = useState(false);

  const [isSaveTemplate, setIsSaveTemplate] = useState(false);

  useEffect(() => {
    axios
      .get(`${values.url}/module/single?id=${id}`)
      .then((d) => {
        setModuleData(d.data);
        axios
          .get(`${values.url}/module/templete?id=${d.data.templeteId}`)
          .then((d1) => {
            setFixtData(d1.data);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const publishHandler = () => {
    moduleData.templeteId = data?._id;
    moduleData.publish = true;

    axios
      .put(`${values.url}/module`, moduleData, {
        headers: {
          token,
        },
      })
      .then((d) => {
        console.log(d);
        navigate("/module");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [mName, setMName] = useState("");
  const deleteHandler = () => {
    axios
      .delete(`${values.url}/module?id=${moduleData?._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        navigate("/module");
      });
  };

  useEffect(() => {
    setData(fixtData);
  }, [fixtData]);

  const bootCump = [
    {
      name: "Moduli",
      url: "/module",
      icon: <HiDocumentText />,
    },
    {
      name: moduleData?.name,
    },
  ];

  return (
    <div className=" module-edit hotel">
      <ModuleTemplate
        addhotel={isTemplate}
        setData={setData}
        handler={setIsTemplate}
        tempLoad={tempLoad}
        setTempLoad={setTempLoad}
        setFixtData={setFixtData}
      />

      <SaveTemplate
        addhotel={isSaveTemplate}
        tempLoad={tempLoad}
        setTempLoad={setTempLoad}
        setData={setData}
        data={data}
        handler={setIsSaveTemplate}
      />
      <div className="container">
        <Bootcump data={bootCump} />

        <div className="module-edit-wrp booking-box">
          <div className="module-edit-top">
            <div className="left">
              <div className="icon">
                <HiDocumentText />
              </div>
            </div>{" "}
            <ExportBtn
              handler={() => setIsTemplate(true)}
              text="Importa Template"
            />
          </div>
          <CopyLink />
          <div className="module-edit-basic">
            <h4>Crea Modulo</h4>
            <p>Inserisci o modifica le informazioni del modulo qui sotto</p>
            <AddImage />
            <div className="module-edit-basic-item">
              <label htmlFor="title">SEO - Titolo</label>
              <Input
                d={{
                  value: data?.seoTitle || "",
                  label: "Inserisci il titolo SEO",
                }}
                i="title"
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      seoTitle: e,
                    };
                  });
                }}
              />
            </div>
            <div className="module-edit-basic-item">
              <label htmlFor="">SEO - Descrizione</label>
              <TextArea
                pls="Inserisci la descrizione SEO"
                value={data?.seoDescription || ""}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      seoDescription: e,
                    };
                  });
                }}
              />
            </div>
          </div>{" "}
          <div className="module-edit-basic">
            <h4>Sezione Video</h4>
            <p>
              Questa è la sezione con il video, cioè la prima sezione dopo il
              form
            </p>

            <div className="module-edit-basic-item">
              <label htmlFor="title1">Titolo della Sezione Video</label>
              <Input
                d={{
                  value: data?.section1Title || "",
                  label: "Inserisci Titolo",
                }}
                i="title1"
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      section1Title: e,
                    };
                  });
                }}
              />
            </div>
            <div className="module-edit-basic-item">
              <label htmlFor="">Testo della Sezione</label>
              <TextArea
                pls="Inserici il testo qui..."
                value={data?.section1Description || ""}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      section1Description: e,
                    };
                  });
                }}
              />
            </div>
            <div className="module-edit-basic-item">
              <label htmlFor="vidwoLink">Link Video </label>
              <Input
                d={{ value: data?.section1Video || "", label: "Inserisci URL" }}
                i="vidwoLink"
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      section1Video: e,
                    };
                  });
                }}
              />
            </div>
          </div>
          <SectionTwo data={data} setData={setData} />
          <SectionThree fixtData={fixtData} data={data} setData={setData} />
          <FixedOffer
            data={data}
            setData={setData}
            fixtData={fixtData}
            saveTemplateHandler={setIsSaveTemplate}
            tempLoad={tempLoad}
            setTempLoad={setTempLoad}
          />
          {isDelete && (
            <div className="isdelete">
              <h2 className="jakarta">
                {(moduleData?.publish && "Delete Module") ||
                  "Vuoi tornare indietro"}
              </h2>
              <p className="jakarta">
                please type hotel name: <strong>{moduleData?.name}</strong> to
                be sure that you want delete
              </p>
              <br />
              {moduleData?.publish && (
                <input
                  type="text"
                  value={mName}
                  onChange={(e) => {
                    setMName(e.target.value);
                  }}
                  placeholder="name of the module"
                  style={{ color: "red" }}
                />
              )}
              <div className="buttons">
                <button
                  onClick={() => {
                    setIsDele(false);
                  }}
                  className="btn"
                >
                  Annulla
                </button>
                <button
                  disabled={moduleData?.publish && moduleData?.name !== mName}
                  onClick={deleteHandler}
                  className="delete-btn sdkfjlsjadf btn"
                >
                  Elimina
                </button>
              </div>
            </div>
          )}
          <div className="hotel-edit-footer">
            <div className="left">
              <button onClick={() => setIsDele(true)}>Discard</button>
            </div>
            <div className="right">
              <button onClick={() => setIsSaveTemplate(true)}>
                Save as Template
              </button>
              <button onClick={publishHandler} className="submit">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
