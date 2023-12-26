import classes from "./Intro.module.css";
import typography from "../../design-system/typography.module.css";

export const Intro = () => {
  return (
    <div className={classes.intro}>
      <div className={classes.info}>
        <h1 className={classes.title}>
          Towards efficient and scalable
          <span className={classes.titleTA}> task allocation.</span>
        </h1>

        <h2 className={classes.subtitle}>
          <span className={classes.subtitleTA}>
            A SAT-based approach to task distribution in multi-agent systems.
          </span>

          <span className={classes.subtitleTA}>
            An encoding technique and its runtime analysis.
          </span>
        </h2>
      </div>

      <div className={classes.contributors}>
        <h6 className={classes.contributorsTitle}>Contributed by</h6>
        <div className={classes.contributorsList}>
          {/* Convert to <Link /> component later */}
          <h5 className={classes.contributor}>Danil Kuznetsov</h5>
          <h5 className={classes.contributor}>Victoria Marie Tuck</h5>
          <h5 className={classes.contributor}>Pei-Wei Chen</h5>
          <h5 className={classes.contributor}>Sanjit A. Seshia</h5>
          <h5 className={classes.contributor}>S. Shankar Sastry</h5>
        </div>
      </div>
    </div>
  );
};
