import { View, Text, StyleSheet, Image } from "react-native";
import { FunctionComponent, useCallback } from "react";

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
  const constructNames = () => {
    const regex = new RegExp(`(${query})`, "gi");
    const splitString = name.split(regex);
    return splitString.map((substring, i) => {
      if (substring.toLowerCase() === query.toLowerCase()) {
        return (
          <Text
            numberOfLines={1}
            key={i}
            style={[styles.name, { fontWeight: "700" }]}
          >
            {substring}
          </Text>
        );
      } else {
        return (
          <Text numberOfLines={1} key={i} style={styles.name}>
            {substring}
          </Text>
        );
      }
    });
  };

  const cachedConstructNames = useCallback(constructNames, [name, query]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: avatar }} />
        {cachedConstructNames()}
      </View>
      <Text>{description || "No description available."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    borderRadius: 10,
    minHeight: 100,
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
