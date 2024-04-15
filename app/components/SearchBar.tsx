import { Dispatch, FunctionComponent, useCallback, useState } from "react";
import { TextInput, View, StyleSheet, ActivityIndicator } from "react-native";
import { SearchSVG } from "./svgs/SearchSVG";
import { debounce } from "lodash";
import axios from "axios";
import { GithubData } from "../types/types";

type SearchBarProps = {
  search: string;
  setSearch: Dispatch<string>;
  setResults: Dispatch<GithubData[]>;
  setError: Dispatch<string>;
};

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  search,
  setResults,
  setSearch,
  setError,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (text: string) => {
    try {
      setSearch(text);
      if (text.length > 2) {
        setLoading(true);
        setResults(null);
        setError("");

        const { data } = await axios.post("http://localhost:4000/", {
          query: text,
        });

        setResults(data);
        setLoading(false);
      } else {
        setError("");
        setResults(null);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error(`Error fetching data: ${err}`);
    }
  };

  const handler = useCallback(debounce(handleChange, 500), [search]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <SearchSVG />
        </View>
        <TextInput
          onChangeText={(text) => handler(text)}
          defaultValue={search}
          style={styles.input}
        />
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={"#1F6FEB"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  spinner: {},
});
