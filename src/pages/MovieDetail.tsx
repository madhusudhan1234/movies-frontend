import { Anchor, Badge, Box, Button, Container, Divider, Grid, Group, Stack, Text, Title } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useEffect } from "react"
import {
  FaArrowLeft,
  FaBuilding,
  FaCalendar,
  FaClock,
  FaCompactDisc,
  FaDollarSign,
  FaFilm,
  FaFlag,
  FaGlobe,
  FaIdBadge,
  FaLanguage,
  FaStar,
  FaThumbsUp,
  FaTrophy,
} from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import { EmptyState, FavoriteButton, LoadingSpinner } from "../components/common"
import { GenreBadges } from "../components/GenreBadges"
import ImageComponent from "../components/ImageComponent.tsx"
import { MovieInfoItem } from "../components/MovieInfoItem"
import { useMovieStore } from "../store/useMovieStore"

const formatPeople = (people: { full_name: string }[] | undefined): string => {
  if (!people || people.length === 0) return "N/A"
  return people.map(p => p.full_name).join(", ")
}

const formatAwards = (awards: string[] | undefined): string => {
  if (!awards || awards.length === 0) return "N/A"
  return awards.join(", ")
}

const formatBoxOffice = (amount: number | undefined): string => {
  if (!amount) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatNumber = (num: string | undefined): string => {
  if (!num) return "N/A"
  return new Intl.NumberFormat("en-US").format(parseInt(num, 10))
}

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>()
  const { selectedMovie, loading, fetchMovie } = useMovieStore()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (movieId) {
      fetchMovie(movieId)
    }
  }, [movieId, fetchMovie])

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading movie details..."/>
  }

  if (!selectedMovie) {
    return (
      <EmptyState
        title="Movie not found"
        description="The movie you're looking for doesn't exist."
        showBackButton
      />
    )
  }

  return (
    <Container size="xl" py={isMobile ? "md" : "xl"}>
      <Button
        component={Link}
        to="/"
        leftSection={<FaArrowLeft/>}
        variant="subtle"
        mb="xl"
        size="sm"
      >
        Back to Movies
      </Button>

      <Grid gutter={isMobile ? "md" : "xl"}>
        {/* Poster */}
        <Grid.Col span={{ base: 12, sm: 5, md: 4 }}>
          <Box mx="auto" maw={isMobile ? 280 : "100%"}>
            <ImageComponent
              image={selectedMovie.poster}
              alt={selectedMovie.title}
              height={400}/>
          </Box>
        </Grid.Col>

        {/* Details */}
        <Grid.Col span={{ base: 12, sm: 7, md: 8 }}>
          <Stack gap={isMobile ? "md" : "lg"}>
            {/* Title and Favorite */}
            <div>
              <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                <Title order={isMobile ? 2 : 1} style={{ wordBreak: "break-word", flex: 1 }}>
                  {selectedMovie.title}
                </Title>
                <FavoriteButton movieId={selectedMovie.id} size="xl"/>
              </Group>

              {/* Meta Info Badges */}
              <Group mt="xs" gap="md" wrap="wrap">
                <Badge size="lg" color="yellow" leftSection={<FaStar/>}>
                  {selectedMovie.imdb_rating}
                </Badge>
                <Badge size="md" color="teal" variant="light">
                  {selectedMovie.rated}
                </Badge>
                <Badge size="md" color="grape" variant="light">
                  {selectedMovie.type}
                </Badge>
                <Group gap="xs">
                  <FaCalendar color="gray" size={14}/>
                  <Text c="dimmed" size="sm">{selectedMovie.year}</Text>
                </Group>
                <Group gap="xs">
                  <FaClock color="gray" size={14}/>
                  <Text c="dimmed" size="sm">{selectedMovie.runtime}</Text>
                </Group>
              </Group>
            </div>

            {/* Genres */}
            <GenreBadges genres={selectedMovie.genres}/>

            {/* Plot */}
            <div>
              <Text fw={700} size="lg" mb="xs">Plot</Text>
              <Text size="sm">{selectedMovie.plot}</Text>
            </div>

            <Divider/>

            {/* Cast & Crew */}
            <div>
              <Text fw={700} size="lg" mb="md">Cast & Crew</Text>
              <Grid gutter="md">
                <MovieInfoItem label="Directors" value={formatPeople(selectedMovie.directors)}/>
                <MovieInfoItem label="Actors" value={formatPeople(selectedMovie.actors)}/>
                <MovieInfoItem label="Producers" value={formatPeople(selectedMovie.producers)}/>
              </Grid>
            </div>

            <Divider/>

            {/* Ratings & Awards */}
            <div>
              <Text fw={700} size="lg" mb="md">Ratings & Awards</Text>
              <Grid gutter="md">
                <MovieInfoItem
                  label="IMDb Rating"
                  value={`${selectedMovie.imdb_rating}/10 (${formatNumber(selectedMovie.imdb_votes)} votes)`}
                  icon={<FaStar color="gold"/>}
                />
                <MovieInfoItem
                  label="Metascore"
                  value={selectedMovie.metascore}
                  icon={<FaThumbsUp color="green"/>}
                />
                <MovieInfoItem
                  label="Awards"
                  value={formatAwards(selectedMovie.awards)}
                  icon={<FaTrophy color="gold"/>}
                />
              </Grid>
            </div>

            <Divider/>

            {/* Production Details */}
            <div>
              <Text fw={700} size="lg" mb="md">Production Details</Text>
              <Grid gutter="md">
                <MovieInfoItem
                  label="Production"
                  value={selectedMovie.production || "N/A"}
                  icon={<FaBuilding/>}
                />
                <MovieInfoItem
                  label="Box Office"
                  value={formatBoxOffice(selectedMovie.box_office_collection)}
                  icon={<FaDollarSign color="green"/>}
                />
                <MovieInfoItem
                  label="Country"
                  value={selectedMovie.country || "N/A"}
                  icon={<FaFlag/>}
                />
                <MovieInfoItem
                  label="Language"
                  value={selectedMovie.language || "N/A"}
                  icon={<FaLanguage/>}
                />
              </Grid>
            </div>

            <Divider/>

            {/* Release & Media */}
            <div>
              <Text fw={700} size="lg" mb="md">Release & Media</Text>
              <Grid gutter="md">
                <MovieInfoItem
                  label="Released"
                  value={selectedMovie.released || "N/A"}
                  icon={<FaCalendar/>}
                />
                <MovieInfoItem
                  label="DVD Release"
                  value={selectedMovie.dvd || "N/A"}
                  icon={<FaCompactDisc/>}
                />
                <MovieInfoItem
                  label="IMDb ID"
                  value={selectedMovie.imdb_id}
                  icon={<FaIdBadge/>}
                />
                <MovieInfoItem
                  label="Type"
                  value={selectedMovie.type || "N/A"}
                  icon={<FaFilm/>}
                />
              </Grid>
            </div>

            {/* Website */}
            {selectedMovie.website && (
              <>
                <Divider/>
                <Group gap="xs">
                  <FaGlobe color="gray"/>
                  <Anchor href={selectedMovie.website} target="_blank" size="sm">
                    {selectedMovie.website}
                  </Anchor>
                </Group>
              </>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default MovieDetail
