export const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, value, fill }) => {
  const RADIAN = Math.PI / 180;
  const startRadius = outerRadius + 6;
  const bendRadius = outerRadius + 40;
  const textOffset = 60;

  const sx = cx + startRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + startRadius * Math.sin(-midAngle * RADIAN);

  const mx = cx + bendRadius * Math.cos(-midAngle * RADIAN);
  const my = cy + bendRadius * Math.sin(-midAngle * RADIAN);

  const ex = mx + (mx > cx ? textOffset : -textOffset);
  const ey = my;

  const textAnchor = ex > cx ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
        stroke={fill}
        fill="none"
        strokeWidth={1.5}
      />
      <text
        x={ex + (ex > cx ? 4 : -4)}
        y={ey - 6}
        textAnchor={textAnchor}
        fill="#334155"
        fontSize={16}
        fontWeight={400}
      >
        {name}
      </text>
      <text
        x={ex + (ex > cx ? 4 : -4)}
        y={ey + 14}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={16}
        fontWeight={700}
      >
        {value}
      </text>
    </g>
  );
};