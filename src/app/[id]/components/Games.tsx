import FutureGames from './FutureGames';
import PreviousGames from './PreviousGames';
import {
  getDateWithDaysAgoFormatYYYYMMDD,
  getMatchesOfTeamIdFromTo,
} from '../page';
import { Game } from '../../../../types';

type Props = {
  teamId: string;
};

const sinceDaysAgo = 14;

const Games = async ({ teamId }: Props) => {
  const pastGames: Game[] = await getMatchesOfTeamIdFromTo(
    teamId,
    getDateWithDaysAgoFormatYYYYMMDD(sinceDaysAgo),
    getDateWithDaysAgoFormatYYYYMMDD(0),
  ).then((games) => games.filter((game) => game.status === 'Final').reverse());

  const postSeasonPastGames = pastGames.filter((game) => game.postseason);

  const countGamesPerTeam = pastGames.reduce(
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
    <>
      {/* @ts-expect-error Async Server Component */}
      <FutureGames countGamesPerTeam={countGamesPerTeam} teamId={teamId} />
      {/* @ts-expect-error Async Server Component */}
      <PreviousGames previousGames={pastGames} />
    </>
  );
};

export default Games;