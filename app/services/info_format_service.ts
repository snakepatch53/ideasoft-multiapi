import Info from '#models/info';

export class InfoFormatService {
    private static infos: Info[] | null = null;

    public static async format(infos: Info[] | null = null, withCredentials: boolean = false): Promise<[Info[], Record<string, any>]> {
        if (infos !== null) return this.prepare(infos, withCredentials);
        if (this.infos !== null) return this.prepare(this.infos, withCredentials);
        return this.prepare(await Info.all(), withCredentials);
    }

    private static prepare(infos: Info[], withCredentials: boolean = false): [Info[], Record<string, any>] {
        infos.forEach((info) => {
            if (info.type === 'credential' && !withCredentials) {
                info.value = null;
            }
        });

        const formattedInfo = infos.reduce(
            (acc, info) => {
                acc[info.field] = info.formatted;
                return acc;
            },
            {} as Record<string, any>
        );

        return [infos, formattedInfo];
    }
}
