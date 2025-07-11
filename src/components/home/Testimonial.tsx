export default function Testimonial({ children }: { children: string }) {
  return (
    <div className="p-5 rounded-base w-1/3 max-w-2xl bg-orange-main">
      <p className="text-white-main font-semibold">{children}</p>
    </div>
  );
}
