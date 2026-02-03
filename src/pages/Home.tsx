import { Box, Container, Group, Pagination, SimpleGrid, TextInput, Title } from "@mantine/core"
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks"
import { useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { EmptyState, LoadingSpinner } from "@/components/common"
import { MovieCard } from "@/components/MovieCard"
import { useMovieStore } from "@/store/useMovieStore"

const Home = () => {
  const {
    movies,
    activePage,
    totalPages,
    loading,
    searchQuery,
    fetchMovies,
    setActivePage,
    setSearchQuery,
  } = useMovieStore()

  const [debouncedQuery] = useDebouncedValue(searchQuery, 300)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    fetchMovies(activePage, debouncedQuery)
  }, [activePage, debouncedQuery, fetchMovies])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading movies..."/>
    }

    if (!movies.length) {
      return (
        <EmptyState
          title="No movies found"
          description={searchQuery ? `No results for "${searchQuery}"` : "Try again later"}
        />
      )
    }

    return (
      <>
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
        </SimpleGrid>

        <Group justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            size={isMobile ? "sm" : "lg"}
            radius="md"
            withEdges
            siblings={isMobile ? 0 : 1}
            boundaries={1}
          />
        </Group>
      </>
    )
  }

  return (
    <Container size="xl" py="xl" px="md">
      <Title order={1} ta="center" mb="xl">
        Movies
      </Title>

      <TextInput
        placeholder="Search movies..."
        leftSection={<FaSearch/>}
        size={isMobile ? "md" : "lg"}
        radius="md"
        mb="xl"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      />

      <Box mih="60vh">
        {renderContent()}
      </Box>
    </Container>
  )
}

export default Home
