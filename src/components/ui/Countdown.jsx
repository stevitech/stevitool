import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
    const now = new Date();
    const diff = new Date(targetDate) - now;

    if (diff <= 0) return null;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    return { days, hours, minutes, seconds };
}

export default function Countdown({ date, className = "" }) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(date));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(date));
        }, 1000);
        return () => clearInterval(interval);
    }, [date]);

    if (!timeLeft) return null;

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div>
            <p className="shadow font-medium text-white bg-[hsl(var(--color-primary))] p-1 rounded w-24 hover:bg-[hsl(var(--color-primary))]/80">
                Starts in
            </p>
            <div
                className={`text-sm font-medium text-[hsl(var(--color-primary))] ${className}`}
            >
                {days}d {hours}h {minutes}m {seconds}s
            </div>
        </div>
    );
}
