import { SITE } from "../config.js";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="frame">
        <h2 className="section-title" id="about-title" data-reveal>
          About
        </h2>
        <p className="about__body" data-reveal style={{ "--reveal-delay": 80 }}>
          I&rsquo;m a software engineer with a B.S. in computer science, currently
          pursuing a master&rsquo;s at <mark>Arizona State University</mark>. My
          work sits between <mark>fullstack web development</mark> and{" "}
          <mark>AI engineering</mark>: I build the small, sharp tools that make
          agent workflows less painful &mdash;{" "}
          <mark>CLIs, MCP servers and npm packages</mark>. I also make VS Code
          extensions, Figma plugins and the occasional web experiment. I like
          problems where the interface is a command line and the feedback is
          immediate, and I keep shipping until one turns out to be{" "}
          <mark>genuinely useful</mark>.{" "}
          <a
            className="about__more"
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            The best ones are on GitHub <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
