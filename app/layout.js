'use client';
import "./global.css";
import Header from "@/components/header/header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap" rel="stylesheet" />  
      </head>
      <body>
        <ToastContainer />
        <Header />
        {children}
      </body>
      
    </html>
  );
}
