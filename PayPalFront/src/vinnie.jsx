import { useEffect, useState } from "react";

const Vinnie = () => {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSecond(true), 3500);
    setTimeout(() => setShowThird(true), 6500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="max-w-4xl px-4 relative">
        {/* First Line */}
        <div className="relative overflow-hidden whitespace-nowrap text-3xl md:text-5xl font-bold text-purple-400 animate-typing w-max">
          Welcome to My Colorful Website
          <span className="w-1 h-12 bg-purple-400 inline-block animate-blink"></span>
        </div>

        {/* Second Line */}
        {showSecond && (
          <div className="relative mt-8 overflow-hidden whitespace-nowrap text-xl md:text-3xl font-medium text-pink-300 animate-typing w-max">
            Where Colors Dance &amp; Text Comes Alive
            <span className="w-1 h-8 bg-pink-300 inline-block animate-blink"></span>
          </div>
        )}

        {/* Third Line */}
        {showThird && (
          <div className="relative mt-6 overflow-hidden whitespace-nowrap text-lg md:text-xl text-cyan-300 animate-typing w-max">
            Explore this vibrant world of animated text and gradients...
            <span className="w-1 h-6 bg-cyan-300 inline-block animate-blink"></span>
          </div>
        )}

        {/* Floating Blobs Background */}
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen opacity-20 animate-float"></div>
        <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen opacity-20 animate-float-reverse"></div>
      </div>

      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          @keyframes blink {
            50% { opacity: 0 }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0) }
            50% { transform: translate(20px, -20px) }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translate(0, 0) }
            50% { transform: translate(-20px, 20px) }
          }
          .animate-typing {
            animation: typing 3.5s steps(40, end) forwards;
          }
          .animate-blink {
            animation: blink 0.8s infinite;
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-reverse {
            animation: float-reverse 8s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Vinnie;
