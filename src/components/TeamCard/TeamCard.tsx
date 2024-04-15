/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Team } from '../../../types';
import Link from 'next/link';

type Props = {
  team: Team;
};

const TeamCard = ({ team }: Props) => {
  return (
    <Link href={`/${team.id}`} className="hover:opacity-75 transition-opacity">
      <div className="flex items-center justify-center bg-secondary rounded-md border border-orange-300 p-4">
        <div className="h-24 w-28">
          <img
            className="w-full h-full aspect-square"
            src={team.logo || ''}
            alt={team.name}
          />
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
