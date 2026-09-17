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

  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopSpeaking = useCallback(() => {
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text) => {
      try {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
          announce(text);
          return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        utterance.rate = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      } catch {
        announce(text);
      }
    },
    [announce],
  );

  const readCurrentPage = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      announce("Seu navegador não possui suporte nativo para leitura de texto em voz alta.");
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      announce("Audiodescrição interrompida.");
      return;
    }

    const mainElement =
      document.querySelector("main") ||
      document.querySelector("#main-content") ||
      document.body;

    if (!mainElement) return;

    const clone = mainElement.cloneNode(true);
    const elementosParaRemover = clone.querySelectorAll(
      "script, style, noscript, .visually-hidden, .sr-only, .skip-link, .accessibility-bar, nav, [aria-hidden='true']"
    );
    elementosParaRemover.forEach((el) => el.remove());

    const imagens = clone.querySelectorAll("img");
    imagens.forEach((img) => {
      const altText = img.getAttribute("alt");
      if (altText && altText.trim()) {
        const textoDescritivo = document.createTextNode(
          ` [Imagem: ${altText.trim()}]. `
        );
        img.parentNode?.insertBefore(textoDescritivo, img);
      }
      img.remove();
    });

    const h1 = document.querySelector("h1");
    const pageTitle = h1?.innerText?.trim() || document.title || "Culturando";
    const corpoTexto = clone.innerText ? clone.innerText.replace(/\s+/g, " ").trim() : "";

    if (!corpoTexto) {
      announce("Nenhum conteúdo de texto encontrado nesta página.");
      return;
    }

    announce("Iniciando audiodescrição da página.");
    speak(`Início da audiodescrição da página. ${pageTitle}. ${corpoTexto}. Fim da audiodescrição.`);
  }, [isSpeaking, speak, stopSpeaking, announce]);

  const [pointAndReadActive, setPointAndReadActive] = useState(false);

  const togglePointAndRead = useCallback(() => {
    setPointAndReadActive((prev) => {
      const next = !prev;
      announce(
        next
          ? "Modo Apontar e Ler ativado. Clique em qualquer texto ou elemento para ouvir."
          : "Modo Apontar e Ler desativado."
      );
      return next;
    });
  }, [announce]);

  const value = useMemo(
    () => ({
      highContrast,
      toggleHighContrast,
      fontSize,
      changeFontSize,
      announcement,
      announce,
      speak,
      isSpeaking,
      stopSpeaking,
      readCurrentPage,
      pointAndReadActive,
      setPointAndReadActive,
      togglePointAndRead,
    }),
    [
      highContrast,
      toggleHighContrast,
      fontSize,
      changeFontSize,
      announcement,
      announce,
      speak,
      isSpeaking,
      stopSpeaking,
      readCurrentPage,
      pointAndReadActive,
      togglePointAndRead,
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

const defaultAccessibilityFallback = {
  highContrast: false,
  toggleHighContrast: () => {},
  fontSize: "normal",
  changeFontSize: () => {},
  announcement: "",
  announce: () => {},
  speak: () => {},
  isSpeaking: false,
  stopSpeaking: () => {},
  readCurrentPage: () => {},
  pointAndReadActive: false,
  setPointAndReadActive: () => {},
  togglePointAndRead: () => {},
};

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  return context || defaultAccessibilityFallback;
}


