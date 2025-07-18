import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export default function ImageCarousel({
    images = [],
    autoPlay = false,
    loop = true,
    draggable = true,
    showArrows = true,
    interval = 3000,
    className,
    ...props
}) {
    const [current, setCurrent] = useState(0);
    const length = images.length;
    const intervalRef = useRef(null);

    useEffect(() => {
        if (autoPlay) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % length);
            }, interval);
            return () => clearInterval(intervalRef.current);
        }
    }, [autoPlay, length, interval]);

    const goTo = (index) => {
        if (!loop && (index < 0 || index >= length)) return;
        setCurrent((index + length) % length);
    };

    const handleDrag = (() => {
        let startX = 0;
        let deltaX = 0;

        const onMouseDown = (e) => {
            startX = e.clientX;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e) => {
            deltaX = e.clientX - startX;
        };

        const onMouseUp = () => {
            if (deltaX > 50) goTo(current - 1);
            else if (deltaX < -50) goTo(current + 1);
            deltaX = 0;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        return onMouseDown;
    })();

    return (
        <div className={cn("relative overflow-hidden", className)} {...props}>
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt=""
                        draggable={false}
                        onMouseDown={draggable ? handleDrag : null}
                        className="min-w-full select-none object-cover rounded"
                    />
                ))}
            </div>

            {showArrows && length > 1 && (
                <>
                    <button
                        onClick={() => goTo(current - 1)}
                        className="absolute top-1/2 left-3 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => goTo(current + 1)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}
        </div>
    );
}
