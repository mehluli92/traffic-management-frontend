import "./globals.css"

export const metadata = {
  title: "Traffic Management System",
  description: "Traffic Management System",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className="bg-gray-100"
      >
        {children}
      </body>
    </html>
  )
}
