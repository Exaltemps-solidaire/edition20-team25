// Logique de transition entre écrans du chatbot, indépendante du rendu.
export type ScreenId =
  | "accueil"
  | "intro-premiere-demande"
  | "intro-juste-savoir"
  | "etapes"
  | "action"
  | "indisponible";

export type Choice =
  | "premiere-demande"
  | "juste-savoir"
  | "refus"
  | "soutien"
  | "continuer"
  | "retour";

export function getNextScreen(current: ScreenId, choice: Choice): ScreenId {
  if (choice === "retour") return "accueil";
  if (choice === "refus" || choice === "soutien") return "indisponible";

  if (current === "accueil" && choice === "premiere-demande") {
    return "intro-premiere-demande";
  }
  if (current === "accueil" && choice === "juste-savoir") {
    return "intro-juste-savoir";
  }
  if (
    (current === "intro-premiere-demande" || current === "intro-juste-savoir") &&
    choice === "continuer"
  ) {
    return "etapes";
  }
  if (current === "etapes" && choice === "continuer") {
    return "action";
  }

  return current;
}
