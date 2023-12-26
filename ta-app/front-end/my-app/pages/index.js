import { Canvas } from "../components/Canvas/Canvas.jsx";
import { Navbar } from "../components/Navbar/Navbar.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { Abstract } from "../components/Abstract/Abstract.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <Intro />
      <Canvas />
      <Abstract />
    </>
  );
}
