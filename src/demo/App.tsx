import { ShowcaseHero } from "../ShowcaseHero";
import { demoHeroProps } from "./demo-data";

export function App() {
  return (
    <main>
      <ShowcaseHero {...demoHeroProps} />
    </main>
  );
}
