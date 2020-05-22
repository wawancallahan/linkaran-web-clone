export enum FeedbackSenderEnum {
    DRIVER = 'driver',
    COSTUMER = 'costumer',
  }

export type TransactionFeedback = {
    id: number,
    rating: number,
    tip: number | null,
    description: string,
    from: FeedbackSenderEnum,
}