import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAktu() {
    const response = await axios.get(
        "https://erp.aktu.ac.in/Webpages/Public/Circular/frmCircularForWebsite.aspx?AspxAutoDetectCookieSupport=1",
        {
            headers: {
                Cookie: "AspxAutoDetectCookieSupport=1",
            },
        }
    );

    const $ = cheerio.load(response.data);

    const notices = [];

    $("tr").each((_, row) => {
        const title = $(row)
            .find("span[id*='lblTitle']")
            .text()
            .trim();

        const date = $(row)
            .find("span[id*='lblCreateTs']")
            .text()
            .trim();

        const pdf = $(row)
            .find("a[id*='hlpkAttachment']")
            .attr("href");

        if (title && date && pdf) {
            notices.push({
                university: "aktu",
                title,
                date,
                link: pdf.startsWith("http")
                    ? pdf
                    : `https://erp.aktu.ac.in${pdf}`,
            });
        }
    });

    return notices;
}