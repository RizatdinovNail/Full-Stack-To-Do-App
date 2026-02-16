"use client";

export default function Footer() {
  const footerLinks = [
    { name: " Terms And Conditions" },
    { name: "Privacy Policy" },
    { name: "Cookies" },
  ];
  return (
    <footer>
      <ul className="flex absolute items-center justify-between">
        {footerLinks.map((l) => (
          <li key={l.name} className="text-[0.8rem]">
            {l.name}
          </li>
        ))}
      </ul>
    </footer>
  );
}
