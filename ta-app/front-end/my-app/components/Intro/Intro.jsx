import classes from "./Intro.module.css";
import { MantineButton } from "../Button/MantineButton";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Link from "next/link";

export const Intro = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [passedTitle, setPassedTitle] = useState(false);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    setPassedTitle(window.innerHeight > 990);
    console.log(window.innerHeight);
  }, []);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPassedTitle(true);
        } else {
          setPassedTitle(false);
        }
      },
      { threshold: 0 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [titleRef]);

  useLayoutEffect(() => {
    let timeoutId;

    if (passedTitle) {
      // setShowOverlay(true);
      timeoutId = setTimeout(() => {
        setShowOverlay(false);
      }, 300);
    }

    if (!passedTitle) {
      // setShowOverlay(false);
      timeoutId = setTimeout(() => {
        setShowOverlay(true);
      }, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [passedTitle]);

  console.log("passedTitle: ", passedTitle);

  return (
    <>
      <div className={classes.intro}>
        <div className={classes.info}>
          <span ref={titleRef} className={classes.emptySpan}></span>
          <h1 className={classes.title}>
            <span>Towards efficient and scalable</span>
            <span className={classes.titleTA}> multi-agent systems.</span>
          </h1>

          <h2 className={classes.subtitle}>
            <span className={classes.subtitleTA}>
              A SAT-based approach for task allocation in warehouse settings.
            </span>

            <span className={classes.subtitleTA}>
              An encoding technique and its runtime analysis.
            </span>
          </h2>
        </div>

        <div className={classes.buttons}>
          <Link href="/demo">
            <MantineButton
              variant="intro"
              context="Try Interactive Demo"
              icon={<ArrowRightIcon width="20" height="20" />}
            />
          </Link>
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

        <div
          className={classes.demoWrapper}
          style={{
            overflow: showOverlay ? "hidden" : "visible",
          }}
        >
          {showOverlay && (
            <div
              className={classes.demoOverlay}
              style={{
                opacity: passedTitle ? 0 : 1,
              }}
            ></div>
          )}
          <div
            className={classes.demo}
            style={{
              transform: passedTitle ? "scale(1)" : "scale(1.5)",
              opacity: passedTitle ? 1 : 0,
            }}
          >
            <div
              className={classes.demoImg}
              style={{
                borderRadius: passedTitle ? "20px" : "0px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "calc(65.5199374511337% + 41px)",
                  height: 0,
                }}
              >
                <iframe
                  src="https://demo.arcade.software/oIrg1qoT4Yk0clINQmXF?embed"
                  title="localhost:3000"
                  frameBorder="0"
                  // loading="lazy"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    width: "71.25rem",
                    height: "100%",
                    colorScheme: "light",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
