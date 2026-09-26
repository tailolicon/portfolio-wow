import { useEffect, useState } from "react";
import { ArrowElbowDownLeft, Check, Code, Database, ShareNetwork, BookmarkSimple } from "@phosphor-icons/react";
import type { AskExample } from "../data";
import { useInView } from "../ui";
import { BarList, LineChart } from "./Charts";

type Phase = "idle" | "typing" | "running" | "done";
const STEPS = ["Matched 2 metrics in your semantic layer", "Wrote SQL", "Ran on Snowflake"];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const KEYWORDS =
  /\b(select|from|join|on|where|and|group|by|order|with|as|using|over|sum|count|distinct|round|date_trunc|max_by|min_by|desc)\b/g;

function SqlBlock({ sql }: { sql: string }) {
  const lines = sql.split("\n");
  return (
    <pre className="vy-sql" aria-label="Generated SQL">
      {lines.map((line, i) => {
        const parts = line.split(/('[^']*')/g);
        return (
          <span key={i} className="vy-sql-line">
            <span className="vy-sql-n">{i + 1}</span>
            {parts.map((part, j) =>
              part.startsWith("'") ? (
                <span key={j} className="vy-sql-str">
                  {part}
                </span>
              ) : (
                part.split(KEYWORDS).map((tok, k) =>
                  k % 2 ? (
                    <span key={`${j}-${k}`} className="vy-sql-kw">
                      {tok}
                    </span>
                  ) : (
                    tok
                  ),
                )
              ),
            )}
            {"\n"}
          </span>
        );
      })}
    </pre>
  );
}

export function AnswerCard({ example, showSqlDefault = false }: { example: AskExample; showSqlDefault?: boolean }) {
  const [showSql, setShowSql] = useState(showSqlDefault);
  const peak = example.id === "teams" ? 5 : undefined;
  return (
    <div className="vy-answer">
      <div className="vy-answer-head">
        <span className="vy-answer-title">Answer</span>
        <span className="vy-answer-meta">
          {example.sources.map((s) => (
            <code key={s}>{s}</code>
          ))}
          <span>{example.runtime}</span>
        </span>
      </div>
      <p className="vy-answer-text">{example.answer}</p>
      {example.chart === "line" ? (
        <LineChart
          data={example.series}
          height={196}
          unit={example.unit}
          markIndex={peak}
          labelEvery={3}
          ariaLabel={`Line chart: ${example.question}`}
        />
      ) : (
        <BarList data={example.series} unit={example.unit} />
      )}
      {showSql && <SqlBlock sql={example.sql} />}
      <div className="vy-answer-actions">
        <button type="button" className={"vy-app-btn" + (showSql ? " is-on" : "")} onClick={() => setShowSql((v) => !v)} aria-pressed={showSql}>
          <Code size={14} /> {showSql ? "Hide SQL" : "View SQL"}
        </button>
        <button type="button" className="vy-app-btn">
          <BookmarkSimple size={14} /> Save to board
        </button>
        <button type="button" className="vy-app-btn">
          <ShareNetwork size={14} /> Share
        </button>
      </div>
    </div>
  );
}

export function AskPanel({
  examples,
  chips = false,
  initial = 0,
}: {
  examples: AskExample[];
  chips?: boolean;
  initial?: number;
}) {
  const [index, setIndex] = useState(initial);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const example = examples[index];

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    if (reducedMotion()) {
      setTyped(example.question.length);
      setStep(STEPS.length);
      setPhase("done");
    } else setPhase("typing");
  }, [inView, phase, example.question.length]);

  useEffect(() => {
    if (phase === "typing") {
      if (typed >= example.question.length) {
        const t = window.setTimeout(() => setPhase("running"), 260);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setTyped((n) => n + 1), 22 + (typed % 7) * 3);
      return () => window.clearTimeout(t);
    }
    if (phase === "running") {
      if (step >= STEPS.length) {
        const t = window.setTimeout(() => setPhase("done"), 180);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setStep((s) => s + 1), 380);
      return () => window.clearTimeout(t);
    }
  }, [phase, typed, step, example.question.length]);

  const choose = (i: number) => {
    setIndex(i);
    setTyped(0);
    setStep(0);
    setPhase(reducedMotion() ? "idle" : "typing");
  };

  const text = example.question.slice(0, typed);

  return (
    <div ref={ref} className="vy-ask">
      <div className="vy-ask-box">
        <div className="vy-ask-input" role="textbox" aria-readonly="true" aria-label="Question">
          <span>{text}</span>
          {phase !== "done" && <span className="vy-caret" aria-hidden="true" />}
          {phase === "idle" && typed === 0 && <span className="vy-ask-placeholder">Ask a question about your data</span>}
        </div>
        <div className="vy-ask-bar">
          <span className="vy-ask-source">
            <Database size={14} /> Snowflake <span className="vy-ask-sep">/</span> PROD_ANALYTICS
          </span>
          <span className={"vy-ask-send" + (phase === "typing" ? "" : " is-sent")} aria-hidden="true">
            <ArrowElbowDownLeft size={14} />
          </span>
        </div>
      </div>

      {chips && (
        <div className="vy-ask-chips" role="group" aria-label="Example questions">
          {examples.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              className={"vy-chip" + (i === index ? " is-on" : "")}
              aria-pressed={i === index}
              onClick={() => choose(i)}
            >
              {ex.question}
            </button>
          ))}
        </div>
      )}

      <div className="vy-ask-result" aria-live="polite">
        {phase === "running" && (
          <ul className="vy-steps" role="list">
            {STEPS.map((s, i) => (
              <li key={s} className={i < step ? "is-done" : i === step ? "is-active" : ""}>
                <span className="vy-step-icon">{i < step ? <Check size={12} /> : null}</span>
                {s}
              </li>
            ))}
          </ul>
        )}
        {phase === "done" && <AnswerCard key={example.id} example={example} />}
        {(phase === "idle" || phase === "typing") && <div className="vy-ask-empty" />}
      </div>
    </div>
  );
}
