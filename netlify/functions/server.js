import { serve } from 'bun';
import app from '../../src/index';

serve({
    fetch: app.fetch,
});
