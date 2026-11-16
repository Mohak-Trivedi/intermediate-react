import { createElement as h, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return h(
    "div",
    null,
    h("h1", null, "Hello from React SSR!"),
    h("p", null, "This is ssr."),
    h("button", { onClick: () => setCount(count + 1) }, `Count: ${count}`),
  );
}

export default App;
