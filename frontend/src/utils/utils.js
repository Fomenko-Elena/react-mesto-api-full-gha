export const logAndRethrowErrorHandler = error => {
    console.error(error);
    throw error;
};

export const logErrorHandler = error => {
    console.error(error);
};