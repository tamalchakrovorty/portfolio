"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import OSApp from "@/components/OSApp";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && <OSApp />}
    </>
  );
}
