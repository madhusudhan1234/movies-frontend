import { Text, Grid } from '@mantine/core';

interface MovieInfoItemProps {
    label: string;
    value: string | number | null | undefined;
}

export const MovieInfoItem = ({ label, value }: MovieInfoItemProps) => {
    return (
        <Grid.Col span={{ base: 12, xs: 6 }}>
            <Text fw={700} size="sm">{label}</Text>
            <Text c="dimmed" size="sm">{value || 'N/A'}</Text>
        </Grid.Col>
    );
};
