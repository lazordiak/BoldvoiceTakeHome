import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Image,
  View,
  Pressable,
  Linking,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ResultStats } from "../components/ResultStats";
import { BackButtonSVG } from "../components/svgs/BackButtonSVG";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { constructNames } from "../utils/constructNames";
import axios from "axios";
import { InterText } from "../components/StyledText";

type ResultPageProps = NativeStackScreenProps<RootStackParamList, "Result">;

export const ResultScreen: FunctionComponent<ResultPageProps> = ({ route }) => {
  const {
    avatar_url,
    full_name,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
    url,
    query,
  } = route.params;

  const cachedConstructNames = useCallback(constructNames, [full_name, query]);

  const navigation = useNavigation();

  const [languages, setLanguages] = useState<string[]>([]);

  const fetchData = async () => {
    const [owner, repo] = full_name.split("/");
    const { data } = await axios.post("http://localhost:4000/languages", {
      owner: owner,
      repo: repo,
    });
    setLanguages(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["#601FEB1A", "#F1F1F1"]}
        locations={[0.0, 0.6]}
      />
      <View>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <BackButtonSVG />
        </Pressable>
        <Image style={styles.logo} source={{ uri: avatar_url }}></Image>
        <View style={styles.row}>
          {cachedConstructNames(query, full_name, styles)}
        </View>
        <ResultStats
          watchers_count={watchers_count}
          stargazers_count={stargazers_count}
          forks_count={forks_count}
        />
        <View style={styles.separator} />
        <InterText style={styles.description}>{description}</InterText>
        <InterText style={styles.languages}>Languages</InterText>
        <FlatList
          data={languages}
          renderItem={({ item }) => <InterText>{item}</InterText>}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={async () => await Linking.openURL(url)}
      >
        <InterText style={styles.buttonText}>Go to Repo</InterText>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  backButton: {
    marginBottom: 24,
  },
  languages: {
    fontWeight: "700",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "space-between",
  },
  logo: {
    width: 78,
    height: 78,
    borderRadius: 50,
  },
  separator: {
    borderColor: "#DDDDDD",
    borderWidth: 1,
    marginVertical: 24,
  },
  button: {
    backgroundColor: "#1F6FEB",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  name: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "500",
  },
  description: {
    marginBottom: 24,
  },
});
