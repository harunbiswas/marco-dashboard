import { LuEdit } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function EditBtn() {
  return (
    <div className="edit-btn">
      <Link to="/">
        <LuEdit /> Edit
      </Link>
    </div>
  );
}
