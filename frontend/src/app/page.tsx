import styles from "./page.module.css";

export default function Home() {
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
              Je ne suis pas médecin. Je vous oriente vers les informations
              fiables d&rsquo;ENDOmind, à votre rythme.
            </p>
          </div>

          <div className={styles.bubbleBot}>
            Avant de commencer,{" "}
            <strong>où en êtes-vous avec votre demande d&rsquo;ALD 31 ?</strong>
          </div>
        </div>

        <div className={styles.quickChoices}>
          <button type="button" className={styles.choiceBtn}>
            Je n&rsquo;ai pas encore fait de demande — je veux comprendre
            comment ça marche
          </button>
          <button type="button" className={styles.choiceBtn}>
            J&rsquo;ai reçu un refus et je veux le contester
          </button>
          <button type="button" className={styles.choiceBtn}>
            Je veux juste savoir ce qu&rsquo;est l&rsquo;ALD 31
          </button>
        </div>

        <p className={styles.disclaimer}>
          Ce chatbot s&rsquo;appuie uniquement sur les ressources
          d&rsquo;ENDOmind. Il ne pose pas de diagnostic et ne remplace pas
          votre médecin.
        </p>
      </section>
    </div>
  );
}
