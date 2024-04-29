import GameCard from '@/components/GameCard/GameCard';
import React from 'react';
import {
  getDateWithDaysAgoFormatYYYYMMDD,
  getMatchesOfTeamIdFromTo,
} from '../page';
import { isDateFromString } from '@/lib/utils';
import { Game } from '../../../../types';

const FutureGames = async ({ teamId }: { teamId: string }) => {
  const todayAndFutureGames: Game[] = await getMatchesOfTeamIdFromTo(
    teamId,
    getDateWithDaysAgoFormatYYYYMMDD(1),
  );
  console.log(todayAndFutureGames);

  const nextGames = todayAndFutureGames.filter(
    (game) =>
      isDateFromString(game.status) ||
      (game.time !== null && game.time !== 'Final'),
  );

  // console.log({ nextGamess });
  const liveGame = todayAndFutureGames.filter((game) => game.time !== null);
  return (
    <div>
      <h2>Next games</h2>
      <ul className="grid grid-cols-3 gap-4">
        {nextGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default FutureGames;
