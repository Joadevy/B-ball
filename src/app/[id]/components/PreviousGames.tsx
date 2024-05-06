import GameCard from '@/components/GameCard/GameCard';
import React from 'react';
import { Game } from '../../../../types';
import { sinceDaysAgo } from './Games';

type Props = {
  previousGames: Game[];
};

const PreviousGames = async ({ previousGames }: Props) => {
  return (
    <div>
      <h2 className="font-extrabold text-lg">Previous games</h2>
      {previousGames.length === 0 ? (
        <p className="italic opacity-75">
          No games played in the last {sinceDaysAgo} days.
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {previousGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreviousGames;
