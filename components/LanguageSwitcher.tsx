"use client";

import { useEffect, useMemo, useState } from "react";

type LanguageCode = "id" | "en";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string,
        ) => unknown;
      };
    };
  }
}

const GOOGLE_SCRIPT_ID = "google-translate-script";
const GOOGLE_ELEMENT_ID = "google_translate_element_hidden";

function getCurrentLanguage(): LanguageCode {
  if (typeof document === "undefined") return "id";
  const googTrans = document.cookie
    .split(";")
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.startsWith("googtrans="));

  if (!googTrans) return "id";
  return googTrans.includes("/en") ? "en" : "id";
}

function setGoogTransCookie(targetLang: LanguageCode) {
  const value = `/id/${targetLang}`;
  document.cookie = `googtrans=${value};path=/`;

  if (window.location.hostname.includes(".")) {
    document.cookie = `googtrans=${value};path=/;domain=.${window.location.hostname}`;
  }
}

export default function LanguageSwitcher() {
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>("id");

  useEffect(() => {
    setActiveLanguage(getCurrentLanguage());

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      const target = document.getElementById(GOOGLE_ELEMENT_ID);
      if (!target || target.childElementCount > 0) return;

      // Rendered in a hidden node so translation engine works without exposing default Google UI.
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          includedLanguages: "id,en",
          autoDisplay: false,
        },
        GOOGLE_ELEMENT_ID,
      );
    };

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }
  }, []);

  const langButtons = useMemo(
    () => [
      { code: "id" as const, label: "ID" },
      { code: "en" as const, label: "EN" },
    ],
    [],
  );

  const changeLanguage = (nextLang: LanguageCode) => {
    if (nextLang === activeLanguage) return;

    setGoogTransCookie(nextLang);
    setActiveLanguage(nextLang);
    document.documentElement.lang = nextLang;

    window.location.reload();
  };

  return (
    <>
      <div
        className="lang-switcher"
        role="group"
        aria-label="Language switcher"
      >
        {langButtons.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            className={activeLanguage === lang.code ? "is-active" : ""}
            aria-pressed={activeLanguage === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div
        id={GOOGLE_ELEMENT_ID}
        className="google-translate-host"
        aria-hidden="true"
      />
    </>
  );
}
