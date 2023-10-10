import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Input from "../hotel-edit/Input";
import TextArea from "../hotel-edit/TextArea";

export default function SectionThree({ data, fixtData, setData }) {
  const [title, setTitle] = useState("");

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "",
      img: "",
      url: "",
    },
  ]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        blog: blogs,
      };
    });
  }, [blogs]);

  useEffect(() => {
    setBlogs(
      fixtData?.blog || [
        {
          id: 1,
          title: "",
          img: "",
          url: "",
        },
      ]
    );
  }, [fixtData]);

  const handleChange = (blogIndex, itemName, newValue) => {
    // Create a copy of the blogs state
    const updatedBlogs = [...blogs];

    // Update the value of the specified item
    updatedBlogs[blogIndex][itemName] = newValue;

    // Set the updated state
    setBlogs(updatedBlogs);
  };

  const addNewBlog = () => {
    // Create a new blog object with initial values
    const newBlog = {
      id: blogs.length + 1 || 1,
      title: "",
      img: "",
      url: "",
    };

    // Add the new blog entry to the existing array
    setBlogs([...blogs, newBlog]);
  };

  const deleteRegion = (blogIndex) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog.id !== blogIndex);
      return updatedBlogs;
    });
  };

  return (
    <div className="module-edit-basic">
      <h4>Section 3</h4>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin
      </p>

      <div className="module-edit-basic-item">
        <label htmlFor="title1">Title</label>
        <Input
          d={{ value: data?.section3Title || "", label: "Enter Title" }}
          i="title1"
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                section3Title: e,
              };
            });
          }}
        />
      </div>
      <div className="module-edit-basic-item">
        <label htmlFor="">sub-Description</label>
        <TextArea
          value={data?.section3Description || ""}
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                section3Description: e,
              };
            });
          }}
        />
      </div>

      <br />
      <h4>Blog</h4>
      {blogs?.map((blog, i) => (
        <div key={i} className="module-edit-basic-wrp">
          <div className="module-edit-basic-item">
            <label htmlFor="vidwoLink">Title</label>
            <Input
              d={{ value: blog?.title || "", label: "Enter Title" }}
              i="vidwoLink"
              handler={(e) => handleChange(i, "title", e)}
            />
          </div>
          <div className="module-edit-basic-item">
            <label htmlFor="vidwoLink">Image URL</label>
            <Input
              d={{ value: blog?.img || "", label: "Enter URL" }}
              i="vidwoLink"
              handler={(e) => handleChange(i, "img", e)}
            />
          </div>
          <div className="module-edit-basic-item">
            <label htmlFor="vidwoLink">Title</label>
            <Input
              d={{ value: blog?.url || "", label: "Redirect URL" }}
              i="vidwoLink"
              handler={(e) => handleChange(i, "url", e)}
            />

            {blog?.url && (
              <a
                className="url-btn"
                href={blog?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsBoxArrowUpRight />
              </a>
            )}
          </div>

          <button onClick={() => deleteRegion(blog.id)}>
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      <button onClick={addNewBlog}>
        <AiOutlinePlus />
        Add More
      </button>

      <div className="module-edit-basic-item">
        <label htmlFor="">Bottom Description</label>
        <TextArea
          value={data?.bottomDescription || ""}
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                bottomDescription: e,
              };
            });
          }}
        />
      </div>
    </div>
  );
}
