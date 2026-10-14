import { useState } from "react";
import { WritingIndexPage } from "../components/WritingPages";

export default function BlogIndex() {
  const [active, setActive] = useState("All");
  return <WritingIndexPage active={active} onCategoryChange={setActive} />;
}
