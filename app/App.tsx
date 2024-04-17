import { RootNavigator } from "./navigation/RootNavigator";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter.ttf.ttf"),
  });
  return <>{fontsLoaded ? <RootNavigator /> : null}</>;
}
