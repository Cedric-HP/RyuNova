"use client"
import { useMemo } from "react";
import Navbar from "./components/Navbar";
import Particle from "./components/particules";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";


export default function ClientLayout({ children }: { children: React.ReactNode }) {

  const { displayParticles } = useSelector(
    (store: RootState) => store.utilitisesReducer
  )

  const particlesElement = useMemo(() => <Particle/>, []);

  return (
    <>
      <div id="filter"></div>
      {displayParticles && particlesElement}
      <Navbar>{children}</Navbar>
    </>
  );
}

