import { HiOutlineDownload } from "react-icons/hi";

export default function ExportBtn() {
  return (
    <button className="export-btn">
      <HiOutlineDownload />
      <span>Generate Report</span>
    </button>
  );
}
