import '@mantine/core/styles.css';
import { MantineProvider, Container, SimpleGrid, Pagination, Group, Loader, Center } from '@mantine/core';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import type { Movie, PaginatedResponse } from './types';
import { MovieCard } from './components/MovieCard';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get<PaginatedResponse<Movie>>(`http://localhost/api/movies?page=${activePage}`);
        setMovies(response.data.data);
        setTotalPages(response.data.pagination.last_page);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [activePage]);

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

