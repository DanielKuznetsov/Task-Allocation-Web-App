import classes from "./Motivation.module.css";
import {
  TimerIcon,
  ExclamationTriangleIcon,
  RocketIcon,
  CodeIcon,
  CountdownTimerIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";

export const Motivation = () => {
  return (
    <div className={classes.container}>
      <div className={classes.motivationWrapper}>
        <div className={classes.headingWrapper}>
          <h2 className={classes.heading}>Motivation, Goals,</h2>
          <h2 className={classes.heading}> Contributions</h2>
        </div>

        <p className={classes.context}>
          Robotic teams in warehouses, expected to grow by 17% by 2030, are
          central to task allocation across sectors like delivery drones,
          autonomous vehicles, and warehouse robotics.
        </p>
      </div>

      <div className={classes.cards}>
        <div className={classes.card}>
          <CountdownTimerIcon width="24px" height="24px" color="#3b82f6" />
          <h3 className={classes.cardHeading}>Quick Task Allocation</h3>
          <p className={classes.cardText}>
            Allocating tasks quickly while taking into account spatial and time
            constraints.
          </p>
        </div>

        <div className={classes.card}>
          <ExclamationTriangleIcon width="24px" height="24px" color="#f97316" />
          <h3 className={classes.cardHeading}>Feasibility Analysis</h3>
          <p className={classes.cardText}>
            Determining the existence of a feasible solution within the given
            parameters.
          </p>
        </div>

        <div className={classes.card}>
          <RocketIcon width="24px" height="24px" color="#ec4899" />
          <h3 className={classes.cardHeading}>Task Allocation Execution</h3>
          <p className={classes.cardText}>
            Performing Task Allocation (TA) within established constraints.
          </p>
        </div>

        <div className={classes.card}>
          <CodeIcon width="24px" height="24px" color="#ef4444" />
          <h3 className={classes.cardHeading}>Encoding Technique</h3>
          <p className={classes.cardText}>
            Developed a novel encoding method for multi-robot task allocation,
            enhancing efficiency.
          </p>
        </div>

        <div className={classes.card}>
          <TimerIcon width="24px" height="24px" color="#a855f7" />
          <h3 className={classes.cardHeading}>Performance Evaluation</h3>
          <p className={classes.cardText}>
            Conducted a comprehensive runtime analysis to evaluate the
            effectiveness of the encoding technique.
          </p>
        </div>

        <div className={classes.card}>
          <GlobeIcon width="24px" height="24px" color="#eab308" />
          <h3 className={classes.cardHeading}>Practical Scenario Testing</h3>
          <p className={classes.cardText}>
            Applied the technique in a simulated environment with 25 agents to
            test in a real-world-like environment.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
