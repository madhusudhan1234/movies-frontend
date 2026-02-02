import { Text, Grid } from '@mantine/core';

interface MovieInfoItemProps {
    label: string;
    value: string | number | null | undefined;
}

export const MovieInfoItem = ({ label, value }: MovieInfoItemProps) => {
    return (
        <Grid.Col span={6}>
            <Text fw={700}>{label}</Text>
            <Text c="dimmed">{value || 'N/A'}</Text>
        </Grid.Col>
    );
};
