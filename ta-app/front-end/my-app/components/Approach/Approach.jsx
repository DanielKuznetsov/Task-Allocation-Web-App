import classes from "./Approach.module.css";
import { Text, List } from "@mantine/core";
import Image from "next/image";
import env from "../../public/env.png";
import { useState, useRef } from "react";
import { useScrollIntoView } from "@mantine/hooks";

export const Approach = () => {
  const [selectedCard, setSelectedCard] = useState("bool");
  const ref = useRef();

  const { scrollIntoView, targetRef } = useScrollIntoView({
    offset: 60,
  });

  const handleCardClick = (card) => {
    setSelectedCard(card);
    scrollIntoView({ alignment: "center", ref });
  };

  return (
    <div id="approach" className={classes.container}>
      <h2 className={classes.title}>Approach and Experimental Setup</h2>

      <div className={classes.content}>
        <div className={classes.sidebar}>
          <div
            className={
              selectedCard !== "bool"
                ? classes.card
                : `${classes.card} ${classes.hover}`
            }
            onClick={() => handleCardClick("bool")}
          >
            <div className={classes.number}>💡</div>
            <div className={classes.info}>
              <h4 className={classes.cardTitle}>Boolean Satisfiability</h4>
              <p className={classes.desc}>
                Utilizing SAT to determine feasible task assignments in
                multi-robot systems.
              </p>
            </div>
          </div>

          <div
            className={
              selectedCard === "env"
                ? `${classes.card} ${classes.hover}`
                : classes.card
            }
            onClick={() => handleCardClick("env")}
          >
            <div className={classes.number}>📦</div>
            <div className={classes.info}>
              <h4 className={classes.cardTitle}>Chosen Environment</h4>
              <p className={classes.desc}>
                Description of selected environments modeled as complete
                weighted graphs.
              </p>
            </div>
          </div>

          <div
            className={
              selectedCard === "exp"
                ? `${classes.card} ${classes.hover}`
                : classes.card
            }
            onClick={() => handleCardClick("exp")}
          >
            <div className={classes.number}>🖥️</div>
            <div className={classes.info}>
              <h4 className={classes.cardTitle}>Experiments</h4>
              <p className={classes.desc}>
                Overview of the experimental setup and tools employed in the
                research.
              </p>
            </div>
          </div>
        </div>

        {selectedCard === "bool" && (
          <div ref={targetRef} id="bool" className={classes.infoWrapper}>
            <div className={classes.infoCard}>
              <div className="section">
                <h3 className={classes.infoCardTitle}>
                  Reasoning behind using a SAT-solver
                </h3>
                <p className={classes.infoCardDesc}>
                  We modeled this system as a Boolean Satisfiability (SAT)
                  problem and employed a SAT solver, which can efficiently solve
                  problems with high computational complexity.
                </p>
              </div>

              <div className="section">
                <h3 className={classes.infoCardTitle}>
                  Establishing a boolean formula
                </h3>
                <div className={classes.formula}>
                  <Text order={3}>
                    (
                    <Text span c="blue" inherit>
                      X
                    </Text>{" "}
                    <Text span c="red" inherit>
                      ∨
                    </Text>{" "}
                    <Text span c="blue" inherit>
                      Y
                    </Text>
                    ){" "}
                    <Text span c="red" inherit>
                      <Text span c="red" inherit>
                        ∧
                      </Text>
                    </Text>{" "}
                    (
                    <Text span c="blue" inherit>
                      Z
                    </Text>{" "}
                    <Text span c="red" inherit>
                      ∨ ¬
                    </Text>
                    <Text span c="blue" inherit>
                      X
                    </Text>
                    ), with{" "}
                    <Text span c="blue" inherit>
                      literals
                    </Text>{" "}
                    and{" "}
                    <Text span c="red" inherit>
                      boolean operators
                    </Text>
                    .
                  </Text>
                </div>
                <p className={classes.infoCardDesc}>
                  SAT is the problem of determining if there exists an
                  assignment to variables in a Boolean formula that makes the
                  entire expression true. The formula was constructed
                  encompassing various constraints, to ascertain whether a
                  viable task allocation exists. In other words, if one can find
                  values for all X, Y, and Z that satisfy all constraints, the
                  problem is said to be satisfiable; if no solution exists, it
                  is unsatisfiable.
                </p>
              </div>

              <div className="section">
                <h3 className={classes.infoCardTitle}>Encoding constraints</h3>
                <div className={classes.infoCardDesc}>
                  <List type="ordered">
                    <List.Item>
                      Each robot starts in its assigned room at the initial time
                      step.
                    </List.Item>
                    <List.Item>
                      Each task-object must be held by a robot at some point
                      within the time horizon.
                    </List.Item>
                    <List.Item>
                      No object is being held by any robot at the final time
                      step.
                    </List.Item>
                    <List.Item>
                      A robot can only be in one room at any given time step.
                    </List.Item>
                    <List.Item>
                      A robot cannot be in two different rooms at the same time.
                    </List.Item>
                    <List.Item>
                      A robot cannot move between rooms faster than the weighted
                      edge between them allows.
                    </List.Item>
                    <List.Item>
                      If a robot is holding an object at the start, it must be
                      in the same room as the object.
                    </List.Item>
                    <List.Item>
                      If a robot is holding an object, it must continue holding
                      it in the next time step or drop it off at its
                      destination.
                    </List.Item>
                    <List.Item>
                      If a robot is holding an object at a given time step, it
                      must have been holding it in the previous time step or
                      picked it up at that step.
                    </List.Item>
                  </List>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCard === "env" && (
          <div ref={targetRef} id="env" className={classes.infoWrapper}>
            <div className={classes.infoCard}>
              <div className="section">
                <h3 className={classes.infoCardTitle}>Environment</h3>
                <p className={classes.infoCardDesc}>
                  The environment is represented as a complete weighted graph,
                  with each node symbolizing a room and each edge indicating a
                  pathway between two rooms. The weight assigned to each edge
                  corresponds to the total number of cells in the shortest path
                  required to traverse between the two chosen rooms.
                </p>
                <div className={classes.imageContainer}>
                  <Image src={env} alt="env" className={classes.envImage} />
                  <span className={classes.imageLabel}>
                    Warehouse grid map with 7 rooms (purple rectangles) and
                    starting locations of tasks and robots (blue squares, orange
                    circles).{" "}
                  </span>
                </div>
              </div>

              <div className="section">
                <h3 className={classes.infoCardTitle}>What's a task?</h3>
                <p className={classes.infoCardDesc}>
                  A task is to move an object from one room to another, and the
                  pick-up/drop-off locations are assigned from a random
                  distribution with robot-task pairing as a binary variable. The
                  room-to-room distances were precalculated then added to the
                  SAT encoding. The SAT solver systematically explored the
                  possible combinations of True/False values for variables until
                  it found a solution that satisfied the Boolean formula or
                  confirmed that no such assignment exists.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedCard === "exp" && (
          <div ref={targetRef} id="exp" className={classes.infoWrapper}>
            <div className={classes.infoCard}>
              <div className="section">
                <h3 className={classes.infoCardTitle}>SAT-solver employed</h3>
                <p className={classes.infoCardDesc}>
                  We utilized CaDiCaL, a state-of-the-art SAT solver known for
                  its high performance. It is part of the PySAT toolkit,
                  allowing it to be integrated with Python-based systems for
                  solving complex task allocation problems. We conducted each
                  experiment 10 times on the high-performance computing system
                  known as the Savio cluster.
                </p>
              </div>

              <div className="section">
                <h3 className={classes.infoCardTitle}>Experiments</h3>
                <p className={classes.infoCardDesc}>
                  Our experimental setup varied the number of robots (from 5 to
                  25, in increments of 5) and task load (from 10 to 90, in
                  increments of 10). Task pick-up/drop-off locations were
                  assigned from a randomly assigned.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
