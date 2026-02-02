import { Card, Image, Text, Badge, Button, Group, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import type { Movie } from '../types';

import { storage } from '../lib/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = storage.get<number[]>(STORAGE_KEYS.FAVORITES, []);
        return favorites.includes(movie.id);
    });

    const toggleFavorite = () => {
        const favorites = storage.get<number[]>(STORAGE_KEYS.FAVORITES, []);
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter(id => id !== movie.id);
        } else {
            newFavorites = [...favorites, movie.id];
        }

        storage.set(STORAGE_KEYS.FAVORITES, newFavorites);
        setIsFavorite(!isFavorite);
    };

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
                <Text fw={500} truncate="end" style={{ flex: 1 }}>{movie.title}</Text>
                <Badge color="pink" variant="light">
                    {movie.imdb_rating}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={3}>
                {movie.plot}
            </Text>

            <Group mt="md" gap="xs">
                <Button color="blue" flex={1} radius="md">
                    View Details
                </Button>
                <ActionIcon
                    variant="light"
                    size="lg"
                    radius="md"
                    color="red"
                    onClick={toggleFavorite}
                >
                    {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                </ActionIcon>
            </Group>
        </Card>
    );
}
