const VideosAPI = 'https://moe.dev1stud.io/api/sitemap';
// const VideosAPI = 'http://localhost:3123/api/sitemap';

function generateSiteMap(videos) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${videos
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
  const videoRequest = await fetch(VideosAPI);
  const videos = await videoRequest.json();
  const sitemap = generateSiteMap(videos);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
