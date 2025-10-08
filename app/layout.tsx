/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 */

import Header from "../components/Header";

export const metadata = {
  title: "CV Builder",
  description: "Technical Test by Fajar Postman"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        <Header />
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
