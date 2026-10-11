import { useEffect, useState } from "react";
import "../styles/finale.css";


function Final() {
  return (
    <main className="final-page">

      {/* BACKGROUND LIGHTS */}
      <div className="final-background">
        <span className="final-orb final-orb-one"></span>
        <span className="final-orb final-orb-two"></span>
        <span className="final-orb final-orb-three"></span>
      </div>

      {/* CONTENT */}
      <section className="final-content">

        <p className="final-small-text">
          ONE LAST THING
        </p>

        <h1 className="final-title">
          A MESSAGE
          <span>FOR YOU, ANNAYYA</span>
        </h1>

        <div className="final-line"></div>

        {/* VIDEO */}
        <div className="video-wrapper">

          <div className="video-glow"></div>

          <video
            className="birthday-video"
            controls
            playsInline
            preload="metadata"
          >
            <source
              src="/videos/birthday-message.mp4"
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>

        </div>

        {/* MESSAGE AFTER VIDEO */}
        <div className="final-message">

          <p className="final-message-small">
            AND THAT'S ALL I WANTED TO SAY...
          </p>

          <h2>
            HAPPY BIRTHDAY
            <span>ANNAYYA ❤️</span>
          </h2>

          <p className="final-message-text">
            No matter where life takes us, I hope we always have
            moments like these to look back on.
          </p>

        </div>

        <div className="final-ending">
          <span></span>
          <p>THE END</p>
          <span></span>
        </div>

      </section>

    </main>
  );
}

export default Final;