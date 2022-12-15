import { StackContext, StaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import path from "path";

export function SiteStack({ stack }: StackContext) {
  const api = use(ApiStack);
  console.log("Creating Site")
  const sitePath = path.resolve(process.cwd() + '/../frontend');
  new StaticSite(stack, "react", {
    path: sitePath,
    buildOutput: "build",
    buildCommand: "npm run build",
  })
};