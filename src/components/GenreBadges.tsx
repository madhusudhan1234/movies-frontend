import { Badge, Group } from '@mantine/core';
import type { Genre } from '../types';

interface GenreBadgesProps {
  genres: Genre[] | null | undefined;
}

export const GenreBadges = ({genres}: GenreBadgesProps) => {
  if (!genres || genres.length === 0) return null;

  return (
    <Group gap="xs" wrap="wrap">
      {genres.map((genre, index) => (
        <Badge key={`${genre.name}-${index}`} variant="outline" color="blue" size="sm">
          {genre.label}
        </Badge>
      ))}
    </Group>
  );
};
