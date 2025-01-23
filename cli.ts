#!/usr/bin/env bun
import { $ } from "bun";
import path from "path";
import fs from "fs";

const templateDir = import.meta.dir;
const projectName = process.argv[2] || "my-radix-tanstack-app";
const targetDir = path.join(process.cwd(), projectName);

// Create project directory
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy template files
const copyTemplate = async () => {
  const templateFiles = fs.readdirSync(templateDir);

  for (const file of templateFiles) {
    const srcPath = path.join(templateDir, file);
    const destPath = path.join(targetDir, file);

    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Initialize project
const initProject = async () => {
  console.log("Creating your Radix UI + TanStack project...");

  await copyTemplate();

  // Change to project directory and install dependencies
  process.chdir(targetDir);
  await $`bun install`;

  console.log(`
Project created successfully! 🎉

To get started:
  cd ${projectName}
  bun dev

Happy coding! 🚀
  `);
};

initProject().catch(console.error);
