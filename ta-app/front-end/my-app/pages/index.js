import { Navbar } from "../components/Navbar/Navbar.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { Abstract } from "../components/Abstract/Abstract.jsx";
import { Motivation } from "../components/Motivation/Motivation.jsx";
import { Approach } from "../components/Approach/Approach.jsx";
import PageTransition from "../components/PageTransition/PageTransition.jsx";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <Intro />
      <Abstract />
      <Motivation />
      <Approach />
    </PageTransition>
  );
}
