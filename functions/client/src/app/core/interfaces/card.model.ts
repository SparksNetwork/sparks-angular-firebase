import { CardItemStatus } from '../enums/card-item-status.enum';

export interface ICard {
    key: string;
    title: string;
    description: string;
    icon?: string;
    status?: CardItemStatus;
}