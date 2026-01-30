type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div
        className="h-8 w-28 bg-[url('/ipeak-logo.png')] bg-contain bg-left bg-no-repeat"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold tracking-tight text-white">
        iPeak Agency
      </span>
    </div>
  );
}
