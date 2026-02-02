import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { FavoriteButton } from './common';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Card.Section>
                <Image
                    src={movie.poster}
                    height={180}
                    alt={movie.title}
                    fallbackSrc="https://placehold.co/300x450?text=No+Poster"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs" wrap="nowrap" gap="xs">
                <Text fw={500} truncate="end" style={{ flex: 1, minWidth: 0 }}>
                    {movie.title}
                </Text>
                <Badge color="pink" variant="light" style={{ flexShrink: 0 }}>
                    {movie.imdb_rating}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={3}>
                {movie.plot}
            </Text>

            <Group mt="auto" pt="md" gap="xs">
                <Button
                    component={Link}
                    to={`/movies/${movie.id}`}
                    color="blue"
                    flex={1}
                    radius="md"
                    size="sm"
                >
                    View Details
                </Button>
                <FavoriteButton movieId={movie.id} />
            </Group>
        </Card>
    );
};
