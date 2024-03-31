import { Team } from "../../types";

type season = "2024-2025" | "2023-2024" | "2022-2023"

const getActualSeason = () => {
  const actualYear = new Date().getFullYear();
  return `${actualYear-1}-${actualYear}` as season
}

const getNbaTeams = async (season:season, leagueId: string) => {
    if (!process.env.API_url || !process.env.API_key || !process.env.API_host) {
      throw new Error('API configuration is missing');
    } else if (!season || !leagueId) {
      throw new Error('Year and league are required');
    }

    const url = `${process.env.API_url}/teams?league=${leagueId}&season=${season}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.API_key,
        'x-rapidapi-host': process.env.API_host
      }
    };

    try {
      const response = await fetch(url, options);
      const result:{
        errors: any[] | {token: string},
        result: number,
        response: Team[]
      } = await response.json().then((data) => data);

      if (!Array.isArray(result.errors)) {
        throw new Error(`${result.errors.token}`);
      }

      console.log(result.response)

      return result.response

    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data');
    }
}


export default async function Home() {
  const NbaTeams: Team[] = await getNbaTeams(getActualSeason(), '12');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        NbaTeams.map((team: Team) => (
          <div key={team.id} className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <div className="h-24 w-30 aspect-auto">
              <img className="w-full h-full border" src={team.logo || ''} alt={team.name} />
            </div>
          </div>
        ))
      }
    </main>
  );
}
