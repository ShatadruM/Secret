import PauschImage from "../assets/pausch_mascot.svg?react";

const Test = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen z-10">
      <PauschImage
        className="
             w-1/2 h-auto mx-auto 
             text-white [&_path]:fill-current
             opacity-90 -rotate-6  
           "
      />
    </div>
  );
};

export default Test;
