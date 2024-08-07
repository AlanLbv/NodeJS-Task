import fs from 'node:fs';
import { generate } from '../../node_modules/csv-generate/dist/esm/index.js';
import { parse } from '../../node_modules/csv-parse/dist/esm/index.js';

/* Comando para se gerar dados CSV
function generateCsv () {
    // Initialise the parser by generating random records
    return generate({
      high_water_mark: 64 * 64,
      length: 1
    });
}
*/

export const tasksCsv = []

function readCsv(){
  fs.createReadStream('../desafio/tasks.csv')
    .pipe( parse({ delimiter: "," }))
    .on('data', (row) => {
      tasksCsv.push(({}, row));
  })
}

readCsv()
