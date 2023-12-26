import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { SolverModal } from "../SolverModal/SolverModal.jsx";
import classes from "./Navbar.module.css";
import Logo from "../../public/icons/logo.svg";
import { MantineButton } from "../Button/MantineButton.jsx";
import { NavLink } from "../NavLink/NavLink.jsx";

export const Navbar = () => {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <div className={classes.logoWrapper}>
            {/* Logo with link to main page */}
            <Image src={Logo} alt="Company Logo" />
          </div>

          <div className={classes.links}>
            {/* Must remember IDs used */}
            <NavLink href="#abstract" context="Abstract" />
            <NavLink href="#sectionName" context="Approach" />
            <NavLink href="#sectionName" context="Results" />
            <NavLink href="#sectionName" context="Blog" />
          </div>

          <div className={classes.buttons}>
            {/* Button linking to the paper page */}
            <MantineButton variant="outline" context="Read Paper" />

            {/* Button to open the solver modal */}
            <MantineButton
              variant="filled"
              context="Get Started"
              onClick={openModal}
            />
          </div>
        </div>
      </nav>

      {/* Solver Modal */}
      <SolverModal opened={isModalOpen} close={closeModal} />
    </>
  );
};
