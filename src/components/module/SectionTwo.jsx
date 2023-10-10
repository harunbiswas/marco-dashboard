import { useState } from "react";
import Input from "../hotel-edit/Input";
import TextArea from "../hotel-edit/TextArea";

export default function SectionTwo({ data, setData }) {
  const [videoLink, setVideoLink] = useState("");
  const [videoLink1, setVideoLink1] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className="module-edit-basic">
      <h4>Section 2</h4>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin
      </p>

      <div className="module-edit-basic-wrp">
        <div className="module-edit-basic-item">
          <label htmlFor="vidwoLink">1st Video Link</label>
          <Input
            d={{ value: data?.section2Video1 || "", label: "Enter URL" }}
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
        <div className="module-edit-basic-item">
          <label htmlFor="vidwoLink1">2nd Video Link</label>
          <Input
            d={{ value: data?.section2Video2 || "", label: "Enter URL" }}
            i="vidwoLink1"
            handler={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  section2Video2: e,
                };
              });
            }}
          />
        </div>
      </div>

      <div className="module-edit-basic-item">
        <label htmlFor="title1">Title</label>
        <Input
          d={{ value: data?.section2Title || "", label: "Enter Title" }}
          i="title1"
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                section2Title: e,
              };
            });
          }}
        />
      </div>
      <div className="module-edit-basic-item">
        <label htmlFor="">Description</label>
        <TextArea
          value={data?.section2Desctiption || ""}
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                section2Desctiption: e,
              };
            });
          }}
        />
      </div>
    </div>
  );
}
