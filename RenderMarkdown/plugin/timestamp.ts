/* eslint-disable no-param-reassign */

const regexp = /^{TS:(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2})}(?:\(([^)]+)\))?/;

function parse(state, silent) {
    const match = regexp.exec(state.src.slice(state.pos));
    if (!match) return false;

    // valid match found, now we need to advance cursor
    state.pos += match[0].length;

    // don't insert any tokens in silent mode
    if (silent) return true;

    const token = state.push('timestamp', 'time', 0);
    token.content = match[1];
    token.props = {
        format: match[2],
    };

    return true;
}

export default function timestampPlugin(md) {
    md.inline.ruler.push('timestamp', parse);
}
