import { Game, TeamData } from '../../../types';
import Games from './components/Games';
import { caveat } from '../layout';

export const getDateWithDaysAgoFormatYYYYMMDD = (daysAgo: number) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

export const getMatchesOfTeamIdFromTo = async (
  teamId: string,
  sinceDate: string,
  toDate?: string,
) => {
  const schedule: {
    data: Game[];
    meta: {
      per_page: number;
    };
  } = await fetch(
    `${process.env.API_URL}/games?team_ids[]=${teamId}&start_date=${sinceDate}` +
      (toDate ? `&end_date=${toDate}` : ''),
    {
      method: 'GET',
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    },
  ).then((res) => res.json());

  return schedule.data;
};

const getTeamInfo = async (teamId: string) => {
  const team = await fetch(`${process.env.API_URL}/teams/${teamId}`, {
    method: 'GET',
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  }).then((res) => res.json());

  return team;
};

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: teamInfo }: { data: TeamData } = await getTeamInfo(params.id);

  return (
    <div className="py-5 px-5">
      <header>
        <h1
          className={caveat.className + ' text-5xl text-center font-extrabold'}
        >
          {teamInfo.full_name}
        </h1>
      </header>

      {/* @ts-expect-error Async Server Component */}
      <Games teamId={params.id} />
    </div>
  );
};

export default page;
