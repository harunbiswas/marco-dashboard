import axios from "axios";
import { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi";
import { useParams } from "react-router-dom";
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
  const bootCump = [
    {
      name: "Modules",
      url: "/module",
      icon: <HiDocumentText />,
    },
    {
      name: "El Plazo Module v2",
    },
  ];

  const [data, setData] = useState({});
  const [fixtData, setFixtData] = useState({});

  const [isTemplate, setIsTemplate] = useState(false);

  const [isSaveTemplate, setIsSaveTemplate] = useState(false);

  useEffect(() => {
    axios
      .get(`${values.url}/module/single?id=${id}`)
      .then((d) => {
        setData(d.data);
        setFixtData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className=" module-edit hotel">
      <ModuleTemplate addhotel={isTemplate} handler={setIsTemplate} />

      <SaveTemplate addhotel={isSaveTemplate} handler={setIsSaveTemplate} />
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
              text="Import Template  "
            />
          </div>
          <CopyLink />
          <div className="module-edit-basic">
            <h4>Module Preview</h4>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin
            </p>
            <AddImage />
            <div className="module-edit-basic-item">
              <label htmlFor="title">SEO - Title</label>
              <Input
                d={{ value: data?.seoTitle, label: "Enter SEO Title" }}
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
              <label htmlFor="">SEO - Description</label>
              <TextArea
                value={data?.seoDescription}
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
            <h4>Section 1</h4>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin
            </p>

            <div className="module-edit-basic-item">
              <label htmlFor="title1">Title</label>
              <Input
                d={{ value: data?.section1Title, label: "Enter Title" }}
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
              <label htmlFor="">Description</label>
              <TextArea
                value={data?.section1Description}
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
              <label htmlFor="vidwoLink">Video Link</label>
              <Input
                d={{ value: data?.section1Video, label: "Enter URL" }}
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
          <FixedOffer saveTemplateHandler={setIsSaveTemplate} />
          <div className="hotel-edit-footer">
            <div className="left">
              <button>Discard</button>
            </div>
            <div className="right">
              <button onClick={() => setIsSaveTemplate(true)}>
                Save as Template
              </button>
              <button className="submit">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
