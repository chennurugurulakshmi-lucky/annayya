import "../styles/letter.css";

function Letter({ onNext }) {
  return (
    <main className="letter-page">

      {/* FLOATING BACKGROUND */}
      <div className="floating-background">

        <span className="floating-orb orb-1"></span>
        <span className="floating-orb orb-2"></span>
        <span className="floating-orb orb-3"></span>
        <span className="floating-orb orb-4"></span>
        <span className="floating-orb orb-5"></span>
        <span className="floating-orb orb-6"></span>

        <span className="floating-dot dot-1"></span>
        <span className="floating-dot dot-2"></span>
        <span className="floating-dot dot-3"></span>
        <span className="floating-dot dot-4"></span>
        <span className="floating-dot dot-5"></span>
        <span className="floating-dot dot-6"></span>

      </div>


      <div className="letter-inner">

        <p className="letter-intro">
          A FEW WORDS FROM MY HEART
        </p>

        <h1>
          FOR YOU,
          <span>ANNAYYA</span>
        </h1>

        <div className="letter-line"></div>

        <div className="letter-message">

          <p>
           Nuvvu naaku just annayya maatrame kaadhu, naa life lo chala special person vi. 
           Ninnu entha irritate chesina, entha godava padina, nuvvu naaku eppatiki special eh. 🥹❤️
           Nenu anni saarlu cheppakapovachu, kaani ninnu chala love chesthanu. Nee life lo nuvvu 
           anukunnavanni jaragali.
          </p>

          <p>
            nuvvu eppudu happy ga undali, nee face meedha smile eppudu alane undali ani manaspoorthiga korukuntunna. 🫶🏻
            Manam enni godavalu padina, enni sarlu okarini okaram irritate chesukunna, nuvvu naa annayya vi ane 
            feeling eppatiki maaradhu. Nuvvu happy ga unte naaku kuda happy ga untundhi. ❤️
          </p>

          <p>
           Nuvvu life lo inka chala heights ki vellali, nee dreams anni nijam avvali.Eppudu nee pakkana undakapovachuu
           kani naa support maatram eppudu neeku untundiii TRUST ME. 
           Once again, Happy Birthday ra Annayya! 🥹🎂💗 Love you so much! 🫂❤️
          </p>

        </div>

        <button
          className="memories-button"
          onClick={onNext}
        >
          MEMORIES
          <span>↓</span>
        </button>

      </div>

    </main>
  );
}

export default Letter;