import Section from "./Section";

import Populargames from "./design/Populargames";

const Popular = () => {
  return (
    <Section id="features">
      <div className="relative z-1 max-w-[62rem] mx-auto text-center ">
      <h1 className="h1 mb-6">
          Hot News Popular Games
            
          </h1>
          <p className="body-1 max-w-3xl mx-auto  text-n-2 ">
          Dunia Game Makin Panas! Update besar dari Mobile Legends, Valorant, hingga Free Fire mengguncang komunitas gamer global!
          </p>
        <Populargames />
      </div>
    </Section>
  );
};

export default Popular;
