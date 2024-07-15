import "./global.css";
import Header from "@/components/header/header";

export const metadata = {
  title: "Doit",
  description: "Doit is a simple ToDo app built with Java and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap" rel="stylesheet" />  
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
