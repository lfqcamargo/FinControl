import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "src",
    workspace: [
      {
        extends: true,
        test: {
          name: "unit",
          dir: "src/domain/use-cases",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/infra/http/controllers",
          environment: "./prisma/vitest-environment/prisma-test-environment.ts",
        },
      },
    ],
  },
});
