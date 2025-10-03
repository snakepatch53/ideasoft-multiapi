export function getPart(value, index) {
    if (!value.startsWith('t(') || !value.includes("','") || !value.endsWith(')')) return '';
    const parts = value.split("','");
    const part1 = parts[0].split("t('")[1] || '';
    const part2 = parts[1].split("')")[0] || '';
    return index === 0 ? part1 : part2;
}

export function getPartByLocale(value, locale) {
    const part1 = getPart(value, 0);
    const part2 = getPart(value, 1);
    return locale === 'es' ? part1 : part2;
}

export function getPartsByLocale(value, locale) {
    const regex = /t\('(.*?)','(.*?)'\)/g;
    return value.replace(regex, (match) => getPartByLocale(match, locale));
}
