type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: any[]; // Reemplaza 'any' con el tipo de datos correcto si es conocido
};

type LeagueData = {
  league: League;
};

export type LeagueArray = LeagueData[];