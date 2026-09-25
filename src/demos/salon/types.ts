import type { MouseEvent } from "react";
import type { Page } from "./data";

export type BookPrefill = { stylist?: string; service?: string };

export type PageProps = {
  go: (p: Page) => void;
  link: (p: Page) => {
    href: string;
    "aria-current": "page" | undefined;
    onClick: (e: MouseEvent<HTMLElement>) => void;
  };
  book: (prefill?: BookPrefill) => void;
};
