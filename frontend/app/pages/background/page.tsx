export default function Background() {
  return (
    <section className="">
      <div
        className="absolute 
      -bottom-50 
      left-1/2 
      -translate-x-1/2 
      w-105 
      h-105 
      bg-(--circle)
      rounded-full
      z-0"
      ></div>
      <div
        className="absolute 
      -top-50 
      left-0 
      -translate-x-1/2 
      w-105 
      h-105 
      bg-(--circle)
      rounded-full
      z-0"
      ></div>
    </section>
  );
}
