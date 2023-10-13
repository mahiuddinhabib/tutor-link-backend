export type IBookingCreateData = { userId: string; availableServiceId: number };

export type IBookingStatus = 'pending' | 'approved' | 'rejected';