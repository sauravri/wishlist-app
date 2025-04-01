import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productUrl = searchParams.get("url");

  if (!productUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const response = await fetch(productUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Example selectors (Modify these based on the website structure)
    const productName = $("meta[property='og:title']").attr("content") || $("title").text();

    const productImage = $("meta[property='og:image']").attr("content");

    const productBrand = $("meta[property='og:site_name']").attr("content");

    const productPrice = $("meta[property='og:price-info']").attr("content");

    return NextResponse.json({ productName, productImage, productBrand, productPrice });
  } 
  catch {
    return NextResponse.json({ error: "Failed to fetch product details" }, { status: 500 });
  }
}
