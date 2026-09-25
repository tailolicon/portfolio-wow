import { useState } from "react";
import { ArrowRight, Clock, DeviceMobile } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { CLASSES, COACH_NAMES, DAYS, SCHEDULE, classById } from "../data";
import type { ClassId, Day, PageProps, Slot } from "../data";
import { CtaBand, PageHero, SectionHead, W, levelClass } from "../components";

const todayIndex = () => (new Date().getDay() + 6) % 7;

function Spots({ slot }: { slot: Slot }) {
  if (slot.cls === "open") return <span className="fx-spots fx-spots--open">No booking needed</span>;
  const left = slot.cap - slot.booked;
  if (left <= 0) return <span className="fx-spots fx-spots--full">Full</span>;
  if (left <= 3) return <span className="fx-spots fx-spots--low">{left} {left === 1 ? "spot" : "spots"} left</span>;
  return <span className="fx-spots">{left} spots left</span>;
}

export default function Classes({ go }: PageProps) {
  const [day, setDay] = useState<Day>(DAYS[todayIndex()]);
  const [filter, setFilter] = useState<ClassId | "all">("all");

  const toSchedule = () => document.getElementById("fx-schedule")?.scrollIntoView({ behavior: "smooth" });
  const rows = SCHEDULE[day].filter((sl) => filter === "all" || sl.cls === filter);

  return (
    <>
      <PageHero
        title="Classes and weekly schedule"
        text="52 coached classes a week, from 5:30am before work to 7:15pm after it. Every class is scaled to your level."
        img="dark-deadlift"
        alt="Lifter resting beside a loaded barbell in a dark gym"
      >
        <div className="fx-hero-actions">
          <button type="button" className="fx-btn fx-btn--primary" onClick={toSchedule}>
            View schedule
          </button>
          <button type="button" className="fx-btn fx-btn--ghost" onClick={() => go("trial")}>
            Start your free week
          </button>
        </div>
      </PageHero>

      <section className="fx-section fx-light">
        <div className="fx-wrap">
          <SectionHead
            title="Six ways to train"
            text="New members start with a free intro session and usually Foundations. From there your coach will point you to the right mix."
          />
          <div className="fx-class-list">
            {CLASSES.map((c) => (
              <article key={c.id} className="fx-class-row">
                <img src={demoImg("fitness", c.img)} alt={c.alt} loading="lazy" />
                <div className="fx-class-row-body">
                  <div className="fx-class-meta">
                    <span className={levelClass(c.level)}>
                      {c.level}
                    </span>
                    <span>
                      <Clock size={15} weight={W} aria-hidden="true" /> {c.duration}
                    </span>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.details}</p>
                  <p className="fx-goodfor">
                    <strong>Good for:</strong> {c.goodFor}
                  </p>
                  {c.id !== "open" && (
                    <button type="button" className="fx-textlink" onClick={() => {
                        setFilter(c.id);
                        toSchedule();
                      }}>
                      See {c.name} times <ArrowRight size={16} weight={W} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-section fx-paper" id="fx-schedule">
        <div className="fx-wrap">
          <div className="fx-head-row">
            <SectionHead
              kicker="Weekly schedule"
              title="This week at Forge"
              text="Members book in the Forge app up to 7 days ahead. On a free week? Any class is open to you."
            />
            <p className="fx-app-note">
              <DeviceMobile size={20} weight={W} aria-hidden="true" /> Members: book and cancel in the Forge app
            </p>
          </div>

          <div className="fx-sched">
            <div className="fx-daytabs" role="tablist" aria-label="Day of the week">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={day === d}
                  className={`fx-daytab${day === d ? " is-active" : ""}`}
                  onClick={() => setDay(d)}
                >
                  {d}
                  <small>{SCHEDULE[d].length - 1} classes</small>
                </button>
              ))}
            </div>

            <div className="fx-filters" aria-label="Filter by class type">
              <button
                type="button"
                className={`fx-chip${filter === "all" ? " is-active" : ""}`}
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                All classes
              </button>
              {CLASSES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`fx-chip${filter === c.id ? " is-active" : ""}`}
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="fx-sched-table" role="table" aria-label={`${day} class schedule`}>
              <div className="fx-sched-row fx-sched-row--head" role="row">
                <span role="columnheader">Time</span>
                <span role="columnheader">Class</span>
                <span role="columnheader">Coach</span>
                <span role="columnheader">Availability</span>
                <span role="columnheader">
                  <span className="fx-sr">Book</span>
                </span>
              </div>
              {rows.length === 0 && (
                <p className="fx-sched-empty">
                  No {filter !== "all" ? classById(filter as ClassId).name : ""} classes on {day}. Try another day.
                </p>
              )}
              {rows.map((sl) => {
                const c = classById(sl.cls);
                const full = sl.cls !== "open" && sl.cap - sl.booked <= 0;
                return (
                  <div key={`${sl.time}-${sl.cls}`} className="fx-sched-row" role="row">
                    <span role="cell" className="fx-sched-time">
                      {sl.time}
                    </span>
                    <span role="cell" className="fx-sched-class">
                      <span>
                        <strong>{c.name}</strong>
                        <small>
                          {c.level}, {c.duration}
                        </small>
                      </span>
                    </span>
                    <span role="cell" className="fx-sched-coach">
                      {COACH_NAMES[sl.coach]}
                    </span>
                    <span role="cell">
                      <Spots slot={sl} />
                    </span>
                    <span role="cell" className="fx-sched-book">
                      {sl.cls === "open" ? (
                        <span className="fx-sched-na">Members</span>
                      ) : (
                        <button
                          type="button"
                          className={`fx-btn fx-btn--sm ${full ? "fx-btn--outline" : "fx-btn--dark"}`}
                          onClick={() => go("trial")}
                        >
                          {full ? "Waitlist" : "Book"}
                        </button>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="fx-sched-foot">
              Schedule shown for the current week and may change on holidays. Cancel at least 2 hours before class to
              keep your credit. Late arrivals over 10 minutes may be asked to join the next class for safety.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        go={go}
        title="Not sure which class to pick?"
        text="Start with a free intro session. A coach will learn your goals and plan your first week with you."
      />
    </>
  );
}
