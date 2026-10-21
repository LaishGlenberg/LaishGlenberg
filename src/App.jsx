import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}
