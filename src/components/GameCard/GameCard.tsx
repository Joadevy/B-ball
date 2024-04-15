import React from 'react';
import { Game } from '../../../types';
import { Card } from '../ui/card';
import { CalendarDays } from 'lucide-react';

type Props = {
  game: Game;
};

const GameCard = ({ game }: Props) => {
  return (
    <li>
      <Card>
        {game.visitor_team.full_name} vs {game.home_team.full_name}
        <div>
          {game.status === 'Final' ? (
            <div>
              {game.visitor_team_score} - {game.home_team_score}
              {/* {game.visitor_team_score > game.home_team_score ? (
                <div>{game.visitor_team.full_name} won!</div>
              ) : (
                <div>{game.home_team.full_name} won!</div>
              )} */}
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
