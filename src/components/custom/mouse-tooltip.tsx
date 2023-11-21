interface MouseTooltipProps {
  position: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
}

function MouseTooltip({ position, children }: MouseTooltipProps) {
  const { x, y } = position;

  return (
    <div
      className={`absolute z-[1000] rounded bg-black p-2 text-white`}
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
