import React from 'react';
import { Game } from '../../../types';
import { Card } from '../ui/card';
import { CalendarDays } from 'lucide-react';

type Props = {
  game: Game;
  countGamesPerTeam?: Map<string, number>;
};

const GameCard = ({ game, countGamesPerTeam }: Props) => {
  return (
    <li>
      <Card className="h-24 p-2 relative">
        {game.time && game.time != 'Final' ? (
          <div className="border rounded-md px-2 py-1 border-orange-400 absolute top-1 right-0">
            Live - {game.time}
          </div>
        ) : null}
        {game.postseason ? (
          <div className="mx-2 text-orange-400 absolute bottom-1 right-0">
            Postseason
          </div>
        ) : null}
        {game.visitor_team.full_name +
          (game.postseason &&
          countGamesPerTeam?.has(String(game.visitor_team.id))
            ? ` (${countGamesPerTeam.get(String(game.visitor_team.id))}) `
            : '')}
        vs{' '}
        {game.home_team.full_name +
          (game.postseason && countGamesPerTeam?.has(String(game.home_team.id))
            ? ` (${countGamesPerTeam.get(String(game.home_team.id))}) `
            : '')}
        <div>
          {game.status === 'Final' || game.time ? (
            <div>
              {game.visitor_team_score} - {game.home_team_score}
            </div>
          ) : null}

          <div className="flex gap-2 items-center">
            <CalendarDays />
            {new Date(game.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </div>
        </div>
      </Card>
    </li>
  );
};

export default GameCard;
