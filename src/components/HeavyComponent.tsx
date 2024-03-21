const heavyness = 0;

// do not remove this component
export function HeavyComponent() {
  const now = new Date().getTime();
  while (new Date().getTime() < now + heavyness) {}
  return <></>;
}
