import { Dispatch, FunctionComponent, useCallback, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Pressable,
  Animated,
} from "react-native";
import { SearchSVG } from "./svgs/SearchSVG";
import { debounce } from "lodash";
import axios from "axios";
import { GithubData } from "../types/types";
import { XSVG } from "./svgs/XSVG";

type SearchBarProps = {
  query: string;
  setQuery: Dispatch<string>;
  setResults: Dispatch<GithubData[]>;
  setError: Dispatch<string>;
  scrollY: Animated.Value;
};

const fetchData = async (
  text: string,
  setResults: Dispatch<GithubData[]>,
  setError: Dispatch<string>,
  setLoading: Dispatch<boolean>
) => {
  try {
    if (text.length > 2) {
      setLoading(true);
      setResults(null);

      const { data } = await axios.post("http://localhost:4000/", {
        query: text,
      });

      setResults(data);
    } else {
      setResults(null);
    }
  } catch (err) {
    setError(err.message);
    console.error(`Error fetching data: ${err}`);
  } finally {
    setLoading(false);
  }
};

const debouncedFetchData = debounce(fetchData, 500);

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  query,
  setResults,
  setQuery,
  setError,
  scrollY,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (text: string) => {
    setQuery(text);
    setError("");
    debouncedFetchData(text, setResults, setError, setLoading);
  };

  const handleClear = () => {
    scrollY.setValue(0);
    setQuery("");
    setResults(null);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <SearchSVG />
        </View>
        <TextInput
          onChangeText={(text) => handleChange(text)}
          value={query}
          style={styles.input}
          clearButtonMode="always"
        />
        {Platform.OS !== "ios" && (
          <Pressable onPress={() => handleClear()} style={styles.cancelButton}>
            <XSVG />
          </Pressable>
        )}
      </View>
      {loading && <ActivityIndicator size="large" color={"#1F6FEB"} />}
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButton: { justifyContent: "center", paddingRight: 18 },
  container: {
    flexDirection: "row",
    marginVertical: 24,
    height: 48,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    paddingHorizontal: 14,
  },
});
