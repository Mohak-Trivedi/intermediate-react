import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { createElement as h } from "react";

// This file is where we mention the client-side code. So, any browser-related code such as Google Analytics, Facebook Pixel, etc. should be added here. This file is not executed on the server-side.

/*
`hydrateRoot` takes existing server-rendered DOM and attaches React event listeners and state management to it without replacing the markup. `createRoot` discards whatever is in the target element and renders your component from scratch.

**hydrateRoot example:**

Server sends:
```html
<div id="root"><h1>Hello</h1></div>
```

Client code:
```javascript
import { hydrateRoot } from 'react-dom/client';
import App from './App';

hydrateRoot(document.getElementById('root'), <App />);
```

React sees the `<h1>Hello</h1>` already there, verifies it matches what `<App />` would render, then layers on interactivity. The markup stays intact.

**createRoot example:**

```javascript
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
```

React completely replaces the contents of `#root` with whatever `<App />` renders, regardless of what was there before.

** Why it matters:** With server - side rendering, the server sends complete HTML so the page displays immediately. `hydrateRoot` lets the client take over that existing markup and make it interactive without a flash of unstyled content or re - rendering.If you used `createRoot` instead, React would tear down the server markup and re - render everything, defeating the performance benefit of SSR.
*/

hydrateRoot(document.getElementById("root"), h(App));
