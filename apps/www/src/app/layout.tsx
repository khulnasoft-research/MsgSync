import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'MsgSync - Enterprise Messaging Platform',
    description: 'Complete SMS, voice, and WhatsApp marketing platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
