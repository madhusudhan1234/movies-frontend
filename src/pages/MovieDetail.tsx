import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Image, Text, Button, Group, Badge, Stack, Title, Grid } from '@mantine/core';
import { FaArrowLeft, FaStar, FaCalendar, FaClock } from 'react-icons/fa';
import { useMovieStore } from '../store/useMovieStore';
import { LoadingSpinner, EmptyState, FavoriteButton } from '../components/common';
import { GenreBadges } from '../components/GenreBadges';
import { MovieInfoItem } from '../components/MovieInfoItem';

const MovieDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { selectedMovie, loading, fetchMovie } = useMovieStore();

    useEffect(() => {
        if (movieId) {
            fetchMovie(movieId);
        }
    }, [movieId, fetchMovie]);

    if (loading) {
        return <LoadingSpinner fullScreen message="Loading movie details..." />;
    }

    if (!selectedMovie) {
        return (
            <EmptyState
                title="Movie not found"
                description="The movie you're looking for doesn't exist."
                showBackButton
            />
        );
    }

    return (
        <Container size="xl" py="xl">
            <Button
                component={Link}
                to="/"
                leftSection={<FaArrowLeft />}
                variant="subtle"
                mb="xl"
            >
                Back to Movies
            </Button>

            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Image
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        radius="md"
                        fallbackSrc="https://placehold.co/300x450?text=No+Poster"
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="lg">
                        {/* Title and Meta */}
                        <div>
                            <Group justify="space-between" align="flex-start">
                                <Title order={1}>{selectedMovie.title}</Title>
                                <FavoriteButton movieId={selectedMovie.id} size="xl" />
                            </Group>

                            <Group mt="xs" gap="md">
                                <Badge size="lg" color="yellow" leftSection={<FaStar />}>
                                    {selectedMovie.imdb_rating}
                                </Badge>
                                <Group gap="xs">
                                    <FaCalendar color="gray" />
                                    <Text c="dimmed">{selectedMovie.year}</Text>
                                </Group>
                                <Group gap="xs">
                                    <FaClock color="gray" />
                                    <Text c="dimmed">{selectedMovie.runtime}</Text>
                                </Group>
                            </Group>
                        </div>

                        {/* Genres */}
                        <GenreBadges genre={selectedMovie.genre} />

                        {/* Plot */}
                        <div>
                            <Text fw={700} size="lg" mb="xs">Plot</Text>
                            <Text>{selectedMovie.plot}</Text>
                        </div>

                        {/* Additional Info */}
                        <Grid>
                            <MovieInfoItem label="Director" value={selectedMovie.director} />
                            <MovieInfoItem label="Actors" value={selectedMovie.actors} />
                            <MovieInfoItem label="Awards" value={selectedMovie.awards} />
                            <MovieInfoItem label="Box Office" value={selectedMovie.box_office} />
                        </Grid>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default MovieDetail;
