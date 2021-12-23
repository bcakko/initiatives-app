import Fights from "./components/Fights/Fights";
import FightsProvider from "./store/FightsProvider";

const App = () => {
  return (
    <FightsProvider>
      <Fights />
    </FightsProvider>
  );
};

export default App;
