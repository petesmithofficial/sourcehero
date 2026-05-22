import { SourceHero } from "../SourceHero";
import { demoHeroProps } from "./demo-data";

export function App() {
  return (
    <main>
      <SourceHero {...demoHeroProps} />
    </main>
  );
}
