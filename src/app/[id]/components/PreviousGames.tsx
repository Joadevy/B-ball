import GameCard from '@/components/GameCard/GameCard';
import React from 'react';
import {
  getDateWithDaysAgoFormatYYYYMMDD,
  getMatchesOfTeamIdFromTo,
} from '../page';
import { Game } from '../../../../types';

type Props = {
  teamId: string;
  sinceDaysAgo: number;
};

const PreviousGames = async ({ teamId, sinceDaysAgo }: Props) => {
  const schedule: Game[] = await getMatchesOfTeamIdFromTo(
    teamId,
    getDateWithDaysAgoFormatYYYYMMDD(sinceDaysAgo),
    getDateWithDaysAgoFormatYYYYMMDD(0),
  ).then((games) => games.filter((game) => game.status === 'Final').reverse());

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
