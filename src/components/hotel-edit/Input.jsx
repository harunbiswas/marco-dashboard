import { useEffect, useState } from "react";

export default function Input({ d, i }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(d.value);
  }, []);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={d.label}
      id={i}
    />
  );
}
