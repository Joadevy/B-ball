import GameCard from '@/components/GameCard/GameCard';
import React from 'react';
import { getDateWithDaysAgoFormatYYYYMMDD, getNextMatchesOf } from '../page';
import { Game } from '../../../../types';

type Props = {
  teamId: string;
  sinceDaysAgo: number;
};

const PreviousGames = async ({ teamId, sinceDaysAgo }: Props) => {
  const schedule: Game[] = await getNextMatchesOf(
    teamId,
    getDateWithDaysAgoFormatYYYYMMDD(sinceDaysAgo),
    getDateWithDaysAgoFormatYYYYMMDD(1),
  );
  return (
    <div>
      <h1>Previous games</h1>
      <ul className="grid grid-cols-3 gap-4">
        {schedule.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default PreviousGames;
