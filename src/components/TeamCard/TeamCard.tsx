import React from 'react';
import { Team } from '../../../types';

type Props = {
  team: Team;
};

const TeamCard = ({ team }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{team.name}</h1>
      <div className="h-24 w-30 aspect-auto">
        <img
          className="w-full h-full border"
          src={team.logo || ''}
          alt={team.name}
        />
      </div>
    </div>
  );
};

export default TeamCard;
