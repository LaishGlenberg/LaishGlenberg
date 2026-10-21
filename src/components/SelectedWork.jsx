import { SELECTED_WORK } from "../config.js";
import Project from "./Project.jsx";

export default function SelectedWork() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="frame">
        <h2 className="section-title" id="work-title" data-reveal>
          Selected work
        </h2>
        <div className="work__list">
          {SELECTED_WORK.map((project, index) => (
            <Project key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
