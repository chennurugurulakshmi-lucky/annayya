
import { useEffect, useState, useRef } from "react";
import "../styles/memories.css";

const photos = [
  {
    src: "images/memories/memories1.jpeg",
    position: "photo-one",
  },
  {
    src: "images/memories/memories2.jpeg",
    position: "photo-two",
  },
  {
    src: "images/memories/memories3.jpeg",
    position: "photo-three",
  },
  {
    src: "images/memories/memories4.jpeg",
    position: "photo-four",
  },
  {
    src: "images/memories/memories5.jpeg",
    position: "photo-five",
  },
  {
    src: "images/memories/memories6.jpeg",
    position: "photo-six",
  },
  {
    src: "images/memories/memories7.jpeg",
    position: "photo-seven",
  },
  {
    src: "images/memories/memories8.jpeg",
    position: "photo-eight",
  },
];

function Memories({ onNext }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef(null);

  // BACKGROUND MUSIC
  useEffect(() => {
    const music = musicRef.current;

    if (music) {
      music.volume = 0.5;

      music.play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {
          // Browser may require the user to press the music button.
          setIsMusicPlaying(false);
        });
    }

    return () => {
      if (music) {
        music.pause();
        music.currentTime = 0;
      }
    };
  }, []);

  // MEMORY IMAGE ANIMATION
  useEffect(() => {
    if (visibleCount >= photos.length) {
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((previous) => previous + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  // PLAY / PAUSE MUSIC
  const toggleMusic = async () => {
    const music = musicRef.current;

    if (!music) return;

    if (music.paused) {
      try {
        await music.play();
        setIsMusicPlaying(true);
      } catch (error) {
        console.log("Unable to play music:", error);
        setIsMusicPlaying(false);
      }
    } else {
      music.pause();
      setIsMusicPlaying(false);
    }
  };

  return (
    <main className="memories-page">

      {/* BACKGROUND MUSIC */}
      <audio
        ref={musicRef}
        src="music\WhatsApp Audio 2026-10-11 at 2.51.43 PM.mpeg"
        loop
        preload="auto"
      />

      

      {/* FLOATING BACKGROUND */}
      <div className="floating-background">

        <span className="floating-orb orb-1"></span>
        <span className="floating-orb orb-2"></span>
        <span className="floating-orb orb-3"></span>
        <span className="floating-orb orb-4"></span>
        <span className="floating-orb orb-5"></span>
        <span className="floating-orb orb-6"></span>
        <span className="floating-orb orb-7"></span>
        <span className="floating-orb orb-8"></span>

        <span className="floating-dot dot-1"></span>
        <span className="floating-dot dot-2"></span>
        <span className="floating-dot dot-3"></span>
        <span className="floating-dot dot-4"></span>
        <span className="floating-dot dot-5"></span>
        <span className="floating-dot dot-6"></span>
        <span className="floating-dot dot-7"></span>
        <span className="floating-dot dot-8"></span>

      </div>

      {/* TITLE */}
      <div className="memories-title">

        <p>THE MOMENTS WE KEEP</p>

        <h1>MEMORIES</h1>

        <span>
          Some moments deserve to stay forever.
        </span>

      </div>

      {/* MEMORY WALL */}
      <div className="memory-area">

        {photos.map((photo, index) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={`Memory ${index + 1}`}
            className={`memory-image ${photo.position} ${
              index < visibleCount ? "show-photo" : ""
            }`}
          />
        ))}

      </div>
{visibleCount >= photos.length && (
  <button
    className="surprise-next-button"
    onClick={() => {
      console.log("Memories completed! Opening Magical Door...");
      onNext();
    }}
  >
    OPEN MAGICAL DOOR
    <span>→</span>
  </button>
)}

    </main>
  );
}

export default Memories;
