import { exec } from 'child_process';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const seedDir = resolve(__dirname);

// Read all files in the seed directory
const files = readdirSync(seedDir);

// Filter out non-seed script files (e.g., directories, non-TS files)
const seedScripts = files.filter(file => file.endsWith('.ts') && file !== 'runAllSeedScripts.ts');

// Execute each seed script
seedScripts.forEach(script => {
    console.log(`Executing seed script: ${script}`);
    exec(`node ${resolve(seedDir, script)}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ${script}:`, error);
            return;
        }
        console.log(stdout);
        if (stderr) {
            console.error(stderr);
        }
    });
});
