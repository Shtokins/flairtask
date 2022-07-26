import Control from "./components/Control";
import Scores from "./components/Scores";
import { AppState } from "./store/AppState";

const App = () => {
  return (
    <div className="App">
      <AppState>
        <Control />
        <Scores />
      </AppState>
    </div>
  );
};

export default App;
