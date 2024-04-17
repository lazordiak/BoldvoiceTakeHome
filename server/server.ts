import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_KEY,
});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

app.post("/", async (req: Request, res: Response) => {
  try {
    const { data } = await octokit.request("GET /search/repositories", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 20,
      q: req.body.query,
    });
    const parsedResponse = data.items.map((item) => {
      return {
        avatar_url: item.owner?.avatar_url,
        full_name: item.full_name,
        description: item.description,
        stargazers_count: item.stargazers_count,
        watchers_count: item.watchers_count,
        forks_count: item.forks_count,
        url: item.html_url,
      };
    });
    res.json(parsedResponse);
  } catch (err) {
    console.error("An error: " + err);
    res.json(err);
  }
});

app.post("/languages", async (req: Request, res: Response) => {
  try {
    const { data } = await octokit.request(
      `GET /repos/${req.body.owner}/${req.body.repo}/languages`,
      {
        owner: req.body.owner,
        repo: req.body.repo,
      }
    );
    res.json(Object.keys(data));
  } catch (err) {
    console.error("An error: " + err);
    res.json(err);
  }
});

app.use((req, res: Response, next: NextFunction) => {
  res.status(500).send("It is broken... 500 error.");
  next();
});

app.use((req, res: Response) => {
  res.status(404).send("404 error here!!");
});

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
