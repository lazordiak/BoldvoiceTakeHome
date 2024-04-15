import { FunctionComponent, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, FlatList, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/HomeHeader";
import { SearchBar } from "../components/SearchBar";
import { ResultsCard } from "../components/ResultsCard";
import { GithubData } from "../types/types";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen: FunctionComponent = () => {
  const [results, setResults] = useState<GithubData[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["#601FEB1A", "#F1F1F1"]}
      />
      <HomeHeader />
      <SearchBar
        search={search}
        setSearch={setSearch}
        setResults={setResults}
        setError={setError}
      />
      {results && (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Result", item)}>
              <ResultsCard
                avatar={item.avatar_url}
                description={item.description}
                name={item.full_name}
                query={search}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.full_name}
        />
      )}
      {error ? (
        <View style={styles.errContainer}>
          <Text style={styles.errorMsg}>Error fetching data!</Text>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
