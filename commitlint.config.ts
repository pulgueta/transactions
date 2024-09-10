import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const config: UserConfig = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "refactor",
        "style",
        "test",
      ],
    ],
    "scope-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["admin", "backend", "marketing", "mobile", "ui"],
    ],
    "body-max-length": [RuleConfigSeverity.Error, "always", 120],
  },
};

export default config;