export interface LoadingSlice {
  readonly isLoading: boolean;
}

export const initialLoadingSlice: LoadingSlice = {
  isLoading: false,
};
