import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
export { pageSeo, pages } from './config/seo';
export { siteConfig } from './config/siteConfig';

export function renderPage(pathname: string) {
  return renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  );
}
