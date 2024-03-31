type Country = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

export type Team = {
  id: number;
  name: string;
  national: boolean;
  logo: string | null;
  country: Country;
};
