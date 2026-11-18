import { describe, expect, it } from "vitest";
import { getNextScreen } from "./chatbot-flow";

describe("getNextScreen", () => {
  it("dirige vers l'explication « première demande » depuis l'accueil", () => {
    expect(getNextScreen("accueil", "premiere-demande")).toBe(
      "intro-premiere-demande",
    );
  });

  it("dirige vers l'écran « bientôt disponible » quand la patiente choisit « refus »", () => {
    expect(getNextScreen("accueil", "refus")).toBe("indisponible");
  });

  it("enchaîne les étapes de la procédure vers l'action concrète", () => {
    expect(getNextScreen("etapes", "continuer")).toBe("action");
  });
});
