export interface FilterOptions {
  userId: number;
  isFavorite?: boolean;
  isDropped?: boolean;
  isWatching?: boolean;
  isWatched?: boolean;
  hasRating?: boolean;
  genres?: string[];
  nationalities?: string[];
}
