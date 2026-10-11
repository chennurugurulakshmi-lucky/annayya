import { useState } from "react";

import Home from "./pages/Home";
import Letter from "./pages/Letter";
import Memories from "./pages/Memories";
import MagicalDoor from "./pages/MagicalDoor";
import Surprise from "./pages/Surprise";

function App() {
const [page, setPage] = useState("home");

return (
<>
{page === "home" && (
<Home onViewMessage={() => setPage("letter")} />
)}

```
  {page === "letter" && (
    <Letter onNext={() => setPage("memories")} />
  )}

  {page === "memories" && (
    <Memories
      onNext={() => {
        console.log("Opening Magical Door page...");
        setPage("magicalDoor");
      }}
    />
  )}

  {page === "magicalDoor" && (
    <MagicalDoor
      onNext={() => {
        console.log("Opening Surprise page...");
        setPage("surprise");
      }}
    />
  )}

  {page === "surprise" && (
    <Surprise />
  )}
</>

);
}

export default App;
