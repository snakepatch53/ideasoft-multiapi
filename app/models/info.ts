import { BaseModel, column, computed } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { InfoType } from '../enums/info_type.js';
import { PATH } from '../enums/resource_path.js';

export default class Info extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare type: InfoType;

    @column()
    declare label: string;

    @column()
    declare field: string;

    @column()
    declare value: string | null;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @computed()
    public get formatted() {
        if (this.type === InfoType.IMAGE) {
            if (!this.value) return `/storage/${PATH.INFO_IMAGE}/${this.field}.webp`;
            else return `/storage/${PATH.INFO_IMAGE}/${this.value}`;
        }
        return this.value;
    }
}
