import '@mantine/core/styles.css';
import { MantineProvider, Container, SimpleGrid, Pagination, Group, Loader, Center } from '@mantine/core';
import { useEffect } from 'react';
import { useMovieStore } from './store/useMovieStore';
import { MovieCard } from './components/MovieCard';

const App = () => {
  const { movies, activePage, totalPages, loading, fetchMovies, setActivePage } = useMovieStore();

  useEffect(() => {
    fetchMovies(activePage);
  }, [activePage, fetchMovies]);

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Movies</h1>

        {loading ? (
          <Center h={400}>
            <Loader size="xl" />
          </Center>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;

