import { useState } from "react";
import type { FormEvent } from "react";
import { Check } from "@phosphor-icons/react";
import { useDemoForm } from "../../../demos/shared";
import { Logo, useNav } from "../ui";

export default function Start() {
  const { sent, onSubmit } = useDemoForm();
  const { link } = useNav();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid work email.");
      return;
    }
    setError("");
    setEmail(value);
    onSubmit(event);
  };

  return (
    <section className="vy-page-hero vy-start">
      <div className="vy-container vy-start-grid">
        <div className="vy-start-card">
          <Logo />
          {sent ? (
            <div role="status" className="vy-start-sent">
              <h1 className="vy-h3">Check your inbox</h1>
              <p>
                We sent a sign-in link to <strong>{email}</strong>. It expires in 30 minutes. Once you are in,
                connecting a warehouse takes about ten minutes.
              </p>
            </div>
          ) : (
            <>
              <h1 className="vy-h3">Create your workspace</h1>
              <p className="vy-start-lead">Free for one editor and five viewers. No card needed.</p>
              <form className="vy-form" onSubmit={submit} noValidate>
                <div className={"vy-field" + (error ? " has-error" : "")}>
                  <label htmlFor="vy-s-email">Work email</label>
                  <input
                    id="vy-s-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={error ? true : undefined}
                    aria-describedby="vy-s-email-msg"
                  />
                  <p className={error ? "vy-field-error" : "vy-field-help"} id="vy-s-email-msg">
                    {error || "We'll send a sign-in link. Your teammates can join from the same domain."}
                  </p>
                </div>
                <button type="submit" className="vy-btn vy-btn--primary vy-btn--lg vy-form-submit">
                  Continue
                </button>
              </form>
              <p className="vy-start-alt">
                Need SSO, a security review or more than 50 editors? <a {...link("demo")}>Book a demo</a>.
              </p>
            </>
          )}
        </div>
        <div className="vy-start-aside">
          <h2 className="vy-demo-sub">Your first hour</h2>
          <ul className="vy-ticks" role="list">
            <li>
              <Check size={14} />
              Connect Snowflake, BigQuery, Databricks, Redshift or Postgres with a read-only role
            </li>
            <li>
              <Check size={14} />
              Import metrics from dbt, or let Veyra suggest them from your models
            </li>
            <li>
              <Check size={14} />
              Ask your first questions and check every generated query
            </li>
            <li>
              <Check size={14} />
              Set up three monitors that post to email or chat
            </li>
          </ul>
          <p className="vy-start-fine">
            By continuing you agree to the Veyra terms of service and acknowledge our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}
