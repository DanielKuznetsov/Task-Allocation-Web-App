import { Canvas } from "../components/Canvas/Canvas.jsx";
import { Navbar } from "../components/Navbar/Navbar.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { Abstract } from "../components/Abstract/Abstract.jsx";
import { Motivation } from "../components/Motivation/Motivation.jsx";
import { Approach } from "../components/Approach/Approach.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <Intro />
      {/* <Canvas /> */}
      <Abstract />
      <Motivation />
      <Approach />
    </>
  );
}
