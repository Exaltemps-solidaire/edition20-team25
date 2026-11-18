"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { getNextScreen, type Choice, type ScreenId } from "./chatbot-flow";

const PROCEDURE_STEPS = [
  {
    badge: "Vous êtes ici",
    here: true,
    titre: "Demande d'admission en ALD hors liste pour endométriose",
    sous: "Réalisée par votre médecin traitant auprès de la CPAM de votre département",
    refus: "En cas de refus du médecin-conseil de la CPAM →",
  },
  {
    badge: "Étape 1",
    titre:
      "Recours devant la Commission médicale de recours amiable (CMRA) de votre région",
    refus: "En cas de nouveau refus ou d'absence de réponse de la CMRA →",
  },
  {
    badge: "Étape 2",
    titre:
      "Contestation de la décision de la CMRA auprès du pôle social du Tribunal judiciaire",
    refus: "En cas de décision défavorable →",
  },
  {
    badge: "Étape 3",
    titre: "Appel devant la chambre sociale de la Cour d'appel",
    refus: "En cas de décision défavorable →",
  },
  {
    badge: "Étape 4",
    titre: "Pourvoi devant la Cour de cassation",
  },
];

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("accueil");

  function go(choice: Choice) {
    setScreen((current) => getNextScreen(current, choice));
  }

  return (
    <div className={styles.page}>
      <section className={styles.screen}>
        <header className={styles.chatHeader}>
          <div className={styles.logoPlaceholder}>
            <span>
              ENDO
              <br />
              mind
            </span>
          </div>
          <div className={styles.chatHeaderText}>
            <h1>ENDOmind · Chatbot</h1>
            <p>
              <span className={styles.statusDot} />
              Je suis là pour vous guider
            </p>
          </div>
        </header>

        {screen === "accueil" && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.welcomeBlock}>
                <div className={styles.avatar}>
                  <span>E</span>
                </div>
                <h2>Bonjour 🌸</h2>
                <p>
                  Je suis l&rsquo;assistant d&rsquo;<strong>ENDOmind</strong>.
                  <br />
                  Je suis là pour vous aider à comprendre la démarche{" "}
                  <strong>ALD 31</strong> (prise en charge à 100 % pour
                  l&rsquo;endométriose) et ce que vous pouvez faire si votre
                  demande a été refusée.
                  <br />
                  <br />
                  Je ne suis pas médecin. Je vous oriente vers les
                  informations fiables d&rsquo;ENDOmind, à votre rythme.
                </p>
              </div>

              <div className={styles.bubbleBot}>
                Avant de commencer,{" "}
                <strong>
                  où en êtes-vous avec votre demande d&rsquo;ALD 31 ?
                </strong>
              </div>
            </div>

            <div className={styles.quickChoices}>
              <button
                type="button"
                className={styles.choiceBtn}
                onClick={() => go("premiere-demande")}
              >
                Je n&rsquo;ai pas encore fait de demande — je veux comprendre
                comment ça marche
              </button>
              <button
                type="button"
                className={styles.choiceBtn}
                onClick={() => go("refus")}
              >
                J&rsquo;ai reçu un refus et je veux le contester
              </button>
              <button
                type="button"
                className={styles.choiceBtn}
                onClick={() => go("juste-savoir")}
              >
                Je veux juste savoir ce qu&rsquo;est l&rsquo;ALD 31
              </button>
            </div>
          </>
        )}

        {screen === "intro-premiere-demande" && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.bubbleUser}>
                Je n&rsquo;ai pas encore fait de demande — je veux comprendre
                comment ça marche
              </div>
              <div className={styles.bubbleBot}>
                Merci de me le dire. C&rsquo;est une démarche{" "}
                <strong>tout à fait légitime</strong>, et vous avez le droit
                de la faire.
                <br />
                <br />
                <strong>L&rsquo;ALD 31</strong>, c&rsquo;est quoi ? C&rsquo;est
                une « Affection de longue durée hors liste » : une
                reconnaissance officielle qui permet d&rsquo;être remboursée à
                100 % pour les soins liés à l&rsquo;endométriose. Elle est
                souvent refusée une première fois — c&rsquo;est fréquent, et
                ça ne veut pas dire que c&rsquo;est perdu.
              </div>
              <div className={styles.bubbleBot}>
                La procédure comporte <strong>plusieurs étapes</strong>. Je
                vais vous les présenter une par une, sans vous brusquer. Vous
                êtes libre de choisir d&rsquo;aller au bout ou de vous arrêter
                à n&rsquo;importe quel moment.
              </div>
            </div>

            <div className={styles.bottomActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => go("continuer")}
              >
                Voir la première étape →
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => go("retour")}
              >
                ← Revenir au début
              </button>
            </div>
          </>
        )}

        {screen === "intro-juste-savoir" && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.bubbleUser}>
                Je veux juste savoir ce qu&rsquo;est l&rsquo;ALD 31
              </div>
              <div className={styles.bubbleBot}>
                Bien sûr. Voici l&rsquo;essentiel :
                <br />
                <br />
                <strong>ALD 31</strong> signifie « Affection de longue durée
                hors liste ». Le « hors liste » veut dire que
                l&rsquo;endométriose n&rsquo;est pas automatiquement reconnue
                : votre médecin doit en faire la demande et la justifier
                auprès de la CPAM (votre caisse d&rsquo;assurance maladie).
                <br />
                <br />
                Si elle est accordée, tous vos soins{" "}
                <strong>liés à l&rsquo;endométriose</strong> sont remboursés à
                100 % par l&rsquo;Assurance maladie.
              </div>
              <div className={styles.bubbleBot}>
                <strong>Qui fait la demande ?</strong> Votre médecin traitant,
                auprès de la CPAM de votre département. Vous n&rsquo;avez pas
                à la faire vous-même, mais vous pouvez en parler à votre
                médecin et lui demander de l&rsquo;initier.
              </div>
            </div>

            <div className={styles.bottomActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => go("continuer")}
              >
                Voir comment se déroule la demande →
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => go("retour")}
              >
                ← Revenir au début
              </button>
            </div>
          </>
        )}

        {screen === "etapes" && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.bubbleBot}>
                Voici les grandes étapes de la procédure.{" "}
                <strong>Chaque refus ouvre une nouvelle voie de recours.</strong>{" "}
                C&rsquo;est long — mais chaque étape se franchit une à la
                fois.
              </div>
            </div>

            <div className={styles.procedureWrap}>
              <p className={styles.procedureTitle}>
                Les différentes étapes de la procédure
              </p>
              {PROCEDURE_STEPS.map((step, index) => (
                <div className={styles.stepLine} key={step.badge}>
                  <div className={styles.stepCol}>
                    <div
                      className={
                        step.here
                          ? `${styles.stepBadge} ${styles.stepBadgeHere}`
                          : styles.stepBadge
                      }
                    >
                      {step.badge}
                    </div>
                    {index < PROCEDURE_STEPS.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <p>{step.titre}</p>
                    {step.sous && (
                      <span className={styles.stepSub}>{step.sous}</span>
                    )}
                    {step.refus && (
                      <>
                        <br />
                        <span className={styles.refusTag}>{step.refus}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.chatBody}>
              <div className={styles.bubbleBot}>
                C&rsquo;est une procédure qui peut prendre{" "}
                <strong>plusieurs mois, voire plusieurs années</strong>. Vous
                n&rsquo;êtes pas obligée d&rsquo;aller jusqu&rsquo;au bout.
                Chaque étape vous appartient.
              </div>
            </div>

            <div className={styles.bottomActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => go("continuer")}
              >
                Comprendre la prochaine étape concrète →
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => go("retour")}
              >
                ← Revenir au début
              </button>
            </div>
          </>
        )}

        {screen === "action" && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.bubbleBot}>
                Votre prochaine étape concrète est simple :
                <br />
                <br />
                <strong>
                  Parler à votre médecin traitant de votre souhait de faire
                  une demande d&rsquo;ALD 31.
                </strong>
                <br />
                <br />
                C&rsquo;est lui ou elle qui initie la démarche auprès de la
                CPAM de votre département. Vous pouvez lui montrer la fiche
                ALD d&rsquo;ENDOmind si besoin — elle est faite pour ça.
              </div>
              <div className={styles.bubbleBot}>
                <strong>Pour préparer ce rendez-vous :</strong>
                <br />
                <br />
                ✔ Notez vos documents médicaux disponibles (compte-rendu de
                diagnostic, examens, ordonnances).
                <br />
                ✔ Dites-lui que vous souhaitez une demande d&rsquo;ALD 31 pour
                endométriose.
                <br />
                ✔ Gardez une copie de tout ce qui vous est envoyé par la
                CPAM.
              </div>
            </div>

            <div className={styles.ressourceCard}>
              <span className={styles.rcLabel}>À télécharger</span>
              <span className={styles.rcTitle}>
                Guide « Le diagnostic, et maintenant ? »
              </span>
              <span className={styles.rcDesc}>
                80 pages pour comprendre vos droits après le diagnostic, dont
                un chapitre complet sur l&rsquo;ALD 31. Gratuit.
              </span>
            </div>

            <div className={styles.bottomActions}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => go("soutien")}
              >
                Trouver du soutien autour de moi →
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => go("retour")}
              >
                ← Revenir au début
              </button>
            </div>
          </>
        )}

        {screen === "indisponible" && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.bubbleBot}>
                Ce parcours n&rsquo;est pas encore disponible dans cette
                version du chatbot. Nous travaillons à le proposer bientôt.
              </div>
            </div>

            <div className={styles.bottomActions}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => go("retour")}
              >
                ← Revenir au début
              </button>
            </div>
          </>
        )}

        <p className={styles.disclaimer}>
          Ce chatbot s&rsquo;appuie uniquement sur les ressources
          d&rsquo;ENDOmind. Il ne pose pas de diagnostic et ne remplace pas
          votre médecin.
        </p>
      </section>
    </div>
  );
}
