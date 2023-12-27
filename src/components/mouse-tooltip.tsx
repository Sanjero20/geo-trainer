export type TooltipCoords = {
  x: number;
  y: number;
};

interface MouseTooltipProps {
  position: TooltipCoords;
  children: React.ReactNode;
}

function MouseTooltip({ position, children }: MouseTooltipProps) {
  const { x, y } = position;

  return (
    <div
      className={`absolute z-[1000] hidden rounded bg-black p-2 text-white sm:block`}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      {children}
    </div>
  );
}

export default MouseTooltip;
