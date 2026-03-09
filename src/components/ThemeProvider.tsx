"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            themes={['system', 'dark', 'bloomberg']}
            enableSystem={true}
            disableTransitionOnChange={false}
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
