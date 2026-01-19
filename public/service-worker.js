/**
 * TEMPORARY SERVICE WORKER - FOR CLEANUP ONLY
 * 
 * This service worker is designed to:
 * 1. Delete all existing caches
 * 2. Unregister itself
 * 3. Reload all clients to get fresh content
 * 
 * IMPORTANT: This file should be REMOVED after ~24 hours
 * along with the registration code in Layout.astro
 * 
 * Purpose: Clean up old PWA service workers that are causing caching issues
 */

self.addEventListener("install", () => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      console.log('[SW Cleanup] Starting cleanup process...');
      
      // 1. Delete all caches
      try {
        const keys = await caches.keys();
        console.log('[SW Cleanup] Found caches:', keys);
        await Promise.all(keys.map(k => {
          console.log('[SW Cleanup] Deleting cache:', k);
          return caches.delete(k);
        }));
        console.log('[SW Cleanup] All caches deleted');
      } catch (error) {
        console.error('[SW Cleanup] Error deleting caches:', error);
      }

      // 2. Unregister self
      try {
        await self.registration.unregister();
        console.log('[SW Cleanup] Service worker unregistered');
      } catch (error) {
        console.error('[SW Cleanup] Error unregistering:', error);
      }

      // 3. Reload all clients to get fresh content
      try {
        const clientsList = await self.clients.matchAll();
        console.log('[SW Cleanup] Reloading', clientsList.length, 'clients');
        for (const client of clientsList) {
          client.navigate(client.url);
        }
      } catch (error) {
        console.error('[SW Cleanup] Error reloading clients:', error);
      }
      
      console.log('[SW Cleanup] Cleanup complete');
    })()
  );
});
