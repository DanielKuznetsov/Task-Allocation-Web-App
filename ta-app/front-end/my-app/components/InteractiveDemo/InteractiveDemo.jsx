import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { Canvas } from "../../components/Canvas/Canvas.jsx";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

export const InteractiveDemo = () => {
  return (
    <PageTransition>
      <Navbar />
      <div
        style={{
          margin: "6.325rem auto",
        }}
      >
        <Canvas />
      </div>
    </PageTransition>
  );
};
