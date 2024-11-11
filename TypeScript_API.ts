import * as fs from 'fs';
import * as path from 'path';

interface GFPCFrame {
  second: number;
  frame: number;
  playerId: string;
  x: number;
  y: number;
  z: number;
}

interface GFPCData {
  [key: string]: GFPCFrame[];
}

function parseGFPCLine(line: string): GFPCFrame | null {
  const match = line.match(/(\d+)-(\d+)_(\w+)_
 $$(x)=(\d+)_(y)=(\d+)_(z)=(\d+)$$ /);
  if (!match) return null;

  return {
    second: parseInt(match[1], 10),
    frame: parseInt(match[2], 10),
    playerId: match[3],
    x: parseInt(match[5], 10),
    y: parseInt(match[7], 10),
    z: parseInt(match[9], 10),
  };
}

function readGFPCFile(filePath: string): GFPCData {
  const data: GFPCData = {};
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line) => {
    const frame = parseGFPCLine(line);
    if (frame) {
      const key = `${frame.second}-${frame.frame}`;
      if (!data[key]) data[key] = [];
      data[key].push(frame);
    }
  });

  return data;
}

function writeGFPCFile(filePath: string, data: GFPCData): void {
  let content = `#[f=Ã¿Ãë¼ÇÂ¼Ö¡Êý]\n`;
  for (const key in data) {
    data[key].forEach((frame) => {
      content += `${key}_${frame.playerId}_[x=${frame.x}_y=${frame.y}_z=${frame.z}]\n`;
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

export { readGFPCFile, writeGFPCFile };
