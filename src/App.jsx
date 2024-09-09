import { useState } from 'react';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    const apiKey = process.env.REACT_APP_TINYURL_API_KEY; // Fetch API key from environment variables
    const apiUrl = `https://api.tinyurl.com/create?api_token=${apiKey}`;

    try {
      const response = await axios.post(apiUrl, {
        url: longUrl,
        domain: 'tinyurl.com',
      });

      if (response.data.data) {
        const shortUrlData = response.data.data.tiny_url;
        setShortUrl(shortUrlData);
      } else {
        setError('Error shortening the URL. Please try again.');
      }
    } catch (error) {
      console.error('Request Error:', error);
      setError('Request failed. Please check the URL or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Shorten My URL</h1>
          <div className="group relative">
            <a href="https://github.com/alijsx/Shorten-My-URL" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500">
              <FaGithub size={32} />
            </a>
         
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-base font-medium text-gray-700 mb-2">
              Enter your long URL
            </label>
            <input
              type="url"
              id="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg text-white font-bold shadow-md transition duration-300 ease-in-out ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Generate Short URL'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {shortUrl && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">Your shortened URL:</p>
            <div className="flex justify-between items-center mt-4">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold underline break-all"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-700">
        <a href="https://aliaalam.site" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
          Created by Ali Aalam 
        </a>
      </footer>
    </div>
  );
}

export default App;
