const XInCircle = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="5"
        fill="none"
        className="stroke-blue-500"
      />
      <line
        x1="30"
        y1="30"
        x2="70"
        y2="70"
        strokeWidth="5"
        className="stroke-blue-500"
      />
      <line
        x1="70"
        y1="30"
        x2="30"
        y2="70"
        strokeWidth="5"
        className="stroke-blue-500"
      />
    </svg>
  );
};

export default XInCircle;
