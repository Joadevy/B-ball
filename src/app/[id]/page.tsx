import React from 'react';
import { Game, TeamData } from '../../../types';
import GameCard from '@/components/GameCard/GameCard';
import PreviousGames from './components/PreviousGames';
import { isDate } from 'util/types';
import { isDateFromString } from '@/lib/utils';
import FutureGames from './components/FutureGames';

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

  console.log(teamInfo);

  return (
    <>
      <header>
        <h1 className="text-3xl text-center font-extrabold">
          {teamInfo.full_name}
        </h1>
      </header>

      {/* @ts-expect-error Async Server Component */}
      <FutureGames teamId={params.id} />

      {/* @ts-expect-error Async Server Component */}
      <PreviousGames teamId={params.id} sinceDaysAgo={7} />
    </>
  );
};

export default page;
