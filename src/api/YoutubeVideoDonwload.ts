import type { Express } from "express";
import ytdl, { getInfo } from "ytdl-core";

export function YoutubeVideoDonwload(app: Express){
  app.get("/youtube-video-download",async (req, res) => {
    let url = req.query.url as string;
    let quality = String(req.query.quality).toLocaleLowerCase()

    if (!url)  {
      return res.status(400).json({ error:"url not found" })
    }

    // if (quality == "highest"){
    //   quality = "hd1080"
    // } else if (quality == "lowest"){
    //   quality = "hd720"
    // } else {
    //     return res.status(400).json({ error:"quality not found" })

    // }

    if (!(quality == "lowest" || quality == "highest")) {
      return res.status(400).json({ error:"quality not found" })
    }

    // 'lowest' | 'highest' 
    // | 'highestaudio' | 'lowestaudio' | 'highestvideo' | 'lowestvideo' 


    const infos = await getInfo(url)
    const author = infos.videoDetails.author.name
    const title = infos.videoDetails.title
    // const format = ytdl.chooseFormat(infos.formats, { filter:e => e.quality == quality })
    const format = ytdl.chooseFormat(infos.formats, { quality })
    

    const filename = `[${author}] ${title}.mp4`.replaceAll(" ","-")
    res.writeHead(200, {
        'Content-Disposition':`attachment; filename="${filename}`,
        'Content-Transfer-Encoding': 'binary',
        'Content-Type': 'application/octet-stream',
        "Content-Length":`${format.contentLength}`
    });

    // res.send({ size:format.contentLength })
    await ytdl(url, { quality, format }).pipe(res)
  })
}