import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Image, Text, Button, Group, Badge, Stack, Title, Grid, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FaArrowLeft, FaStar, FaCalendar, FaClock } from 'react-icons/fa';
import { useMovieStore } from '../store/useMovieStore';
import { LoadingSpinner, EmptyState, FavoriteButton } from '../components/common';
import { GenreBadges } from '../components/GenreBadges';
import { MovieInfoItem } from '../components/MovieInfoItem';

const MovieDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { selectedMovie, loading, fetchMovie } = useMovieStore();
    const isMobile = useMediaQuery('(max-width: 768px)');

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
        <Container size="xl" py={isMobile ? 'md' : 'xl'}>
            <Button
                component={Link}
                to="/"
                leftSection={<FaArrowLeft />}
                variant="subtle"
                mb="xl"
                size="sm"
            >
                Back to Movies
            </Button>

            <Grid gutter={isMobile ? 'md' : 'xl'}>
                {/* Poster */}
                <Grid.Col span={{ base: 12, sm: 5, md: 4 }}>
                    <Box mx="auto" maw={isMobile ? 280 : '100%'}>
                        <Image
                            src={selectedMovie.poster}
                            alt={selectedMovie.title}
                            radius="md"
                            fallbackSrc="https://placehold.co/300x450?text=No+Poster"
                        />
                    </Box>
                </Grid.Col>

                {/* Details */}
                <Grid.Col span={{ base: 12, sm: 7, md: 8 }}>
                    <Stack gap={isMobile ? 'md' : 'lg'}>
                        {/* Title and Favorite */}
                        <div>
                            <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                                <Title order={isMobile ? 2 : 1} style={{ wordBreak: 'break-word', flex: 1 }}>
                                    {selectedMovie.title}
                                </Title>
                                <FavoriteButton movieId={selectedMovie.id} size="xl" />
                            </Group>

                            {/* Meta Info */}
                            <Group mt="xs" gap="md" wrap="wrap">
                                <Badge size="lg" color="yellow" leftSection={<FaStar />}>
                                    {selectedMovie.imdb_rating}
                                </Badge>
                                <Group gap="xs">
                                    <FaCalendar color="gray" size={14} />
                                    <Text c="dimmed" size="sm">{selectedMovie.year}</Text>
                                </Group>
                                <Group gap="xs">
                                    <FaClock color="gray" size={14} />
                                    <Text c="dimmed" size="sm">{selectedMovie.runtime}</Text>
                                </Group>
                            </Group>
                        </div>

                        {/* Genres */}
                        <GenreBadges genre={selectedMovie.genre} />

                        {/* Plot */}
                        <div>
                            <Text fw={700} size="lg" mb="xs">Plot</Text>
                            <Text size="sm">{selectedMovie.plot}</Text>
                        </div>

                        {/* Additional Info */}
                        <Grid gutter="md">
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
