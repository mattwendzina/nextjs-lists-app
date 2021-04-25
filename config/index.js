const dev = process.env.NODE_ENV !== 'production';

export const server = dev
    ? 'http://localhost:3000'
    : 'https://mw-listsapp.vercel.app/';
