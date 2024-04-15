import { View, StyleSheet, Text } from "react-native";
import { WatchersSVG } from "./svgs/WatchersSVG";
import { ForksSVG } from "./svgs/ForksSVG";
import { StarsSVG } from "./svgs/StarsSVG";
import { FunctionComponent } from "react";

type ResultStatsProps = {
  watchers_count: number;
  forks_count: number;
  stargazers_count: number;
};

export const ResultStats: FunctionComponent<ResultStatsProps> = ({
  watchers_count,
  forks_count,
  stargazers_count,
}) => {
  const numbersParser = (number: number) => {
    if (number > 999) {
      return `${Number.parseFloat((number / 1000).toFixed(1))}k`;
    } else {
      return `${number}`;
    }
  };
  return (
    <View style={[styles.statsContainer, styles.row]}>
      <View style={[styles.row, styles.alignCenter]}>
        <WatchersSVG />
        <Text style={styles.statsLabel}>{numbersParser(watchers_count)}</Text>
      </View>
      <View style={[styles.row, styles.alignCenter]}>
        <ForksSVG />
        <Text style={styles.statsLabel}>{numbersParser(forks_count)}</Text>
      </View>
      <View style={[styles.row, styles.alignCenter]}>
        <StarsSVG />
        <Text style={styles.statsLabel}>{numbersParser(stargazers_count)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsLabel: {
    marginLeft: 6,
    color: "#707070",
  },
  row: {
    flexDirection: "row",
  },
  alignCenter: {
    alignItems: "center",
  },
  statsContainer: {
    gap: 16,
  },
});
