export default function SectionWrapper({ className = "", children }) {
    return (
        <section
            className={`pt-4 md:pt-10 space-y-10 max-w-[90%] mx-auto text-[hsl(var(--color-text))] ${className}`}
        >
            {children}
        </section>
    );
}
