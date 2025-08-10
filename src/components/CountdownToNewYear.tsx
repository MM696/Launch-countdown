import { useEffect, useState } from "react";

const CountdownToLaunch = () => {
  const launchDate = new Date("2025-09-17T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(launchDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(launchDate - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('../src/assets/img_1.png')" }}
    >
      <div className=" bg-opacity-50 p-8 rounded-lg text-center">
        <h1 className="text-5xl font-bold mb-6">🚀 Launching Soon</h1>
        <p className="text-lg mb-8">Our big event starts in...</p>

        <div className="flex gap-6 justify-center text-3xl font-mono">
          <div>
            <p className="text-6xl">{days}</p>
            <span className="text-sm uppercase">Days</span>
          </div>
          <div>
            <p className="text-6xl">{hours}</p>
            <span className="text-sm uppercase">Hours</span>
          </div>
          <div>
            <p className="text-6xl">{minutes}</p>
            <span className="text-sm uppercase">Minutes</span>
          </div>
          <div>
            <p className="text-6xl">{seconds}</p>
            <span className="text-sm uppercase">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownToLaunch;
