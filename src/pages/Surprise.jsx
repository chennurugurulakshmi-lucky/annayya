
import { useEffect, useRef, useState } from "react";
import "../styles/surprise.css";


const surprisePhotos = [ { src: "/images/gallery/photo1.jpeg", className: "surprise-photo-one", title: "My Favourite Memory ❤️", message: "Every moment with you becomes a memory I want to keep forever. Your smile makes ordinary days special.", }, { src: "/images/gallery/photo2.jpg", className: "surprise-photo-two", title: "My Forever Annayya 🫶", message: "No matter how much we grow up, you will always be someone incredibly special to me.", }, { src: "/images/gallery/photo3.jpg", className: "surprise-photo-three", title: "A Bond Forever 💜", message: "Years may pass and life may change, but our beautiful memories will always have a special place in my heart.", },
];


const fallingItems = [
  "❤️", "🌹", "❤️", "🌹", "💗", "🌹", "❤️", "🌸", "🌹", "💕",
  "🌹", "❤️", "💖", "🌹", "❤️", "🌸", "💕", "🌹", "❤️", "💗",
];

function Surprise({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showFinalLine, setShowFinalLine] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.7;

    const playMusic = () => {
      audio.play().catch(() => {});
    };

    playMusic();

    document.addEventListener("click", playMusic, { once: true });
    document.addEventListener("keydown", playMusic, { once: true });

    return () => {
      document.removeEventListener("click", playMusic);
      document.removeEventListener("keydown", playMusic);
    };
  }, []);

  useEffect(() => {
    if (!opened) return;

    if (visiblePhotos < surprisePhotos.length) {
      const timer = setTimeout(() => {
        setVisiblePhotos((previous) => previous + 1);
      }, 900);

      return () => clearTimeout(timer);
    }

    if (!showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 700);

      return () => clearTimeout(timer);
    }

    if (!showFinalLine) {
      const timer = setTimeout(() => {
        setShowFinalLine(true);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [opened, visiblePhotos, showMessage, showFinalLine]);

  const handleOpen = () => {
    setOpened(true);

    const audio = audioRef.current;

    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  return (
    <main className={`surprise-page ${opened ? "is-open" : ""}`}>

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src="/music/WhatsApp%20Audio%202026-10-11%20at%201.48.23%20PM.mpeg"
        loop
        preload="auto"
      />

      {/* BACKGROUND */}
      <div className="surprise-background">
        <span className="surprise-orb surprise-orb-one"></span>
        <span className="surprise-orb surprise-orb-two"></span>
        <span className="surprise-orb surprise-orb-three"></span>
        <span className="surprise-glow glow-one"></span>
        <span className="surprise-glow glow-two"></span>
      </div>

      {/* FALLING HEARTS AND ROSES */}
      {opened && (
        <div className="falling-love">
          {fallingItems.map((item, index) => (
            <span
              key={index}
              className="falling-item"
              style={{
                "--left": `${(index * 17.3) % 100}%`,
                "--delay": `${(index % 10) * 0.55}s`,
                "--duration": `${5 + (index % 6) * 0.8}s`,
                "--size": `${18 + (index % 5) * 5}px`,
                "--rotation": `${-25 + (index % 8) * 12}deg`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* CLOSED GIFT BOX */}
      {!opened && (
        <section className="surprise-intro">
          <p className="surprise-small-text">
            A LITTLE SOMETHING FOR YOU
          </p>

          <h1>
            ONE MORE
            <span>SURPRISE</span>
          </h1>

          <p className="surprise-hint">
            I saved this one for you...
          </p>

          <button
            className="surprise-box-button"
            onClick={handleOpen}
            aria-label="Open surprise"
          >
            <span className="box-glow"></span>

            <span className="gift-box">
              <span className="gift-lid"></span>

              <span className="gift-body">
                <span className="gift-ribbon vertical"></span>
                <span className="gift-ribbon horizontal"></span>
              </span>

              <span className="gift-bow left"></span>
              <span className="gift-bow right"></span>
            </span>

            <span className="open-text">
              CLICK TO OPEN
            </span>
          </button>
        </section>
      )}

      {/* OPENED SURPRISE */}
      {opened && (
        <section className="opened-surprise">
          <p className="opened-small-text">
            JUST FOR YOU, ANNAYYA
          </p>

          <h1 className="opened-title">
            A FEW THINGS
            <span>I WANT YOU TO SEE</span>
          </h1>

          {/* EACH PHOTO + ITS MESSAGE IN ZIGZAG */}
          <div className="surprise-photo-row">
            {surprisePhotos.map((photo, index) => (
              <div
                key={photo.src}
                className={`surprise-memory ${photo.className} ${
                  index < visiblePhotos ? "show-surprise-photo" : ""
                }`}
              >
                {/* PHOTO — ALWAYS VISIBLE WITH ITS MESSAGE */}
                <img
                  src={photo.src}
                  alt={`Annayya memory ${index + 1}`}
                  className="surprise-photo"
                />

                {/* TWO-LINE MESSAGE BESIDE THE PHOTO */}
                <div className="surprise-photo-message">
                  <h2>{photo.title}</h2>
                  <p>{photo.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* LOVE MESSAGE */}
          {showMessage && (
            <div className="love-message">
              <p className="love-line">I LOVE YOU</p>

              <h2>
                ANNAYYA
                <span>❤️</span>
              </h2>
            </div>
          )}

          {/* FINAL MESSAGE */}
          {showFinalLine && (
            <div className="final-surprise">
              <p>Forever my favourite person. 💜</p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Surprise;
