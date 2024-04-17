import { View } from "react-native";
import { StyleSheet } from "react-native";
import { GithubSVG } from "./svgs/GithubSVG";
import { InterText } from "./StyledText";

export const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <GithubSVG />
      <InterText style={styles.headerText}>GitHub Repo Search</InterText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  headerText: { paddingLeft: 14, fontWeight: "700" },
});
