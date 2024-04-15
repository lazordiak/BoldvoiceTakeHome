import { FunctionComponent } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  StyleSheet,
  Image,
  View,
  Pressable,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ResultStats } from "../components/ResultStats";
import { BackButtonSVG } from "../components/svgs/BackButtonSVG";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type ResultPageProps = NativeStackScreenProps<RootStackParamList, "Result">;

export const ResultScreen: FunctionComponent<ResultPageProps> = ({ route }) => {
  const {
    avatar_url,
    full_name,
    description,
    language,
    stargazers_count,
    watchers_count,
    forks_count,
    url,
  } = route.params;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["#601FEB1A", "#F1F1F1"]}
      />
      <View>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <BackButtonSVG />
        </Pressable>
        <Image style={styles.logo} source={{ uri: avatar_url }}></Image>
        <Text style={styles.name}>{full_name}</Text>
        <ResultStats
          watchers_count={watchers_count}
          stargazers_count={stargazers_count}
          forks_count={forks_count}
        />
        <View style={styles.separator} />
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.languages}>Languages</Text>
        <Text>{language}</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={async () => await Linking.openURL(url)}
      >
        <Text style={styles.buttonText}>Go to Repo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
