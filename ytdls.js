
const express = require("express")
const ytdl = require("@distube/ytdl-core")
const axios = require("axios")

const app = express()
const PORT = 3333

const cookies = [
  { name: "VISITOR_INFO1_LIVE", value: "nIadUv8X-so" },
  { name: "VISITOR_PRIVACY_METADATA", value: "CgJQRRIEGgAgYQ%3D%3D" },
  { name: "__Secure-ROLLOUT_TOKEN", value: "CN-F3eH10--yqAEQnLeE14GbjQMY7KKjkY6bjQM%3D" },
  { name: "PREF", value: "tz=America.Lima&f6=40000000&f7=100" },
  { name: "GPS", value: "1" },
  { name: "__Secure-1PSIDTS", value: "sidts-CjUB5H03P1XyXo96aBi2OJ9K4NeWtNWPXpbdmZZ9Yx6sPYwunyLlLXn5XkFyTO4NLArOpgENHRAA" },
  { name: "__Secure-3PSIDTS", value: "sidts-CjUB5H03P1XyXo96aBi2OJ9K4NeWtNWPXpbdmZZ9Yx6sPYwunyLlLXn5XkFyTO4NLArOpgENHRAA" },
  { name: "HSID", value: "Ar0STMYRhfQI_Coy2" },
  { name: "SSID", value: "AUu13aKE0aA07VGN8" },
  { name: "APISID", value: "DXISPEm6S_Aw8Pml/AQ5XkAInT_SK0znhn" },
  { name: "SAPISID", value: "1vmUX-3SkOtk57F4/AUf3ZmnAX3TNyBtdA" },
  { name: "__Secure-1PAPISID", value: "1vmUX-3SkOtk57F4/AUf3ZmnAX3TNyBtdA" },
  { name: "__Secure-3PAPISID", value: "1vmUX-3SkOtk57F4/AUf3ZmnAX3TNyBtdA" },
  { name: "SID", value: "g.a0000giXX-56h7n5TeKabzOR3CljaEzgtvEnF_IFf2cgAMmJ5lmYcUm3Fdi8o_wFTKM6JpSDFQACgYKATMSARISFQHGX2MiwHk-xAWKRP5Xir0aVmdCrRoVAUF8yKr_zFwoRRJmYt2cVAurZHrL0076" },
  { name: "__Secure-1PSID", value: "g.a0000giXX-56h7n5TeKabzOR3CljaEzgtvEnF_IFf2cgAMmJ5lmYJraJSA68SIfzA8oPYAo37AACgYKAdsSARISFQHGX2MiuCxVBAduAmeBHVcCfS3xgRoVAUF8yKq0tQzzowOs6NB6TFx-bx9j0076" },
  { name: "__Secure-3PSID", value: "g.a0000giXX-56h7n5TeKabzOR3CljaEzgtvEnF_IFf2cgAMmJ5lmYvyJtKpbtsF3lNmMA-MNdlAACgYKAbISARISFQHGX2Mi1wyLcmiCNV4w28BuNl1pyRoVAUF8yKoa_9BUb79JNrKLEXrZWwPb0076" },
  { name: "LOGIN_INFO", value: "AFmmF2swRQIgDNSykKqnaXnWo-vV7-5K28GMEGB7v_K_prRw9BEYaVUCIQCRHaIyOaTS9EFzMBCUWlR95pS8l4HIFuOot4cb1yXthQ:QUQ3MjNmel9VUm1RcTNtS2dlSFlNelJEUzVrNmRtbkpCRmRWWnAtVUlrWWVaeEx1ci1GNS1KN2hZcEZtQy0wRmhmdkt0SUtGNzlxZ2VoSGFod3NnNlR5MF8xSS1iYlFlZm9zUjdIdzVFdnZBRXVnTUZmQkxWLTY2REpLMV8yOGlCdGJCRlhtWTI1OHNBMUEzazFVSzJZYUJzaVBLMUxybmVn" },
  { name: "SIDCC", value: "AKEyXzWWWB-orCmArH-3iW3APex7g4mEVpws4vGodExz-JDuxtfHyCK10ejjMHS8KlfA-ytg" },
  { name: "__Secure-1PSIDCC", value: "AKEyXzUG1ivXELX-KC8TlQaN-TSMUy_5FYByCx-0JfFDLSlNoTITW-IYYwHPYDAvmLnnqBvQ9g" },
  { name: "__Secure-3PSIDCC", value: "AKEyXzW4u1oyOmoNTTgn3TsdZyHZoSr-vX0W0X8JkA6tydncKZ6qldRzGJIA712F1tv2oWF8" }
]
var agentOptions = { pipelining: 5, maxRedirections: 0 }
var agent = ytdl.createAgent(cookies, agentOptions)
async function ytdls(url) {
  try {
    var info = await ytdl.getInfo(url, { agent })
    var format18 = info.formats.find(f => f.itag === 18)
    var res = await axios.get(format18.url, { responseType: "arraybuffer" })
    const buffer = Buffer.from(response.data)
    return {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      author: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      bufferLength: buffer.length 
    }
  } catch (err) {
    return null
  }
}

app.get("/video", async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ error: "🚩 Ingresa la *Url* de *YouTube*" })
  const data = await ytdls(url)
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(data))
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
