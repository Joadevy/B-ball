import TeamCard from '@/components/TeamCard/TeamCard';
import { Team } from '../../types';
import teams from '../lib/nba-data.json' assert { type: 'json' };

type season = '2024-2025' | '2023-2024' | '2022-2023';

const getActualSeason = () => {
  const actualYear = new Date().getFullYear();
  return `${actualYear - 1}-${actualYear}` as season;
};

const getNbaTeams = async (season: season, leagueId: string) => {
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
      'x-rapidapi-host': process.env.API_host,
    },
  };

  try {
    const response = await fetch(url, options);
    const result: {
      errors: any[] | { token: string };
      result: number;
      response: Team[];
    } = await response.json().then((data) => data);

    if (!Array.isArray(result.errors)) {
      throw new Error(`${result.errors.token}`);
    }

    console.log(result.response);

    return result.response;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
};

export default async function Home() {
  const NbaTeams: Team[] = teams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1 className="text-4xl font-bold bg-gradient bg-350 bg-0 pb-20 text-gradient">
        NBA SQUADS
      </h1>
      <section className="flex gap-4 flex-wrap items-center justify-center">
        {NbaTeams.map((team: Team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </section>
    </main>
  );
}
