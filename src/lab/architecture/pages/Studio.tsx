import { ThreeCanvas, lazyThree } from "../../shared";
import { img } from "../data";
import { AWARDS, FOUNDERS, PRESS, PRINCIPLES, ROLES, TEAM } from "../content";
import { Reveal } from "../ui";

const Topology = lazyThree(() =>
  import("@designcodeio/threeui/components/TopoField").then((m) => m.TopoField),
);

/** Still contour drawing, shown before WebGL loads and to reduced-motion visitors. */
function Contours() {
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg className="oh-contours" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {rings.map((i) => {
        const rx = 30 + i * 22;
        const ry = 22 + i * 19;
        const k = i * 3;
        return (
          <path
            key={i}
            d={`M ${210 - rx} ${260}
                C ${210 - rx} ${260 - ry * 0.9 - k}, ${190 - rx * 0.3} ${260 - ry - k}, ${215} ${260 - ry}
                C ${230 + rx * 0.6} ${260 - ry + k}, ${210 + rx} ${250 - ry * 0.5}, ${210 + rx} ${265}
                C ${210 + rx} ${270 + ry * 0.8}, ${230 + rx * 0.2} ${262 + ry + k}, ${200} ${265 + ry}
                C ${170 - rx * 0.5} ${268 + ry - k}, ${210 - rx} ${275 + ry * 0.5}, ${210 - rx} ${260} Z`}
          />
        );
      })}
    </svg>
  );
}

export default function Studio() {
  return (
    <div className="oh-studio">
      <header className="oh-wrap oh-page-head oh-page-head--split">
        <h1 className="oh-display">Studio</h1>
        <p className="oh-lead">
          Oyelaran Hart is a practice of 41 architects, interior designers and technologists in London and Lisbon. We
          were founded in 2008 by Tomi Oyelaran and Eleanor Hart, who still lead every project.
        </p>
      </header>

      <Reveal className="oh-wrap oh-studio-image">
        <span className="oh-media oh-media--pano">
          <img src={img("architect-drawing")} alt="Marking up a stage 4 drawing in the London studio" />
        </span>
      </Reveal>

      <section className="oh-section oh-wrap oh-approach">
        <div className="oh-approach-side">
          <h2 className="oh-title">Approach</h2>
          <div className="oh-topo">
            <ThreeCanvas fallback={<Contours />}>
              <Topology mode="light" speed={0.35} density={1.1} saturation={0} brightness={0.99} opacity={0.6} />
            </ThreeCanvas>
          </div>
        </div>
        <ul className="oh-principles">
          {PRINCIPLES.map((principle) => (
            <li key={principle.title}>
              <h3 className="oh-heading">{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="oh-section oh-wrap">
        <h2 className="oh-title oh-mb">Founders</h2>
        <div className="oh-founders">
          {FOUNDERS.map((founder) => (
            <Reveal key={founder.name} className="oh-founder">
              <span className="oh-media oh-media--port oh-portrait">
                <img src={founder.photo} alt={`Portrait of ${founder.name}`} loading="lazy" />
              </span>
              <div>
                <h3 className="oh-heading">{founder.name}</h3>
                <p className="oh-data oh-role">{founder.role}</p>
                <p>{founder.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="oh-section oh-wrap oh-team">
        <div className="oh-section-head">
          <h2 className="oh-title">Directors and associates</h2>
          <p className="oh-small oh-mute">Plus 31 architects, designers and studio staff across both offices.</p>
        </div>
        <ul className="oh-team-grid">
          {TEAM.map((member) => (
            <li key={member.name}>
              <span className="oh-media oh-media--square oh-portrait">
                <img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" />
              </span>
              <span className="oh-team-name">{member.name}</span>
              <span className="oh-data oh-role">{member.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="oh-section oh-wrap oh-recognition">
        <div>
          <h2 className="oh-title oh-mb">Awards</h2>
          <table className="oh-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Award</th>
                <th scope="col">Project</th>
              </tr>
            </thead>
            <tbody>
              {AWARDS.map((row) => (
                <tr key={row.award + row.year}>
                  <td className="oh-num">{row.year}</td>
                  <td>{row.award}</td>
                  <td>{row.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="oh-title oh-mb">Press</h2>
          <ul className="oh-press">
            {PRESS.map((item) => (
              <li key={item.title}>
                <span className="oh-data oh-mute">
                  {item.outlet}, {item.date}
                </span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <p className="oh-small oh-mute oh-press-note">
            For images and interviews, contact Nell Ashworth at{" "}
            <a className="oh-inline" href="mailto:press@oyelaranhart.com">
              press@oyelaranhart.com
            </a>
            .
          </p>
        </div>
      </section>

      <section className="oh-section oh-wrap oh-careers" id="careers">
        <div className="oh-careers-intro">
          <h2 className="oh-title">Careers</h2>
          <p>
            We hire a few people each year and try to keep them for a long time: the average tenure in the studio is
            seven years. Everyone works a four-and-a-half-day week, and we close for two weeks at New Year.
          </p>
          <p className="oh-small oh-mute">
            Send a CV and a portfolio of no more than 12 pages as one PDF under 10 MB. We reply to every application.
          </p>
        </div>
        <ul className="oh-roles">
          {ROLES.map((role) => (
            <li key={role.title}>
              <div>
                <h3 className="oh-heading">{role.title}</h3>
                <p className="oh-small">{role.note}</p>
              </div>
              <span className="oh-data">
                {role.studio}, {role.type}
              </span>
              <a
                className="oh-inline"
                href={`mailto:jobs@oyelaranhart.com?subject=${encodeURIComponent(role.title)}`}
                aria-label={`Apply for ${role.title}`}
              >
                Apply
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
