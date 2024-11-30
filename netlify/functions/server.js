const { serve } = require('bun');

serve({
    fetch(req) {
        return new Response('Hello from Bun!');
    },
});
