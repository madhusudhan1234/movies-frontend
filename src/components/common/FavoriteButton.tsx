import { ActionIcon } from '@mantine/core';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../../hooks/useFavorites';

interface FavoriteButtonProps {
    movieId: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FavoriteButton = ({ movieId, size = 'lg' }: FavoriteButtonProps) => {
    const { isFavorite, toggleFavorite } = useFavorites(movieId);

    const iconSize = {
        sm: 14,
        md: 16,
        lg: 18,
        xl: 22,
    }[size];

    return (
        <ActionIcon
            variant="light"
            size={size}
            radius="md"
            color="red"
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isFavorite ? <FaHeart size={iconSize} /> : <FaRegHeart size={iconSize} />}
        </ActionIcon>
    );
};
