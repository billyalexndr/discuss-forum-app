import React from 'react';

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
