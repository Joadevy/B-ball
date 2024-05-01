import GameCard from '@/components/GameCard/GameCard';
import React from 'react';
import { Game } from '../../../../types';

type Props = {
  previousGames: Game[];
};

const PreviousGames = async ({ previousGames }: Props) => {
  return (
    <div>
      <h1>Previous games</h1>
      <ul className="grid grid-cols-3 gap-4">
        {previousGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default PreviousGames;
