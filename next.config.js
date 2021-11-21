const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase) => {
    // npm run dev or next dev
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    //npm run build or next build
    const isProd =
        phase === PHASE_PRODUCTION_SERVER && process.env.STAGING !== '1';

    //npm run build or next build
    const isStaging =
        phase === PHASE_PRODUCTION_SERVER && process.env.STAGING === '1';

    const env = {
        MONGO_CONNECTION: (() => {
            if (isDev) return process.env.DEV_DB;
            if (isProd) return process.env.LIVE_DB;
        })(),
    };

    return { env };
};
