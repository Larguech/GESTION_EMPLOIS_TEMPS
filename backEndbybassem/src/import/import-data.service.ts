import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as fs from 'fs-extra';

@Injectable()
export class ImportDataService {
  async putDataToDb(filePath: string): Promise<boolean> {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Prendre la première feuille
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      console.log('Données extraites :', data);

      // Supposons qu'on enregistre les données dans une base (exemple fictif)
      // await this.databaseService.insertData(data);

      // Supprime le fichier temporaire après traitement
      await fs.remove(filePath);

      return true;
    } catch (error) {
      console.error('Erreur lors du traitement du fichier:', error);
      return false;
    }
  }
}
