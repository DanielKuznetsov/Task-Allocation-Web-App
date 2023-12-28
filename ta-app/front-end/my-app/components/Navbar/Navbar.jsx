import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { SolverModal } from "../SolverModal/SolverModal.jsx";
import classes from "./Navbar.module.css";
import Logo from "../../public/icons/logo.svg";
import { MantineButton } from "../Button/MantineButton.jsx";
import { NavLink } from "../NavLink/NavLink.jsx";
import Link from "next/link.js";
import { usePathname } from "next/navigation.js";
import scrollIntoView from "scroll-into-view-if-needed";
import { useEffect } from 'react';
import Swup from 'swup';
import SwupRouteNamePlugin from '@swup/route-name-plugin';

export const Navbar = () => {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const path = usePathname();

  const scrollToSection = (sectionId) => {
    return () => {
      const section = document.getElementById(sectionId);
      if (section) {
        scrollIntoView(section, {
          behavior: "smooth",
          block: "start",
        });
      }
    };
  };

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
            {path === "/" ? (
              <>
                <NavLink
                  context="Abstract"
                  onClick={scrollToSection("abstract")}
                />
                <NavLink
                  context="Motivation"
                  onClick={scrollToSection("motivation")}
                />
                <NavLink
                  context="Approach"
                  onClick={scrollToSection("approach")}
                />
                <NavLink context="Results" />
                <NavLink context="Read Paper" />
              </>
            ) : (
              ""
            )}
          </div>

          <div className={classes.buttons}>
            {/* <MantineButton variant="outline" context="Read Paper" /> */}

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

      <SolverModal opened={isModalOpen} close={closeModal} />
    </>
  );
};
