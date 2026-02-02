import { Center, Text, Button, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface EmptyStateProps {
    title: string;
    description?: string;
    showBackButton?: boolean;
}

export const EmptyState = ({ title, description, showBackButton = false }: EmptyStateProps) => {
    return (
        <Center h="100vh">
            <Stack align="center" gap="md">
                <Text size="xl" fw={600}>{title}</Text>
                {description && <Text c="dimmed">{description}</Text>}
                {showBackButton && (
                    <Button component={Link} to="/" leftSection={<FaArrowLeft />} variant="subtle">
                        Back to Movies
                    </Button>
                )}
            </Stack>
        </Center>
    );
};
