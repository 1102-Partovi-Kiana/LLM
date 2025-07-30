const fs = require("fs");
const path = require("path");

const baseFolder = path.join(__dirname, "../../../LLM/public/Furniture");
const outputFile = path.join(__dirname, "../data/furniture.json");

const furnitureItems = [];

function walkDirectory(currentPath, relativePathParts = []) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(currentPath, entry.name);
    const newRelativePath = [...relativePathParts, entry.name];

    if (entry.isDirectory()) {
      walkDirectory(entryPath, newRelativePath);
    } else if (entry.isFile() && entry.name.match(/\.(jpg|jpeg|png)$/i)) {
      const id = path.parse(entry.name).name;
      const imageRelativePath = newRelativePath.join("/");

      furnitureItems.push({
        id,
        name: id.replace(/_/g, " "),
        category: relativePathParts[0] || "",
        subCategory: relativePathParts[1] || "",
        image: `/Furniture/${imageRelativePath}`
      });
    }
  }
}

walkDirectory(baseFolder);
fs.writeFileSync(outputFile, JSON.stringify(furnitureItems, null, 2));
console.log(`Generated ${furnitureItems.length} items → ${outputFile}`);
