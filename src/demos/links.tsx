import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

/* Shared behavior for the secondary links every business site has: social profiles and legal pages. */

export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "youtube" | "vimeo" | "x" | "tiktok";

const SOCIAL_URLS: Record<SocialPlatform, string> = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/",
  youtube: "https://www.youtube.com/",
  vimeo: "https://vimeo.com/",
  x: "https://x.com/",
  tiktok: "https://www.tiktok.com/",
};

/** Spread onto an <a>: opens the platform in a new tab (the brands are fictional, so there is no profile). */
export const socialLink = (platform: SocialPlatform) => ({
  href: SOCIAL_URLS[platform],
  target: "_blank",
  rel: "noopener noreferrer",
});

export type LegalKind = "privacy" | "terms" | "accessibility" | "cookies" | "modern-slavery";

const LEGAL_TITLES: Record<LegalKind, string> = {
  privacy: "Privacy policy",
  terms: "Terms of use",
  accessibility: "Accessibility",
  cookies: "Cookie policy",
  "modern-slavery": "Modern slavery statement",
};

function legalBody(kind: LegalKind, brand: string, email: string): ReactNode {
  switch (kind) {
    case "privacy":
      return (
        <>
          <p>{brand} collects only what you send us through this site (your name, contact details and message) and uses it to reply, confirm bookings and keep records the law requires.</p>
          <p>We never sell your information. Service providers that help us run the business, such as our booking and email tools, process it on our behalf under contract.</p>
          <p>You can ask to see, correct or delete your information at any time by writing to {email}.</p>
        </>
      );
    case "terms":
      return (
        <>
          <p>This site is run by {brand}. Prices, availability and opening hours are shown in good faith and may change without notice.</p>
          <p>Bookings and orders are confirmed only when you receive a confirmation from us. Text and photographs on this site may not be reused without permission.</p>
          <p>Questions about these terms can be sent to {email}.</p>
        </>
      );
    case "accessibility":
      return (
        <>
          <p>{brand} wants everyone to be able to use this site. It is built to work with keyboards, screen readers and zoom, and we test it against WCAG 2.2 AA.</p>
          <p>If something is hard to use, tell us at {email} and we will help you directly and fix the page.</p>
        </>
      );
    case "cookies":
      return (
        <>
          <p>This site uses only the cookies it needs to work, such as remembering the page you were on. We do not use advertising cookies.</p>
          <p>You can clear cookies in your browser settings at any time. Questions go to {email}.</p>
        </>
      );
    case "modern-slavery":
      return (
        <>
          <p>{brand} does not tolerate forced labour or human trafficking in its business or supply chain.</p>
          <p>We ask suppliers and contractors to confirm fair labour practices and we review our main suppliers every year. Concerns can be raised in confidence at {email}.</p>
        </>
      );
  }
}

/**
 * Legal links open a short policy in a native <dialog> (top layer, so it shows correctly inside the
 * preview frame and the fullscreen viewer). Usage:
 *   const legal = useLegalDialog("Nonna Rosa Trattoria", "hello@nonnarosaatx.com");
 *   <a {...legal.link("privacy")}>Privacy</a>   ...   {legal.dialog}   (render once, inside the site root)
 */
export function useLegalDialog(brand: string, email: string) {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<LegalKind>("privacy");

  const link = (target: LegalKind) => ({
    href: `#${target}`,
    onClick: (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setKind(target);
      ref.current?.showModal();
    },
  });

  const dialog = (
    <dialog
      ref={ref}
      className="demo-legal"
      aria-labelledby="demo-legal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="demo-legal-body">
        <h2 id="demo-legal-title">{LEGAL_TITLES[kind]}</h2>
        {legalBody(kind, brand, email)}
        <p className="demo-legal-updated">Last updated March 2026</p>
        <button type="button" onClick={() => ref.current?.close()}>
          Close
        </button>
      </div>
    </dialog>
  );

  return { link, dialog };
}
