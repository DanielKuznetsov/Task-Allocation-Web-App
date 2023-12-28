import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { SolverModal } from "../SolverModal/SolverModal.jsx";
import classes from "./Navbar.module.css";
import Logo from "../../public/icons/logo.svg";
import { MantineButton } from "../Button/MantineButton.jsx";
import { NavLink } from "../NavLink/NavLink.jsx";
import Link from "next/link.js";
import { usePathname } from "next/navigation.js";

export const Navbar = () => {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const path = usePathname();

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <div className={classes.logoWrapper}>
            <Link href="/">
              <Image src={Logo} alt="Company Logo" />
            </Link>
          </div>

          <div className={classes.links}>
            {/* Must remember IDs used */}
            {path === "/" ? (
              <>
                <NavLink href="#abstract" context="Abstract" />
                <NavLink href="#motivation" context="Motivation" />
                <NavLink href="#approach" context="Approach" />
                <NavLink href="#sectionName" context="Results" />
                <NavLink href="#sectionName" context="Read Paper" />
              </>
            ) : (
              ""
            )}
            {/* <NavLink href="#sectionName" context="Blog" /> */}
          </div>

          <div className={classes.buttons}>
            {/* Button linking to the paper page */}
            {/* <MantineButton variant="outline" context="Read Paper" /> */}

            {/* Button to open the solver modal */}
            <Link href="/demo">
              <MantineButton
                variant="filled"
                context={path === "/demo" ? "Upload Data" : "Get Started"}
                onClick={path === "/demo" ? openModal : null}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Solver Modal */}
      <SolverModal opened={isModalOpen} close={closeModal} />
    </>
  );
};
