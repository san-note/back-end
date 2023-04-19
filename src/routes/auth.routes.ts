import * as config from "@@config/endPoint";
import axios from "axios";
import env from "dotenv";
import express, { Request, Response, Router } from "express";

env.config();

const router: Router = express.Router();

router.get(config.endPoint.auth.getUser, (req: Request, res: Response) => {
  res.json({
    url: "/auth/getUser",
  });
});

router.get(config.endPoint.auth.login, async (req: Request, res: Response) => {
  const code = req.query.code;

  console.log("code >>", code);

  const token = await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "Content-Type": " application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "authorization_code",
      client_id: "fd681b549948019be1d8a36d245c5b6c",
      code: code,
      client_secret: "Qbk8fdtwchuVL7Hg8Zzd6a4PXXmyRT8U",
    },
  });

  console.log("token >", token);

  return res.json({ success: true });
});

router.post("/logout", async function (req: Request, res: Response) {
  res.clearCookie("A12Ba5os9");

  return res.send({ success: true });
});

export default router;
