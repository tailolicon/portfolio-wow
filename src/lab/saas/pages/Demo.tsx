import { useState } from "react";
import type { FormEvent } from "react";
import { CalendarCheck, Lock, ShieldCheck, UsersThree } from "@phosphor-icons/react";
import { useDemoForm, demoImg } from "../../../demos/shared";
import { quotes } from "../data";
import { useNav } from "../ui";

const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud|proton|aol)\./i;

type Errors = Partial<Record<"name" | "email" | "company" | "size" | "warehouse", string>>;

function validate(data: FormData): Errors {
  const e: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();
  if (!get("name")) e.name = "Enter your name.";
  const email = get("email");
  if (!email) e.email = "Enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "That email doesn't look complete.";
  else if (FREE_MAIL.test(email)) e.email = "Use your company email so we can set up the right workspace.";
  if (!get("company")) e.company = "Enter your company name.";
  if (!get("size")) e.size = "Choose a team size.";
  if (!get("warehouse")) e.warehouse = "Choose the warehouse you use.";
  return e;
}

function Field({
  id,
  label,
  error,
  helper,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={"vy-field" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="vy-field-error" id={`${id}-msg`}>
          {error}
        </p>
      ) : helper ? (
        <p className="vy-field-help" id={`${id}-msg`}>
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export default function Demo() {
  const { sent, onSubmit, reset } = useDemoForm();
  const { link } = useNav();
  const [errors, setErrors] = useState<Errors>({});
  const [firstName, setFirstName] = useState("");
  const quote = quotes[4];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      event.currentTarget.querySelector<HTMLElement>(`#vy-f-${first}`)?.focus();
      return;
    }
    setFirstName(String(data.get("name")).trim().split(" ")[0]);
    onSubmit(event);
  };

  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": `vy-f-${k}-msg`,
  });

  return (
    <section className="vy-page-hero vy-demo">
      <div className="vy-container vy-demo-grid">
        <div className="vy-demo-copy">
          <h1 className="vy-display vy-page-title">See Veyra answer your own questions.</h1>
          <p className="vy-lead">
            A 30-minute call with a solutions engineer, on a sandbox built from your schema. Bring the question your
            team has been waiting on.
          </p>

          <h2 className="vy-demo-sub">What happens next</h2>
          <ol className="vy-next" role="list">
            <li>
              <CalendarCheck size={18} />
              <span>
                <strong>We reply within one business day</strong>
                with times that work for your team, across US and European hours.
              </span>
            </li>
            <li>
              <UsersThree size={18} />
              <span>
                <strong>A short prep call, if you want one</strong>
                so we can load a sample schema and your real metric names before the demo.
              </span>
            </li>
            <li>
              <ShieldCheck size={18} />
              <span>
                <strong>Security pack on request</strong>
                SOC 2 Type II report, pen test summary and our DPA, under mutual NDA.
              </span>
            </li>
          </ol>

          <figure className="vy-demo-quote">
            <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
            <figcaption className="vy-person">
              <img src={demoImg("people", quote.portrait)} alt="" loading="lazy" />
              <span>
                <strong>{quote.name}</strong>
                {quote.role}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="vy-demo-card">
          {sent ? (
            <div className="vy-sent" role="status">
              <h2 className="vy-h3">Thanks{firstName ? `, ${firstName}` : ""}. Your request is in.</h2>
              <p>
                A solutions engineer will email you within one business day to find a time. In the meantime, you can
                look through how other teams use Veyra.
              </p>
              <div className="vy-sent-actions">
                <a {...link("customers")} className="vy-btn vy-btn--secondary">
                  Read customer stories
                </a>
                <button type="button" className="vy-btn vy-btn--ghost" onClick={reset}>
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            <form className="vy-form" onSubmit={submit} noValidate>
              <div className="vy-form-row">
                <Field id="vy-f-name" label="Full name" error={errors.name}>
                  <input id="vy-f-name" name="name" autoComplete="name" {...aria("name")} />
                </Field>
                <Field id="vy-f-email" label="Work email" error={errors.email}>
                  <input id="vy-f-email" name="email" type="email" autoComplete="email" {...aria("email")} />
                </Field>
              </div>
              <Field id="vy-f-company" label="Company" error={errors.company}>
                <input id="vy-f-company" name="company" autoComplete="organization" {...aria("company")} />
              </Field>
              <div className="vy-form-row">
                <Field id="vy-f-size" label="Team size" error={errors.size}>
                  <select id="vy-f-size" name="size" defaultValue="" {...aria("size")}>
                    <option value="" disabled>
                      Select
                    </option>
                    <option>1 to 50</option>
                    <option>51 to 200</option>
                    <option>201 to 1,000</option>
                    <option>1,001 to 5,000</option>
                    <option>More than 5,000</option>
                  </select>
                </Field>
                <Field id="vy-f-warehouse" label="Warehouse" error={errors.warehouse}>
                  <select id="vy-f-warehouse" name="warehouse" defaultValue="" {...aria("warehouse")}>
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Snowflake</option>
                    <option>BigQuery</option>
                    <option>Databricks</option>
                    <option>Amazon Redshift</option>
                    <option>Postgres</option>
                    <option>Other or not sure</option>
                  </select>
                </Field>
              </div>
              <Field
                id="vy-f-learn"
                label="What would you like to learn?"
                helper="Optional. A question you'd ask Veyra on day one is perfect."
              >
                <textarea id="vy-f-learn" name="learn" rows={4} aria-describedby="vy-f-learn-msg" />
              </Field>
              <button type="submit" className="vy-btn vy-btn--primary vy-btn--lg vy-form-submit">
                Book a demo
              </button>
              <p className="vy-form-legal">
                <Lock size={13} /> We only use your details to arrange the demo. See our privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
