export default async function handler(req, res) {
  const sharePointUrl =
    "https://sprk-my.sharepoint.com/:u:/g/personal/anna_sprk_gov_lv/IQDyK8alOZRSRLa5GKkv0oAPAatazq48O4soViRVdtYvgkQ";

  try {
    const response = await fetch(sharePointUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Neizdevās nolasīt SharePoint data.json failu",
        status: response.status,
      });
    }

    const data = await response.text();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({
      error: "Servera kļūda, nolasot data.json",
      details: error.message,
    });
  }
}
