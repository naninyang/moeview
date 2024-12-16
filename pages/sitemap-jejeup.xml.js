const MoeviewAPI = 'https://moe.dev1stud.io/api/sitemap';
// const MoeviewAPI = 'http://localhost:3123/api/sitemap';

function generateSiteMap(moeviews) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${moeviews
        .map(({ idx, created }) => {
          return `
            <url>
              <loc>https://moe.dev1stud.io/${idx}</loc>
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
  const moeviewRequest = await fetch(MoeviewAPI);
  const moeviews = await moeviewRequest.json();
  const sitemap = generateSiteMap(moeviews);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
