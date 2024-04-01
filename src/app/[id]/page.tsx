import React from 'react';
import { Game } from '../../../types';
import GameCard from '@/components/GameCard/GameCard';
import PreviousGames from './components/PreviousGames';

export const getDateWithDaysAgoFormatYYYYMMDD = (daysAgo: number) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  console.log('date', date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

export const getNextMatchesOf = async (
  teamId: string,
  sinceDate: string,
  toDate?: string,
) => {
  console.log(sinceDate);
  const schedule = await fetch(
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

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const schedule: Game[] = await getNextMatchesOf(
    params.id,
    getDateWithDaysAgoFormatYYYYMMDD(0),
  );

  return (
    <>
      <div>
        <h1>Next games</h1>
        <ul className="grid grid-cols-3 gap-4">
          {schedule.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      </div>

      {/* @ts-expect-error Async Server Component */}
      <PreviousGames teamId={params.id} sinceDaysAgo={7} />
    </>
  );
};

export default page;
