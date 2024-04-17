export type GithubData = {
  avatar_url: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  url: string;
};

type ResultScreenData = GithubData & { query: string };

export type RootStackParamList = {
  Home: undefined;
  Result: ResultScreenData;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
