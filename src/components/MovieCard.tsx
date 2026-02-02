import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import type { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={movie.poster}
                    height={160}
                    alt={movie.title}
                    fallbackSrc="https://placehold.co/300x450?text=No+Poster"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} truncate="end">{movie.title}</Text>
                <Badge color="pink" variant="light">
                    {movie.imdb_rating}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={3}>
                {movie.plot}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                View Details
            </Button>
        </Card>
    );
}
