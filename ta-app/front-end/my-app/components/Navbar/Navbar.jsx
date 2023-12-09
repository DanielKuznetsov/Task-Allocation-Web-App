import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { SolverModal } from "../SolverModal/SolverModal.jsx";
import classes from "./Navbar.module.css";
import Logo from "../../public/icons/logo.svg";

export const Navbar = () => {
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <div className={classes.logoWrapper}>
            {/* Logo with link to main page */}
            <Image src={Logo} alt="Company Logo" />
          </div>

          <div className={classes.buttons}>
            {/* Button linking to the paper page */}
            <Button variant="outline">Read Paper</Button>

            {/* Button to open the solver modal */}
            <Button variant="filled" onClick={openModal}>
              Start Solver
            </Button>
          </div>
        </div>
      </nav>

      {/* Solver Modal */}
      <SolverModal opened={isModalOpen} close={closeModal} />
    </>
  );
};