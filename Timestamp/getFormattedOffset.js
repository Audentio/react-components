let formattedOffset;
export function getFormattedOffset() {
    if (!formattedOffset) {
        const d = new Date();
        const hours = Math.floor(-d.getTimezoneOffset() / 60);
        const minutes = -d.getTimezoneOffset() % 60;
        formattedOffset = `${hours < 0 ? '-' : '+'}${hours}:${minutes}`;
    }
    return formattedOffset;
}
//# sourceMappingURL=getFormattedOffset.js.map