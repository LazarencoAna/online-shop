const develop = {
    url: {
        MIDDLEWARE: '',
        AUTH: '',
    },
    version: {
        currentVersion: 'v1.0.0',
    },
};

const production = {
    url: {
        MIDDLEWARE: '',
        AUTH: '',
    },
    version: {
        currentVersion: 'v1.0.0',
    },
};

export default process.env.NODE_ENV === 'development' ? develop : production;
