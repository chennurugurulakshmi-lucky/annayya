
import { useEffect, useRef, useState } from "react";
import "../styles/magical-door.css";

const audioTracks = [
  "/music/blessings4.aac",
  
];

const SWAMY_IMAGE =
  "/images/magicaldoor/WhatsApp%20Image%202026-10-11%20at%203.41.44%20PM.jpeg";

function MagicalDoor({ onNext }) {
  const [doorOpened, setDoorOpened] = useState(false);
  const [swamiVisible, setSwamiVisible] = useState(false);
  const [showBlessing, setShowBlessing] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(0);
  const [audioFinished, setAudioFinished] = useState(false);
  const [audioError, setAudioError] = useState("");

  const voiceRef = useRef(null);
  const timersRef = useRef([]);
  const audioIndexRef = useRef(0);
  const isMountedRef = useRef(true);

  // Clean up timers and audio when the component unmounts.
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      timersRef.current.forEach(clearTimeout);

      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current.onended = null;
        voiceRef.current.onerror = null;
      }
    };
  }, []);

  // Play the next blessing automatically when the current audio ends.
  const handleAudioEnded = async () => {
    const audio = voiceRef.current;

    if (!audio || !isMountedRef.current) return;

    const nextIndex = audioIndexRef.current + 1;

    // All three blessing recordings have finished.
    if (nextIndex >= audioTracks.length) {
      setVoicePlaying(false);
      setAudioFinished(true);
      setCurrentAudio(0);

      audio.onended = null;
      return;
    }

    audioIndexRef.current = nextIndex;
    setCurrentAudio(nextIndex);

    try {
      audio.src = audioTracks[nextIndex];
      audio.load();

      await audio.play();
    } catch (error) {
      console.error(
        `Unable to play blessing audio ${nextIndex + 1}:`,
        error
      );

      if (isMountedRef.current) {
        setVoicePlaying(false);
        setAudioError(
          `Blessing audio ${nextIndex + 1} could not be played. Check the audio file and browser support.`
        );
      }
    }
  };

  // Handle audio loading errors.
  const handleAudioError = () => {
    if (!isMountedRef.current) return;

    setVoicePlaying(false);
    setAudioError(
      "A blessing audio file could not be loaded. Please check the filenames in public/music."
    );

    console.error(
      "Audio loading failed:",
      voiceRef.current?.currentSrc
    );
  };

  // Start all blessing recordings in sequence.
  const playBlessingVoice = async () => {
    const audio = voiceRef.current;

    if (!audio) return;

    setAudioError("");
    setAudioFinished(false);
    setCurrentAudio(0);
    setVoicePlaying(true);

    audioIndexRef.current = 0;

    audio.pause();
    audio.onended = handleAudioEnded;
    audio.onerror = handleAudioError;
    audio.src = audioTracks[0];
    audio.load();

    try {
      await audio.play();
    } catch (error) {
      console.error("Unable to play blessing audio:", error);

      if (isMountedRef.current) {
        setVoicePlaying(false);
        setAudioError(
          "Audio could not start. Please check the audio files and browser support."
        );
      }
    }
  };

  // Open the temple and reveal Swamy.
  const startDivineJourney = () => {
    if (doorOpened) return;

    setDoorOpened(true);

    // Start audio directly from the user's click to improve autoplay compatibility.
    playBlessingVoice();

    // Reveal Swamy shortly after the doors begin opening.
    timersRef.current.push(
      setTimeout(() => {
        setSwamiVisible(true);
      }, 200)
    );

    // Show the birthday blessing text below the temple.
    timersRef.current.push(
      setTimeout(() => {
        setShowBlessing(true);
      }, 3000)
    );
  };

  return (
    <main className="magical-door-page">
      {/* Audio stays mounted, even before the doors open. */}
      <audio ref={voiceRef} preload="auto" />

      {/* Background stars */}
      <div className="divine-sky" aria-hidden="true">
        {Array.from({ length: 45 }, (_, index) => (
          <span
            key={index}
            className="divine-star"
            style={{
              "--star-x": `${(index * 37 + 11) % 100}%`,
              "--star-y": `${(index * 23 + 7) % 100}%`,
              "--star-delay": `${(index % 9) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Golden divine light */}
      <div
        className={`divine-light ${doorOpened ? "light-active" : ""}`}
        aria-hidden="true"
      />

      {/* Falling golden particles */}
      {doorOpened && (
        <div className="golden-particles" aria-hidden="true">
          {Array.from({ length: 55 }, (_, index) => (
            <span
              key={index}
              className="golden-particle"
              style={{
                "--particle-x": `${(index * 29 + 7) % 100}%`,
                "--particle-delay": `${(index % 15) * 0.45}s`,
                "--particle-duration": `${4 + (index % 5)}s`,
                "--particle-size": `${3 + (index % 4)}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Intro text */}
      {!doorOpened && (
        <section className="door-intro">
          <p className="divine-eyebrow">
            ✨ A DIVINE BLESSING AWAITS ✨
          </p>

          <h1>
            A Little Blessing
            <br />
            For Someone Special 💛
          </h1>

          <p className="door-description">
            Annayya, something beautiful is waiting behind this door.
            <br />
            Open it and receive the blessings of Lord Venkateswara Swamy.
          </p>
        </section>
      )}

      {/* Temple doors */}
      <section className="temple-entrance">
        <div
          className={`temple-door-frame ${
            doorOpened ? "frame-opened" : ""
          }`}
        >
          <div className="door-glow" />

          {/* Swamy appears inside the temple doorway */}
          <div className="temple-inside">
            <div className="heaven-cloud cloud-left" />
            <div className="heaven-cloud cloud-right" />

            <div className="temple-inner-light" />

            {swamiVisible && (
              <div className="swamy-inside-temple">
                <div className="swamy-aura" />

                <img
                  className="swamy-image"
                  src={SWAMY_IMAGE}
                  alt="Lord Venkateswara Swamy"
                  onError={(event) => {
                    console.error(
                      "Swamy image could not be loaded. Check the image path:",
                      SWAMY_IMAGE
                    );
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
              </div>
            )}

            <div className="temple-stairs" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* Left door */}
          <div
            className={`door-panel door-left ${
              doorOpened ? "door-left-open" : ""
            }`}
          >
            <div className="door-decoration">
              <span className="door-om">ॐ</span>
              <span className="door-pattern">✦</span>
              <span className="door-pattern">✧</span>
              <span className="door-pattern">✦</span>
            </div>

            <span className="door-handle" />
          </div>

          {/* Right door */}
          <div
            className={`door-panel door-right ${
              doorOpened ? "door-right-open" : ""
            }`}
          >
            <div className="door-decoration">
              <span className="door-om">ॐ</span>
              <span className="door-pattern">✦</span>
              <span className="door-pattern">✧</span>
              <span className="door-pattern">✦</span>
            </div>

            <span className="door-handle" />
          </div>
        </div>
      </section>

      {/* Open door button */}
      {!doorOpened && (
        <button
          type="button"
          className="open-magic-door"
          onClick={startDivineJourney}
        >
          ✨ OPEN THE DOOR ✨
        </button>
      )}

      {/* Birthday blessing text */}
      {showBlessing && (
        <section className="swamy-reveal">
          <p className="swamy-name">
            🙏 OM NAMO VENKATESAYA 🙏
          </p>

          <div className="swamy-blessing">
            <p className="blessing-label">
              A SPECIAL BIRTHDAY BLESSING
            </p>

            <h2>Divine Blessings for Annayya 💛</h2>

            <p className="blessing-intro">
              May Lord Venkateswara Swamy bless you with good health,
              happiness, peace, and success throughout your life.
            </p>

            <div className="highlight-blessing">
              <span className="highlight-om">ॐ</span>

              <p>
                Nuvvu anukunnadhi saadhisthunnavu.
                <br />
                Nuvvu korukunnadhi pondhuthunnavu.
                <br />
                Nee jeevitham andhamga maaruthundi.
                <br />
                Nee vijayaalu maatladuthayi.
                <br />
                Nee kala nijam avuthundi.
                <br />
                Nee samayam vachhesindi.
              </p>

              <span className="highlight-lotus">✧</span>
            </div>

            <p className="govinda-message">
              Govinda! Govinda! 🙏
            </p>

          

            {audioError && (
              <p className="audio-error-message" role="alert">
                ⚠️ {audioError}
              </p>
            )}

            {audioFinished && (
              <p className="audio-complete-message">
                ✨ Your blessings are always with you, Annayya. ✨
              </p>
            )}

            <button
              type="button"
              className="continue-surprise"
              onClick={onNext}
            >
              CONTINUE TO YOUR SURPRISE →
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default MagicalDoor;
