
type year = "2025" | "2024" | "2023"

const getActualYear = () => {
  return new Date().getFullYear().toString() as year
}

const getLeagueStandings = async (year:year, league: string) => {
    if (!process.env.API_url || !process.env.API_key || !process.env.API_host) {
      throw new Error('API configuration is missing');
    } else if (!year || !league) {
      throw new Error('Year and league are required');
    }

    const url = `${process.env.API_url}/standings?season=${year}&league=${league}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_key,
        'X-RapidAPI-Host': process.env.API_host
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json().then((data) => data.response);
      console.log(result);

    } catch (error) {
      console.error(error);
    }
}


export default async function Home() {
  const getArgyLeagueStandings = await getLeagueStandings(getActualYear(), '128');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      asd
    </main>
  );
}
