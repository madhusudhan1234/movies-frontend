import { Text, Grid, Group } from '@mantine/core';
import type { ReactNode } from 'react';

interface MovieInfoItemProps {
  label: string;
  value: string | number | null | undefined;
  icon?: ReactNode;
}

export const MovieInfoItem = ({label, value, icon}: MovieInfoItemProps) => {
  return (
    <Grid.Col span={{base: 12, xs: 6}}>
      <Group gap="xs" wrap="nowrap" align="flex-start">
        {icon && <span style={{marginTop: 2}}>{icon}</span>}
        <div>
          <Text fw={700} size="sm">{label}</Text>
          <Text c="dimmed" size="sm">{value || 'N/A'}</Text>
        </div>
      </Group>
    </Grid.Col>
  );
};
