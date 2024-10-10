import { useEffect, useRef } from "react";

const Iphone = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative z-50 flex flex-col items-center justify-center">
      <div className="relative -ml-2.5 h-[430px] w-[230px] rounded-[35px] border-4 border-black">
        {/* Silencer */}
        <div className="absolute left-[-2.5px] top-[81.5px] h-[13px] w-[2px] rounded-[5px] bg-slate-400 opacity-80"></div>

        {/* Volume Up and Down */}
        <div className="absolute left-[-2.5px] top-[110px] h-[28px] w-[2px] rounded-[5px] bg-slate-400 opacity-80"></div>
        <div className="absolute left-[-2.5px] top-[148px] h-[28px] w-[2px] rounded-[5px] bg-slate-400 opacity-80"></div>

        {/* Button On */}
        <div className="absolute right-[-2px] top-[121px] h-[45px] w-[2px] rounded-[5px] bg-slate-400 opacity-80"></div>

        <div className="border-6 relative flex h-full w-full justify-center overflow-hidden rounded-[35px] border-black bg-white">
          <div className="absolute h-full w-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              src={videoUrl}
              className="h-full w-full"
            ></video>
          </div>

          {/* Camera */}
          <div className="relative flex h-[20px] w-[76px] justify-center rounded-b-[15px] bg-black">
            <div className="absolute left-[12px] top-[5px] flex h-[5px] w-[5px] items-center justify-center rounded-full bg-white/20">
              <div className="absolute h-[4px] w-[4px] rounded-full bg-white opacity-30 blur-[1px]"></div>
            </div>
            <div className="absolute h-[1px] w-[1px] rounded-full bg-black opacity-70"></div>
            <div className="absolute top-[-3px] h-[1px] w-[28px] rounded-[20px] bg-white opacity-20"></div>
          </div>

          {/* Battery and Signal */}
          <div className="absolute right-[17px] top-[8px] flex gap-[5px] text-[10px]">
            <div className="relative mt-[4px] h-[7px] w-[14px] rounded-[2px] border border-white/70">
              <div className="m-[1px] h-[calc(100%-2px)] w-[calc(80%-2px)] rounded-[1px] bg-white"></div>
              <div className="absolute right-[-2px] top-[1.5px] h-[3px] w-[1px] rounded-[2px] bg-white/70"></div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="absolute bottom-[6px] h-[2px] w-[80px] rounded-[2px] bg-black opacity-80"></div>
        </div>
      </div>
    </section>
  );
};

export default Iphone;
