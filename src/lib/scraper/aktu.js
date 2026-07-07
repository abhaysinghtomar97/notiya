import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://aktu.ac.in/circulars.html";

function parseAktuDate(dateString) {
  // Example: 23-Jun-2026

  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const [day, month, year] = dateString.split("-");

  return new Date(
    Number(year),
    months[month],
    Number(day)
  );
}

export async function scrapeAktu() {
  let response;

  for (let i = 1; i <= 3; i++) {
    try {
      response = await axios.get(URL, {
        timeout: 30000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      break;
    } catch (err) {
      console.log(`Retry ${i} failed`);

      if (i === 3) {
        throw new Error("Unable to fetch AKTU Circulars.");
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  const $ = cheerio.load(response.data);

  const notices = [];
  const seenLinks = new Set();

  $("tbody tr").each((_, row) => {
    const tds = $(row).find("td");

    if (tds.length < 5) return;

    const title = tds.eq(2).text().trim();

    const dateText = tds.eq(3).text().trim();

    const href = tds.eq(4).find("a").attr("href");

    if (!title || !dateText || !href) return;

    const link = new URL(href, "https://aktu.ac.in").href;

    // Skip duplicate rows
    if (seenLinks.has(link)) return;
    seenLinks.add(link);

    notices.push({
      university: "aktu",
      title,
      date: parseAktuDate(dateText),
      link,
    });
  });

  return notices;
}