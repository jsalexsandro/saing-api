import type { Express } from "express";
import { YoutubeVideoDonwload } from "./api/YoutubeVideoDonwload";

export function Routes(app: Express){
  YoutubeVideoDonwload(app);
}