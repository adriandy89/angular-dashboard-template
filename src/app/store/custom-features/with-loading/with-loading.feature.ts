import { patchState, signalStoreFeature, SignalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { LoadingSlice, initialLoadingSlice } from "./with-loading.slice";
import { computed, Signal } from "@angular/core";

// export function withLoading(): SignalStoreFeature<{
//   state: {},
//   props: {},
//   methods: {}
// }, {
//   state: LoadingSlice,
//   props: {
//     isLoading: Signal<boolean>,
//   },
//   methods: {}
// }>;
export function withLoading() {
  return signalStoreFeature(
    withState(initialLoadingSlice),
    withComputed(store => ({
      isLoading: computed(() => !store.isLoading)
    })),
    withMethods((store) => ({
      setLoading: (status: boolean) => patchState(store, { isLoading: status }),
      toggleLoading: () => patchState(store, { isLoading: !store.isLoading }),
    }))
  )
}
