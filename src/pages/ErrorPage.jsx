const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="mb-8 text-primary">
                <svg className="w-64 h-64 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-wrap">
                Oops! Page Not Found 404
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
                We can't find the page you're looking for. It might have been moved or the deal has ended.
            </p>

            <a href="/" className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md">
                Back to Home
            </a>
        </div>
    );
};

export default ErrorPage;