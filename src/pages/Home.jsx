import { useEffect, useState } from "react";
import "../styles/home.css";

const messages = [
  "You deserve all the happiness this world has to offer. ❤️",
  "May your dreams come true and your efforts turn into beautiful victories. ✨",
  "May your smile never fade and your heart always stay at peace. 🧿",
  "No matter where life takes you, may you always be surrounded by love and blessings. 🤍",
];

function Home({ onViewMessage }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [completedMessages, setCompletedMessages] = useState([]);

  useEffect(() => {
    const currentMessage = messages[messageIndex];

    if (typedText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        setTypedText(
          currentMessage.slice(0, typedText.length + 1)
        );
      }, 55);

      return () => clearTimeout(timer);
    }

    if (messageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCompletedMessages((previous) => [
          ...previous,
          currentMessage,
        ]);

        setMessageIndex((previous) => previous + 1);
        setTypedText("");
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [typedText, messageIndex]);

  return (
    <main className="home-page">

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


      <div className="home-inner">

        <p className="intro-text">
          A LITTLE SURPRISE FOR YOU
        </p>

        <h1 className="birthday-title">
          HAPPY BIRTHDAY
          <span>ANNAYYA</span>
        </h1>

        <div className="hero-image-wrapper">
          <img
            src="images\hero\hero.jpeg"
            alt="Annayya"
            className="hero-image"
          />
        </div>

        <div className="message-frame">

          {completedMessages.map((message, index) => (
            <p
              key={index}
              className="completed-message"
            >
              {message}
            </p>
          ))}

          <p className="typing-message">
            {typedText}
            <span className="typing-cursor">|</span>
          </p>

        </div>

        <button
          className="view-message-button"
          onClick={onViewMessage}
        >
          VIEW MESSAGE
          <span>♡</span>
        </button>

      </div>

    </main>
  );
}

export default Home;