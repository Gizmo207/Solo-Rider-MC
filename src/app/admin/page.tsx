'use client'

import { useState } from 'react';
import { seedAllData, seedProducts, seedBlogPosts, seedSpotlights } from '@/lib/seed-data';

export default function AdminSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string>('');

  const handleSeedAll = async () => {
    setIsSeeding(true);
    setSeedStatus('🔥 Starting to seed all data...');
    
    try {
      await seedAllData();
      setSeedStatus('✅ All data seeded successfully! Check your Firestore console.');
    } catch (error) {
      setSeedStatus(`❌ Error seeding data: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    setSeedStatus('🛍️ Seeding products...');
    
    try {
      await seedProducts();
      setSeedStatus('✅ Products seeded successfully!');
    } catch (error) {
      setSeedStatus(`❌ Error seeding products: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedBlogPosts = async () => {
    setIsSeeding(true);
    setSeedStatus('📝 Seeding blog posts...');
    
    try {
      await seedBlogPosts();
      setSeedStatus('✅ Blog posts seeded successfully!');
    } catch (error) {
      setSeedStatus(`❌ Error seeding blog posts: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedSpotlights = async () => {
    setIsSeeding(true);
    setSeedStatus('🏍️ Seeding spotlights...');
    
    try {
      await seedSpotlights();
      setSeedStatus('✅ Spotlights seeded successfully!');
    } catch (error) {
      setSeedStatus(`❌ Error seeding spotlights: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-solo-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-stencil font-bold text-white mb-8">
          🔥 SoloRidersMC Admin - Database Seeder
        </h1>
        
        <div className="bg-solo-steel/10 border border-solo-steel/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-stencil text-white mb-4">Seed Sample Data</h2>
          <p className="text-gray-400 mb-6">
            Use these buttons to populate your Firestore database with sample data for testing and development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleSeedAll}
              disabled={isSeeding}
              className="bg-solo-red hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {isSeeding ? '⏳ Seeding...' : '🔥 Seed All Data'}
            </button>
            
            <button
              onClick={handleSeedProducts}
              disabled={isSeeding}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {isSeeding ? '⏳ Seeding...' : '🛍️ Seed Products Only'}
            </button>
            
            <button
              onClick={handleSeedBlogPosts}
              disabled={isSeeding}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {isSeeding ? '⏳ Seeding...' : '📝 Seed Blog Posts Only'}
            </button>
            
            <button
              onClick={handleSeedSpotlights}
              disabled={isSeeding}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {isSeeding ? '⏳ Seeding...' : '🏍️ Seed Spotlights Only'}
            </button>
          </div>
          
          {seedStatus && (
            <div className="bg-solo-black border border-solo-steel/40 rounded p-4">
              <p className="text-white font-mono text-sm">{seedStatus}</p>
            </div>
          )}
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-lg p-6">
          <h3 className="text-xl font-stencil text-yellow-400 mb-2">⚠️ Important Notes</h3>
          <ul className="text-yellow-200 space-y-2">
            <li>• Make sure your Firebase environment variables are set in <code>.env.local</code></li>
            <li>• Ensure Firestore is enabled in your Firebase Console</li>
            <li>• This will create sample products, blog posts, and rider spotlights</li>
            <li>• You can run this multiple times - it will create new documents each time</li>
            <li>• Check your Firestore console to verify the data was created</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
