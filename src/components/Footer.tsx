// components/Footer.js

const Footer = () => {
  return (
    <footer className="mt-10 flex flex-col items-center justify-center p-4 bg-gray-800 text-white w-full">
      <p>
        &copy; {new Date().getFullYear()} La Patisserie. All rights reserved.
      </p>
      <a
        href="https://github.com/alijalloul"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 mt-2 hover:text-blue-300"
      >
        Visit my GitHub
      </a>
    </footer>
  );
};

export default Footer;
