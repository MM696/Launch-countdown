import React, { useEffect, useState, useMemo, useRef } from "react";
import Confetti from "react-confetti";
import BackgroundImg from "../assets/img.gif";
import FrTom from "../assets/fr-tom.jpeg";
import FrNelson from "../assets/fr-nelson.jpeg";
import FrNassise from "../assets/fr-nassise.jpeg";
import FrTony from "../assets/fr-tony.jpeg";
import FrJoseph from "../assets/fr-joseph.jpeg";
import FrPatrick from "../assets/fr-patrick.jpeg";
import HnyVideo from "../assets/hny-3.mp4";
import WelcomeVideo from "../assets/welcome.mp4";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownToNewYear: React.FC = () => {
  // ============================================
  // SET YOUR TARGET DATE HERE
  // ============================================
  // Format: new Date(year, month - 1, day, hour, minute, second)
  // Example: new Date(2026, 0, 1, 0, 0, 0) = January 1, 2026 at 00:00:00
  // Example: new Date(2025, 11, 25, 12, 0, 0) = December 25, 2025 at 12:00:00
  // Example: new Date(2025, 5, 15, 18, 30, 0) = June 15, 2025 at 18:30:00
  const TARGET_DATE = new Date(2026, 0, 1, 0, 0, 0); // December 26, 2025 at 12:00:00
  // ============================================

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const welcomeVideoRef = useRef<HTMLVideoElement>(null);

  // Generate star positions once
  const starPositions = useMemo(() => 
    Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 2,
    })), []
  );

  // Generate particle positions once
  const particlePositions = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    })), []
  );

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);


  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = TARGET_DATE.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setShowConfetti(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
      });
      setShowConfetti(false);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl min-w-[100px] md:min-w-[140px] lg:min-w-[180px] xl:min-w-[220px] 2xl:min-w-[260px]">
          <div className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent">
            {String(value).padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-white/70 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  const isNewYear = timeLeft.days === 0 && timeLeft.hours === 0 && 
                   timeLeft.minutes === 0 && timeLeft.seconds === 0;

  // Play video when countdown finishes
  useEffect(() => {
    if (isNewYear && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [isNewYear]);

  // Handle hny-3 video end - play welcome video
  const handleHnyVideoEnd = () => {
    setShowWelcomeVideo(true);
    if (welcomeVideoRef.current) {
      welcomeVideoRef.current.play().catch((error) => {
        console.error("Error playing welcome video:", error);
      });
    }
  };

  // Play welcome video when it should be shown
  useEffect(() => {
    if (showWelcomeVideo && welcomeVideoRef.current) {
      welcomeVideoRef.current.play().catch((error) => {
        console.error("Error playing welcome video:", error);
      });
    }
  }, [showWelcomeVideo]);

  // Determine which image to show in the final 10 seconds
  const showFinalSecondsImage = timeLeft.days === 0 && timeLeft.hours === 0 && 
                                timeLeft.minutes === 0 && timeLeft.seconds >= 1 && timeLeft.seconds <= 10;
  
  const getFinalSecondsText = (): string | undefined => {
    const textMap: { [key: number]: string } = {
      10: "More Joy",
      9: "Less Fear",
      8: "I Survived",
      7: "Now I Thrive...",
    };
    return textMap[timeLeft.seconds as keyof typeof textMap];
  };
  
  const getFinalSecondsImage = (): string | undefined => {
    const imageMap: { [key: number]: string } = {
      6: FrTom,
      5: FrNelson,
      4: FrNassise,
      3: FrPatrick,
      2: FrTony,
      1: FrJoseph,
    };
    return imageMap[timeLeft.seconds as keyof typeof imageMap];
  };
  
  const finalSecondsImage = getFinalSecondsImage();
  const finalSecondsText = getFinalSecondsText();

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BackgroundImg})`,
        }}
      ></div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-pink-900/80"></div>
      
      {/* Animated Stars Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {starPositions.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      {/* New Year Video */}
      {isNewYear && !showWelcomeVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            ref={videoRef}
            src={HnyVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleHnyVideoEnd}
          />
          {/* Happy New Year Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-[60]">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center animate-hny-text">
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl" style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                letterSpacing: '0.1em',
                fontWeight: 700
              }}>
                HAPPY NEW YEAR
              </span>
            </h1>
          </div>
        </div>
      )}

      {/* Welcome Video - Plays after hny-3 */}
      {showWelcomeVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            ref={welcomeVideoRef}
            src={WelcomeVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}

      {/* Main Content */}
      {!isNewYear && (
        <div className="relative z-10 text-center px-4 py-8 w-full max-w-6xl font-sans animate-throw-in">
          {/* Title */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse drop-shadow-lg block"
            style={{ marginBottom: '3rem' }}
          >
            Countdown To {TARGET_DATE.getFullYear()}
          </h1>
          
          {/* Countdown Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="text-white/50 text-sm md:text-base">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Final Seconds Images/Text Display */}
      {showFinalSecondsImage && (finalSecondsImage || finalSecondsText) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center">
            {finalSecondsText ? (
              <div className="flex flex-col items-center justify-center">
                {/* Text Only - No Countdown Number */}
                <h2 
                  key={timeLeft.seconds}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white animate-pulse drop-shadow-2xl text-center px-8"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '0.1em',
                    fontWeight: 700
                  }}
                >
                  {finalSecondsText}
                </h2>
              </div>
            ) : (
              <>
                <img
                  key={timeLeft.seconds}
                  src={finalSecondsImage}
                  alt={`Final ${timeLeft.seconds} seconds`}
                  className="image-grow-to-full-height rounded-lg shadow-2xl"
                  style={{ height: 'auto', width: 'auto' }}
                />
                {/* Countdown Overlay */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div key={`countdown-${timeLeft.seconds}`} className="countdown-number animate-countdown-slide">
                    {timeLeft.seconds}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownToNewYear;
