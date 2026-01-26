import robot from "../assets/robot.png";
import { BRAND_NAME } from "../../config/default";
import chat from "../assets/chat.png";
import GIF from "../assets/bgvideo.gif";
import VIDEO from "../assets/video1.mp4";
import Plane from "./Plane";

/* ---------------- HERO CARD ---------------- */
const HeroCard = () => {
  return (
    <section className="mx-6 md:mx-12">
      <div className="mt-6 border-4 border-t-0 border-b-0 border-gray-800 px-8 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Embed Smarter Conversations on Your Website
            </h2>

            <p className="text-gray-600 mt-4 max-w-md">
              Power your website with intelligent AI conversations
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={chat}
              alt="Chat UI"
              className="w-64 md:w-72 drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

/* ---------------- VIDEO CARD ---------------- */
const VideoCard = () => {
  return (
    <section id="video">
      <div className="w-[95%] mx-auto mb-30 h-[40vh] md:h-[50vh] bg-black flex">
        <div className="w-[70%] h-full flex items-center relative">
          <img src={GIF} className="rotate-[90deg] hue-rotate-30 h-full object-contain" />

          <div className="absolute  shadow-blink rounded-3xl left-[17%] overflow-hidden bg-red-400 h-[200px] w-[300px] md:w-[350px] z-30">
            <video autoPlay muted loop className="h-full absolute top-0 w-full object-cover">
              <source src={VIDEO} />
            </video>
          </div>

          <img src={GIF} className="hue-rotate-30 absolute left-[18%] h-full object-contain" />
        </div>

        <div className="w-[30%] hidden md:flex items-start justify-center flex-col">
          <h1 className="text-9xl text-white neo">AI</h1>
          <span className="text-gray-300 text-2xl">
            is live in just one click with
          </span>
          <h1 className="text-6xl text-white neo">{BRAND_NAME}</h1>
        </div>
      </div>
    </section>
  );
};

/* ---------------- MAIN HERO ---------------- */
const Hero = () => {
  return (
    <>
      {/* HOME */}
      <section
        id="home"
        className="w-[95%] mx-auto px-6 md:px-12 mt-24 bg-gradient-to-br from-gray-500 to-gray-200 rounded-3xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">

          <img
            src={robot}
            alt="Robot"
            className="w-32 sm:w-40 md:w-64 drop-shadow-2xl"
          />

          <div className="text-center md:text-left">
            <h1 className="neo font-extrabold tracking-wide text-black text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-none">
              {BRAND_NAME}
            </h1>

            <p className="text-xl font-light text-gray-500">
              Create intelligent AI bots for your business in minutes.
            </p>
          </div>

        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="w-full px-2 border-b-4 mb-4 mt-20">
        <HeroCard />
      </section>

      {/* VIDEO */}
      <section className="mt-20">
        <VideoCard />
      </section>

      <section id="pricing" className="w-full px-2 border-b-4 mb-4" >
         <Plane/>
      </section>
    </>
  );
};

export default Hero;
