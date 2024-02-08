import './App.css';

import { HeartHandshake } from 'lucide-react';

function App() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-y-2 bg-black/95">
            <div className="flex items-center gap-x-1">
                <HeartHandshake className="h-10 w-10 text-blue-500" />
                <h1 className="text-5xl text-white">
                    <span className="text-orange-500">Sa</span>hy<span className="text-green-500">og</span>
                </h1>
            </div>
            <p className="text-lg text-gray-400">A crowdfunding platform for India</p>
        </div>
    );
}

export default App;
