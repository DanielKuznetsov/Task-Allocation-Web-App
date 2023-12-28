import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { Canvas } from "../../components/Canvas/Canvas.jsx";

export default function Demo() {
  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "6.325rem auto",
        }}
      >
        <Canvas />
      </div>
    </>
  );
}
