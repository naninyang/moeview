const JejeupAPI = 'https://semo.dev1stud.io/api/sitemapAmusement';
// const JejeupAPI = 'http://localhost:3123/api/sitemapAmusement';

function generateSiteMap(jejeups) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${jejeups
        .map(({ idx, created }) => {
          return `
            <url>
              <loc>https://semo.dev1stud.io/${idx}</loc>
              <lastmod>${created}</lastmod>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const jejeupRequest = await fetch(JejeupAPI);
  const jejeups = await jejeupRequest.json();
  const sitemap = generateSiteMap(jejeups);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
