export default function TagInput({ data }) {
  console.log(data);
  return (
    <ul className="tag-input">
      {data.map((d, i) => (
        <li key={i}>
          {d.icon}
          {d.name}
        </li>
      ))}
    </ul>
  );
}
