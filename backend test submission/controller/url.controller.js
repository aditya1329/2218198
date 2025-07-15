import { nanoid } from "nanoid";
import { Log } from "../middleware/logger.js";
import { Url } from "../model/url.schema.js";

const BASE_URL = process.env.PORT || "http://localhost:3000";

export const urlShortnerController = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      await Log("backend", "error", "handler", "Original URL is missing");
      return res.status(400).json({ error: "Original URL is required" });
    }

    const url = await Url.findOne({ originalUrl });

    if (url) {
      url.clicks++;
      await url.save();
      await Log(
        "backend",
        "info",
        "handler",
        "Existing URL found, returning shortened URL"
      );
      return res
        .status(200)
        .json({ shorturl: url.shortUrl, clicks: url.clicks });
    }

    const shortId = nanoid(7);
    const shortUrl = `${BASE_URL}/api/${shortId}`;

    const newUrl = new Url({
      originalUrl,
      shortUrl,
    });
    await newUrl.save();
    await Log(
      "backend",
      "info",
      "handler",
      `New short URL created: ${shortUrl}`
    );
    return res.status(201).json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    await Log(
      "backend",
      "fatal",
      "handler",
      `Unexpected error in urlShortnerController: ${error.message}`
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const shortUrl = `${BASE_URL}/api/${shortId}`;

    const urlData = await Url.findOne({
      shortUrl,
    });

    if (!urlData) {
      await Log(
        "backend",
        "error",
        "handler",
        `Short URL not found: ${shortUrl}`
      );
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlData.clicks++;
    await urlData.save();

    await Log(
      "backend",
      "info",
      "handler",
      `Redirected to original URL: ${urlData.originalUrl}`
    );

    res.json({ originalUrl: urlData.originalUrl });
  } catch (err) {
    await Log("backend", "fatal", "handler", `Redirect error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
