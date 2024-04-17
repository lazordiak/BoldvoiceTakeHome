import { FunctionComponent, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, FlatList, Pressable, View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/HomeHeader";
import { SearchBar } from "../components/SearchBar";
import { ResultsCard } from "../components/ResultsCard";
import { GithubData } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { InterText } from "../components/StyledText";

export const HomeScreen: FunctionComponent = () => {
  const [results, setResults] = useState<GithubData[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigation();

  const [scrollY] = useState(new Animated.Value(0));

  const heightHeader = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [136, 68],
    extrapolate: "clamp",
  });

  const translateYHeader = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["#601FEB1A", "#F1F1F1"]}
        locations={[0.0, 0.6]}
      />
      <Animated.View
        style={{
          height: heightHeader,
          transform: [{ translateY: translateYHeader }],
        }}
      >
        <HomeHeader />
        <SearchBar
          query={query}
          setQuery={setQuery}
          setResults={setResults}
          setError={setError}
          scrollY={scrollY}
        />
      </Animated.View>
      <Animated.View style={styles.scrollContainer}>
        {results && (
          <FlatList
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollY } } },
            ])}
            scrollEventThrottle={16}
            data={results}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Result", { ...item, query })
                }
              >
                <ResultsCard
                  avatar={item.avatar_url}
                  description={item.description}
                  name={item.full_name}
                  query={query}
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.full_name}
          />
        )}
        {error ? (
          <View style={styles.errContainer}>
            <InterText style={styles.errorMsg}>Error fetching data!</InterText>
            <InterText style={styles.errorMsg}>{error}</InterText>
          </View>
        ) : null}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  errorMsg: {
    color: "red",
    fontSize: 18,
  },
  errContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
