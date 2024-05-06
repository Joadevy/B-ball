import GameCard from '@/components/GameCard/GameCard';
import React from 'react';
import {
  getDateWithDaysAgoFormatYYYYMMDD,
  getMatchesOfTeamIdFromTo,
} from '../page';
import { isDateFromString } from '@/lib/utils';
import { Game } from '../../../../types';

const FutureGames = async ({
  teamId,
  countGamesPerTeam,
}: {
  teamId: string;
  countGamesPerTeam?: Map<string, number>;
}) => {
  const todayAndFutureGames: Game[] = await getMatchesOfTeamIdFromTo(
    teamId,
    getDateWithDaysAgoFormatYYYYMMDD(1),
  );

  const nextGames = todayAndFutureGames.filter(
    (game) =>
      isDateFromString(game.status) ||
      (game.time !== null && game.time !== 'Final'),
  );

  return (
    <div>
      <h2 className="font-extrabold text-lg">Next games</h2>
      {nextGames.length === 0 ? (
        <p className="italic opacity-75">No games scheduled</p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {nextGames.map((game) => (
            <GameCard
              countGamesPerTeam={countGamesPerTeam}
              key={game.id}
              game={game}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FutureGames;
