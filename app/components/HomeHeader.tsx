import { View } from "react-native";
import { Text, StyleSheet } from "react-native";
import { GithubSVG } from "./svgs/GithubSVG";

export const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <GithubSVG />
      <Text style={styles.headerText}>Github Repo Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  headerText: { paddingLeft: 14, fontWeight: "700" },
});
