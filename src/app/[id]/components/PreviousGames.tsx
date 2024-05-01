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

  const postSeasonPastGames = schedule.filter((game) => game.postseason);

  const countGamesPerTeam = schedule.reduce(
    (acc: Map<string, number>, game: Game) => {
      if (
        game.visitor_team_score === null ||
        game.home_team_score === null ||
        (acc.size === 2 &&
          (!acc.has(String(game.visitor_team.id)) ||
            !acc.has(String(game.home_team.id))))
      ) {
        return acc;
      }

      if (game.visitor_team_score > game.home_team_score) {
        acc.set(
          String(game.visitor_team.id),
          (acc.get(String(game.visitor_team.id)) || 0) + 1,
        );
      } else {
        acc.set(
          String(game.home_team.id),
          (acc.get(String(game.home_team.id)) || 0) + 1,
        );
      }
      return acc;
    },
    new Map<string, number>(),
  );

  return (
    <div>
      <h1>Previous games</h1>
      <ul className="grid grid-cols-3 gap-4">
        {schedule.map((game) => (
          <GameCard
            countGamesPerTeam={countGamesPerTeam}
            key={game.id}
            game={game}
          />
        ))}
      </ul>
    </div>
  );
};

export default PreviousGames;
