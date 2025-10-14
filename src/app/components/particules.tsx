"use client"

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function Particle () {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadAll(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: "#000000",
      //   },
      // },
      fpsLimit: 240,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "repulse",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 1,
          },
        },
      },
      particles: {
        color: {
          value: "#EBECFA",
        },
        links: {
          color: "#EBECFA",
          distance: 0,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          // attract: {
          //   enable: true,
          //   rotateX: 600,
          //   rotateY: 1200
          // },
          random: true,
          speed: 0.05,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 250,
        },
        opacity: {
          animation: {
            enable: true,
            speed: 0.5
          },
          value: { min: 0.1, max: 0.5 }
        },
        shadow: {
          blur: 5,
          color: "#EBECFA",
          enable: true
        },
        shape: {
          type: "circle",
        },
        size: {
          random: {
            enable: true,
            minimumValue: 0.5
          },
          value: 1.5
        }
      },
      detectRetina: true,
      // absorbers: {
      //   orbits: true,
      //   destroy: true,
      //   opacity: 1,
      //   color: "#000",
      //   size: {
      //     value: 5,
      //     limit: 10,
      //     random: false,
      //     density: 50
      //   },
      //   position: {
      //     x: 50,
      //     y: 50
      //   }
      // },
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        style={{boxShadow: "0 0 70px #EBECFA"}}
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};