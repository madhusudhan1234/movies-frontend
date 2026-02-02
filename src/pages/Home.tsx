import { Container, SimpleGrid, Pagination, Group, Title } from '@mantine/core';
import { useEffect } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import { MovieCard } from '../components/MovieCard';
import { LoadingSpinner, EmptyState } from '../components/common';

const Home = () => {
    const { movies, activePage, totalPages, loading, fetchMovies, setActivePage } = useMovieStore();

    useEffect(() => {
        fetchMovies(activePage);
    }, [activePage, fetchMovies]);

    if (loading) {
        return <LoadingSpinner fullScreen message="Loading movies..." />;
    }

    if (!movies.length) {
        return <EmptyState title="No movies found" description="Try again later" />;
    }

    return (
        <Container size="xl" py="xl">
            <Title order={1} ta="center" mb="xl">
                Movies
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>

            <Group justify="center" mt="xl">
                <Pagination
                    total={totalPages}
                    value={activePage}
                    onChange={setActivePage}
                    size="lg"
                    radius="md"
                    withEdges
                />
            </Group>
        </Container>
    );
};

export default Home;
