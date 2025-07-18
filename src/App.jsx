import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import AppRouter from "./routes/AppRouter";
import FloatingPalette from "./components/ui/FloatingPalette";
import { Toaster } from "sonner";

function App() {
    const { theme } = useContext(ThemeContext);

    return (
        <BrowserRouter>
            <Toaster
                theme={theme === "dark" ? "dark" : "light"}
                richColors
                position="top-center"
                toastOptions={{
                    className:
                        "!bg-[hsl(var(--color-primary))]/5 dark:!bg-[hsl(var(--color-primary))]/5  " +
                        "!border !border-[hsl(var(--color-primary))]/60 dark:!border-[hsl(var(--color-primary))]/60 " +
                        "!shadow-lg !backdrop-blur-sm",
                }}
            />

            <AppRouter />
            <FloatingPalette />
        </BrowserRouter>
    );
}

export default App;
