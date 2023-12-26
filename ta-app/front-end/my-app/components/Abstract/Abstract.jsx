import classes from "./Abstract.module.css";
import { useToggle } from "@mantine/hooks";
import { ActionIcon, Tooltip, Text } from "@mantine/core";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { MantineButton } from "../Button/MantineButton";

export const Abstract = () => {
  const [value, toggle] = useToggle();
  const [clamped, setClamped] = useState(3);
  const [isVisible, setIsVisible] = useState(true);
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    setIsVisible(false);

    const timeoutId = setTimeout(() => {
      setTextContent(
        value ? (
          <p>
            <span style={{ color: "rgba(0,0,0,.75" }}>Shortened Version:</span>{" "}
            We explore the Multi-Robot Task Allocation (MRTA) problem in a
            warehouse setting with pick-up/drop-off tasks using a Boolean
            Satisfiability (SAT) problem model. We use the PySAT toolkit with
            the CaDiCaL SAT solver, aiming to allocate tasks to robots quickly
            within spatial constraints and time limits. Our analysis reveals the
            SAT solver efficiently handles up to 90 tasks within seconds,
            indicating the method's feasibility for real-world applications.
            Future work will explore larger fleets, longer time horizons, and
            problem size scaling to better evaluate this approach's
            effectiveness.
          </p>
        ) : (
          <p>
            <span style={{ color: "rgba(0,0,0,.75" }}>Complete Version:</span>{" "}
            Multi-agent systems, composed of distinct entities/agents
            co-existing in a shared environment, arise in many applications
            including autonomous vehicles and ware- house robotics. In this
            work, we study a Multi-Robot Task Allocation (MRTA) problem in a
            warehouse environment with pick-up/drop-off of tasks, homogeneous
            agents, and known task completion time. The goals are to quickly
            allocate tasks to robots given spatial constraints and a time limit
            and to assess the feasibility of the given problem. We model this
            system as a Boolean Satisfiability (SAT) problem and employ a SAT
            solver, which can efficiently solve problems with high computational
            complexity. We implement our encoding using the PySAT toolkit API
            with CaDiCaL, a state-of-the-art SAT solver. To evaluate the
            effectiveness of our encoding and SAT implementa- tion, we performed
            an in-depth runtime analysis in a simulated warehouse-style setting
            with 25 robots and up to 90 tasks. The SAT solver runtime
            exponentially increases with increased numbers of tasks as expected;
            however, we are still able to find a solution for 90 tasks within 45
            seconds. In this study, we demonstrate that SAT-based methods for
            MRTA problems can efficiently assign tasks to robots, making it
            possible for applica- tion in real-world warehouse settings. Future
            work will explore larger fleets, longer time horizons, and problem
            size scaling to better evaluate this approach's effectiveness.
          </p>
        )
      );

      setIsVisible(true);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleClamp = () => {
    setClamped(clamped === 3 ? 100 : 3);
  };

  return (
    <section id="abstract" className={classes.container}>
      <div className={classes.contentWrapper}>
        <div className={classes.headingWrapper}>
          <h1 className={classes.heading}>Abstract</h1>
          <Tooltip
            multiline
            w={145}
            withArrow
            transitionProps={{ duration: 200 }}
            label={
              value
                ? "Click to view the complete abstract."
                : "Click to view the short version."
            }
            onClick={toggle}
          >
            <ActionIcon
              classNames={{ root: classes.actionIcon }}
              size="lg"
              variant="outline"
              color="blue"
            >
              {value ? (
                <ChevronUpIcon width="20" height="20" />
              ) : (
                <ChevronDownIcon width="20" height="20" />
              )}
            </ActionIcon>
          </Tooltip>
        </div>

        <Text
          lineClamp={clamped}
          className={`${classes.abstract} ${
            !isVisible && classes.abstractHidden
          }`}
        >
          {textContent}
        </Text>

        <MantineButton
          onClick={handleClamp}
          variant="abstract"
          context={clamped === 3 ? "Read More" : "Read Less"}
        />
      </div>
    </section>
  );
};
