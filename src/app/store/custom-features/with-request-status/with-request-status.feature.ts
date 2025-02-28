import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialRequestStatusSlice } from "./with-request-status.slice";
import { computed } from "@angular/core";

export function withRequestStatus() {
  return signalStoreFeature(
    withState(initialRequestStatusSlice),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    })),
    withMethods((store) => ({
      requestSetPending: () => patchState(store, { requestStatus: 'pending' }),
      requestSetFulfilled: () => patchState(store, { requestStatus: 'fulfilled' }),
      requestSetError: (error: string) => patchState(store, { requestStatus: { error } }),
      requestClearRequest: () => patchState(store, initialRequestStatusSlice),
    }))
  );
}
