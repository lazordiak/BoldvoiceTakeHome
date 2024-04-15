import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type GithubData = {
  avatar_url: string;
  full_name: string;
  description: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  url: string;
};

export type RootStackParamList = {
  Home: undefined;
  Result: GithubData;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
