const Countdown = ({ countdown, compact = false }) => {
    const date = countdown ? new Date(countdown) : null;
    const formatted = date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "N/A";
    const badgeSizeClass = compact
        ? "px-2 py-1.5 text-[10px] sm:text-[12px]"
        : "px-2.5 py-1.5 text-[11px] sm:px-3 sm:text-xs";

    return (
        <div className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[#e6e2be] bg-[#fff9f0] font-bold leading-none text-primary shadow-sm mb-3 ${badgeSizeClass}`}>
            Expired {formatted}
        </div>
    );
};

export default Countdown;
