import React from 'react';
import { Team } from '../../../types';
import { Card, CardContent, CardTitle } from '../ui/card';
import Link from 'next/link';

type Props = {
  team: Team;
};

const TeamCard = ({ team }: Props) => {
  return (
    <Link
      href={`/${team.name}`}
      className="hover:opacity-75 transition-opacity"
    >
      <Card className="flex flex-col gap-2 items-center">
        <CardTitle className="">{team.name}</CardTitle>
        <CardContent>
          <div className=" h-24 w-28">
            <img
              className="w-full h-full aspect-square"
              src={team.logo || ''}
              alt={team.name}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TeamCard;
