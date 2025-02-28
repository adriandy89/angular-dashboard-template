export type RequestStatus = 'idle' | 'pending' | 'fulfilled' | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export const initialRequestStatusSlice: RequestStatusState = {
  requestStatus: 'idle'
};
