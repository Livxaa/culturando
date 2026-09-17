import { useAccessibility } from "../../context/AccessibilityContext.jsx";

export default function AccessibilityBar() {
  const { highContrast, toggleHighContrast, fontSize, changeFontSize } =
    useAccessibility();

  return (
    <aside
      className="accessibility-bar"
      aria-label="Ferramentas de acessibilidade"
    >
      <div className="accessibility-bar__inner">
        <span className="accessibility-bar__title">Acessibilidade:</span>
        <div
          className="accessibility-bar__group"
          role="group"
          aria-label="Controle de contraste"
        >
          <button
            type="button"
            className={`accessibility-bar__button ${highContrast ? "accessibility-bar__button--active" : ""}`}
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            title="Alternar contraste da tela para alta visibilidade (Atalho)"
          >
            <span aria-hidden="true">🌗</span> Alto Contraste
          </button>
        </div>

        <div
          className="accessibility-bar__group"
          role="group"
          aria-label="Controle de tamanho de fonte"
        >
          <span className="accessibility-bar__label">Texto:</span>
          <button
            type="button"
            className={`accessibility-bar__button ${fontSize === "normal" ? "accessibility-bar__button--active" : ""}`}
            onClick={() => changeFontSize("normal")}
            aria-pressed={fontSize === "normal"}
            title="Tamanho normal de texto"
          >
            A
          </button>
          <button
            type="button"
            className={`accessibility-bar__button ${fontSize === "large" ? "accessibility-bar__button--active" : ""}`}
            onClick={() => changeFontSize("large")}
            aria-pressed={fontSize === "large"}
            title="Aumentar tamanho do texto (+25%)"
          >
            A+
          </button>
          <button
            type="button"
            className={`accessibility-bar__button ${fontSize === "xlarge" ? "accessibility-bar__button--active" : ""}`}
            onClick={() => changeFontSize("xlarge")}
            aria-pressed={fontSize === "xlarge"}
            title="Tamanho extragrande do texto (+50%)"
          >
            A++
          </button>
        </div>
      </div>
    </aside>
  );
}
