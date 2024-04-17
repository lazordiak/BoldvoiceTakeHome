import { InterText } from "../components/StyledText";

export const constructNames = (query: string, name: string, styles) => {
  const regex = new RegExp(`(${query})`, "gi");
  const splitString = name.split(regex);
  return splitString.map((substring, i) => {
    if (substring.toLowerCase() === query.toLowerCase()) {
      return (
        <InterText
          numberOfLines={1}
          key={i}
          style={[styles.name, { fontWeight: "700" }]}
        >
          {substring}
        </InterText>
      );
    } else {
      return (
        <InterText numberOfLines={1} key={i} style={styles.name}>
          {substring}
        </InterText>
      );
    }
  });
};
