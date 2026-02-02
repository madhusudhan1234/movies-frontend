import { Center, Loader, Text, Stack } from '@mantine/core';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
    message?: string;
}

export const LoadingSpinner = ({ fullScreen = false, message }: LoadingSpinnerProps) => {
    const style = fullScreen
        ? {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        }
        : {};

    return (
        <Center h={fullScreen ? '100vh' : '100%'} mih={fullScreen ? undefined : 300} style={style}>
            <Stack align="center" gap="md">
                <Loader size="xl" />
                {message && <Text c="dimmed">{message}</Text>}
            </Stack>
        </Center>
    );
};
