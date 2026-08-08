export function parseFrontMatter(rawContent) {
  if (!rawContent || typeof rawContent !== "string") {
    return { metadata: {}, content: "" };
  }

  const normalized = rawContent.replace(/\r\n/g, "\n");

  const match = normalized.match(
    /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  );

  if (!match) {
    return {
      metadata: {},
      content: normalized,
    };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const metadata = {};

  let currentArrayKey = null;

  yamlBlock.split("\n").forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    // Handle YAML arrays:
    // tags:
    //   - Linux
    //   - SSH
    if (trimmed.startsWith("- ") && currentArrayKey) {
      const item = trimmed
        .slice(2)
        .trim()
        .replace(/^['"]|['"]$/g, "");

      if (!Array.isArray(metadata[currentArrayKey])) {
        metadata[currentArrayKey] = [];
      }

      if (item) {
        metadata[currentArrayKey].push(item);
      }

      return;
    }

    const colonIndex = trimmed.indexOf(":");

    if (colonIndex !== -1) {
      const key = trimmed.slice(0, colonIndex).trim();

      const value = trimmed
        .slice(colonIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");

      currentArrayKey = key;

      if (value) {
        metadata[key] = value;
      }
    }
  });

  return {
    metadata,
    content: body,
  };
}


function formatPlatformName(folderName) {
  const map = {
    portswigger: "PortSwigger",
    tryhackme: "TryHackMe",
    ctf: "CTF",
    "bug-bounty": "Bug Bounty",
    pentesting: "Pentesting",
    research: "Research",
  };

  return (
    map[folderName.toLowerCase()] ||
    folderName.charAt(0).toUpperCase() + folderName.slice(1)
  );
}


export function loadAllWriteups() {
  const modules = import.meta.glob("/content/**/*.md", {
    query: "?raw",
    eager: true,
  });

  const writeups = [];

  for (const path in modules) {
    // Ignore non-markdown files
    if (!path.endsWith(".md")) {
      continue;
    }

    const raw =
      typeof modules[path] === "string"
        ? modules[path]
        : modules[path]?.default || "";

    if (!raw.trim()) {
      continue;
    }

    const { metadata, content } = parseFrontMatter(raw);

    // Remove /content/ from the path
    const relativePath = path.replace(/^\/content\//, "");

    // Example:
    // ctf/bandit-level-0.md
    const parts = relativePath.split("/");

    const folder =
      parts.length > 1 ? parts[0] : "general";

    const filename =
      parts[parts.length - 1].replace(/\.md$/, "");

    // Unique IDs
    const fullSlug = relativePath
      .replace(/\.md$/, "")
      .replace(/[\/\\]/g, "-");

    const simpleSlug = filename;

    // Platform
    const defaultPlatform = formatPlatformName(folder);

    const platform =
      metadata.platform || defaultPlatform;

    // Title
    const title =
      metadata.title ||
      filename
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    // Category
    const category =
      metadata.category || platform;

    // Difficulty
    const difficulty =
      metadata.difficulty || "Medium";

    // Date
    const date =
      metadata.date || "2026-08-05";

  
    const order = Number(
      metadata.order ?? 999
    );

    // Tags
    let tags = [];

    if (Array.isArray(metadata.tags)) {
      tags = metadata.tags;
    } else if (typeof metadata.tags === "string") {
      tags = metadata.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    // Default tags
    if (tags.length === 0) {
      tags = [platform, category].filter(Boolean);
    }

    // Reading time
    const wordCount = content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const readTime =
      Math.max(
        1,
        Math.ceil(wordCount / 200)
      ) + " min";

    // Description
    let description =
      metadata.description || "";

    if (!description) {
      const cleanBody = content
        .replace(/#+\s+.*?\n/g, "")
        .trim();

      const firstParagraph =
        cleanBody.split(/\n\n+/)[0] || "";

      description = firstParagraph
        .replace(/[*_`#]/g, "")
        .slice(0, 150);

      if (firstParagraph.length > 150) {
        description += "...";
      }
    }

    // Add writeup
    writeups.push({
      id: fullSlug,
      simpleId: simpleSlug,

      title,
      platform,
      category,
      difficulty,

      date,
      order,

      time: readTime,

      tags,
      description,

      content,

      path: relativePath,
    });
  }

  
  return writeups.sort((a, b) => {
    if (a.order !== b.order) {
      return b.order - a.order;
    }

    return (
      new Date(b.date) -
      new Date(a.date)
    );
  });
}
