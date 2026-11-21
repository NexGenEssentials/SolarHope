"use client";
import { useEffect, useState } from "react";

// The site is a static export, so a plain new Date() would freeze at build
// time. Render the build year, then correct it in the browser.
const BUILD_YEAR = new Date().getFullYear();

export default function CurrentYear() {
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
