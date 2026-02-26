import useLocalStorage from "./useLocalStorage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducers/store";
import toggleParticlesAction from "../reducers/utilitisesReducer/actions/toggleParticlesAction";

const useDisplayParticles = () => {

    // Reducers
    const dispatch: AppDispatch = useDispatch()

    // Local Display Particle
    const [localParticles, setLocalParticles] = useLocalStorage("ryunovaParticles", "")

    const handleDisplayParticles = (currentDisplay: boolean) => {
        setLocalParticles(!currentDisplay)
        dispatch(toggleParticlesAction())
    }
    return { handleDisplayParticles, localParticles};
};

export default useDisplayParticles