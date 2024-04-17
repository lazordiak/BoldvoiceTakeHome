import { View, StyleSheet, Image } from "react-native";
import { FunctionComponent, useCallback } from "react";
import { constructNames } from "../utils/constructNames";
import { InterText } from "./StyledText";

type ResultsCardProps = {
  avatar: string;
  name: string;
  description: string;
  query: string;
};

export const ResultsCard: FunctionComponent<ResultsCardProps> = ({
  avatar,
  name,
  description,
  query,
}) => {
  const cachedConstructNames = useCallback(constructNames, [name, query]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: avatar }} />
        {cachedConstructNames(query, name, styles)}
      </View>
      <InterText>{description || "No description available."}</InterText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  name: {
    fontWeight: "500",
  },
});
