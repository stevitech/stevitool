import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api-url";

export default function ElectronicScreen() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [upcomingEventId, setUpcomingEventId] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const [settingsRes, eventsRes] = await Promise.all([
                    fetch(`${BASE_URL}/api/settings`),
                    fetch(`${BASE_URL}/api/events`),
                ]);

                const settings = await settingsRes.json();
                const events = await eventsRes.json();

                if (settings.marqueeMessage?.trim()) {
                    setMessage(settings.marqueeMessage);
                } else {
                    const today = new Date();
                    const upcoming = events
                        .filter((e) => new Date(e.date) >= today)
                        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

                    if (upcoming) {
                        const dateObj = new Date(upcoming.date);
                        const formattedDate = dateObj.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        });
                        setMessage(`🎉 ${upcoming.title} — ${formattedDate}`);
                        setUpcomingEventId(upcoming._id);
                    } else {
                        setMessage(t("marquee.defaultMessage"));
                    }
                }
            } catch (err) {
                console.error("❌ Failed to load marquee data", err);
                setMessage(t("marquee.defaultMessage"));
            } finally {
                setLoading(false);
            }
        };

        fetchMessage();
    }, []);

    if (loading) return null;

    const handleClick = () => {
        if (upcomingEventId) {
            navigate(`/events/${upcomingEventId}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={upcomingEventId ? "cursor-pointer" : "cursor-default"}
        >
            <div className="relative w-[80%] m-auto max-w-3xl h-16 bg-black rounded-xl shadow-[0_0_30px_#8b5cf6] border-3 border-primary overflow-hidden p-4">
                <div className="absolute whitespace-nowrap animate-marquee text-lime-400 text-xl font-mono">
                    {message}
                </div>
            </div>
        </div>
    );
}
