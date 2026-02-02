import { Badge, Group } from '@mantine/core';

interface GenreBadgesProps {
    genre: string | null | undefined;
}

export const GenreBadges = ({ genre }: GenreBadgesProps) => {
    if (!genre) return null;

    const genres = genre.split(',').map(g => g.trim()).filter(Boolean);

    return (
        <Group gap="xs">
            {genres.map((g) => (
                <Badge key={g} variant="outline" color="blue">
                    {g}
                </Badge>
            ))}
        </Group>
    );
};
