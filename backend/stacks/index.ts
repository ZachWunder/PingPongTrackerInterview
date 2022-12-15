import { ApiStack } from "./ApiStack";
import { App, use } from "@serverless-stack/resources";
import { DbStack } from "./DbStack";
import { SiteStack } from "./SiteStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },

  });

  app.stack(DbStack).stack(ApiStack).stack(SiteStack);
}
