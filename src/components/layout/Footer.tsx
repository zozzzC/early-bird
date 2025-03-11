export default function Footer() {
  return (
    <div className="w-full md:h-40 h-20 flex justify-between p-5">
      <div className="flex gap-5">
        <div className="flex flex-col">
          <p>home</p>
          <p>about</p>
          <p>order</p>
          <p>contact</p>
        </div>
        <div className="flex flex-col">
          <p>lorem</p>
          <p>ipsum</p>
          <p>dolor</p>
          <p>sit</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p>all rights reserved</p>
        <p>developed by</p>
      </div>
    </div>
  );
}
