import fs from 'fs';
import path from 'path';

const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
};

const getImageUrlImport = `import { getImageUrl } from '@/utils/image';\n`;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Handle literal string src="/images/..."
    if (content.includes('src="/images/')) {
      content = content.replace(/src="\/images\/([^"]+)"/g, 'src={getImageUrl(\'/images/$1\')}');
      modified = true;
    }

    // Handle variable src={item.image} or similar.
    // We can use a regex to wrap it.
    // Looking for src={something} where something is not already getImageUrl
    const srcVariableRegex = /src={([^}]+)}/g;
    content = content.replace(srcVariableRegex, (match, p1) => {
      if (!p1.includes('getImageUrl') && !p1.includes('`') && !p1.includes('?')) {
        modified = true;
        return `src={getImageUrl(${p1})}`;
      } else if (p1.includes('?.') && !p1.includes('getImageUrl')) {
        modified = true;
        return `src={getImageUrl(${p1})}`;
      }
      return match;
    });

    if (modified) {
      if (!content.includes('getImageUrl')) {
        // somehow it was modified but getImageUrl is missing (shouldn't happen)
      } else if (!content.includes("from '@/utils/image'") && !content.includes('from "../utils/image"') && !content.includes('from "../../utils/image"')) {
        // Find last import and insert after it
        const importMatches = [...content.matchAll(/^import.*?;?\r?\n/gm)];
        if (importMatches.length > 0) {
          const lastImport = importMatches[importMatches.length - 1];
          const insertIndex = lastImport.index + lastImport[0].length;
          
          // Calculate relative path to src/utils/image
          const depth = filePath.split(path.sep).length - 2; // -1 for src, -1 for filename
          const prefix = depth === 0 ? './' : '../'.repeat(depth);
          const importStr = `import { getImageUrl } from '${prefix}utils/image';\n`;
          
          content = content.slice(0, insertIndex) + importStr + content.slice(insertIndex);
        } else {
          content = `import { getImageUrl } from '@/utils/image';\n` + content;
        }
      }
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
});
