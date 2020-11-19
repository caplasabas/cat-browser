import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 99999 * 99999999 * 1000,
  clearOnStale: true,
  invalidate: async (config, request) => {

    if (request.data && typeof request.data === 'string') {
      let data = JSON.parse(request.data);
  
      if (data.clearCacheEntry) {
        await config.store.removeItem(config.uuid);
      }

      if (data.purgeCache) {
        config.store.store = {};
      }
    }
  }
});

const api_url = (process.env.NODE_ENV === 'development') ? 'https://api.thecatapi.com/v1/' : 'https://api.thecatapi.com/v1/';

const API = () => {
    return axios.create({
      baseURL: api_url,
      adapter: cache.adapter,
      headers: {
        'x-api-key': '8b905531-7b94-4b26-a8fe-08039ec816b4'
      }
    });
};

export default API;
