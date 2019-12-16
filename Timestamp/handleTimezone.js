import { cookies } from '@audentio/utils/src/cookies';
let savedTimezone;
let timezone_read = false;
export function handleTimezone(formattedTime) {
    if (timezone_read) {
        savedTimezone = cookies.getItem('timezone');
        timezone_read = true;
    }
    let userTimezone;
    try {
        userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    catch (e) {
        // no Intl :(
    }
    if (savedTimezone !== userTimezone) {
        // TODO: @tushar fix
        // return `${formattedTime} (UTC ${getFormattedOffset()})`;
    }
    return formattedTime;
}
//# sourceMappingURL=handleTimezone.js.map