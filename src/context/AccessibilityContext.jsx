import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AccessibilityContext = createContext(null);

const HIGH_CONTRAST_KEY = "culturando_high_contrast";
const FONT_SIZE_KEY = "culturando_font_size";

export function AccessibilityProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => {
    try {
      return localStorage.getItem(HIGH_CONTRAST_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [fontSize, setFontSize] = useState(() => {
    try {
      return localStorage.getItem(FONT_SIZE_KEY) || "normal";
    } catch {
      return "normal";
    }
  });

  const [announcement, setAnnouncement] = useState("");

  const announce = useCallback((message) => {
    setAnnouncement(message);
    const timer = setTimeout(() => setAnnouncement(""), 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(HIGH_CONTRAST_KEY, String(next));
      } catch {}
      announce(
        next
          ? "Modo de alto contraste ativado"
          : "Modo de alto contraste desativado",
      );
      return next;
    });
  }, [announce]);

  const changeFontSize = useCallback(
    (size) => {
      setFontSize(size);
      try {
        localStorage.setItem(FONT_SIZE_KEY, size);
      } catch {}
      const labels = {
        normal: "Tamanho de texto normal selecionado",
        large: "Tamanho de texto grande selecionado",
        xlarge: "Tamanho de texto extra grande selecionado",
      };
      announce(labels[size] || "Tamanho de texto alterado");
    },
    [announce],
  );

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.setAttribute("data-high-contrast", "true");
    } else {
      root.removeAttribute("data-high-contrast");
    }

    if (fontSize === "large") {
      root.setAttribute("data-font-size", "large");
    } else if (fontSize === "xlarge") {
      root.setAttribute("data-font-size", "xlarge");
    } else {
      root.removeAttribute("data-font-size");
    }
  }, [highContrast, fontSize]);

  const value = useMemo(
    () => ({
      highContrast,
      toggleHighContrast,
      fontSize,
      changeFontSize,
      announcement,
      announce,
    }),
    [
      highContrast,
      toggleHighContrast,
      fontSize,
      changeFontSize,
      announcement,
      announce,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <div
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility deve ser usado dentro de AccessibilityProvider",
    );
  }
  return context;
}
