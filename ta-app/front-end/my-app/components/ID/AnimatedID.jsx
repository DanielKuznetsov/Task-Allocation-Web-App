import { useSpring, animated } from "@react-spring/web";

const AnimatedID = ({ children, style, path, ...props }) => {
  if (path === undefined) {
    return (
      <div
        style={{
          ...style,
          transformOrigin: "top left",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  const toTransforms = path.map((point) => {
    const translateX = point.x * 22.5; // Use the same value as the grid
    const translateY = point.y * 22.5; // Use the same value as the grid
    return `translateX(${translateX}px) translateY(${translateY}px)`;
  });

  const totalCells = path.length - 1;

  const totalDuration = (totalCells / 6) * 50;

  const springStyle = useSpring({
    from: {
      transform: `translateX(${path[0].x * 22.5}px) translateY(${
        path[0].y * 22.5
      }px)`,
    },
    to: toTransforms,
    config: {
      // duration: 184,
      duration: 175,
    },
  });

  return (
    <animated.div
      style={{
        ...style,
        ...springStyle,
        transformOrigin: "top left",
      }}
      {...props}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedID;
