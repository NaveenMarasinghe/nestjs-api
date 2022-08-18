import path from 'path';
import { IProduct } from '../interfaces/IProduct';

interface IAddToJsonOptions {
  dataset?: any;
  id?: number;
  dataFile?: string;
}

export class InvalidDatasetError extends Error {
  message = 'Dataset cannot be undefined';

  constructor() {
    super();
    super.message = this.message;
  }
}

export function addToJson(options: IAddToJsonOptions) {
  const fs = require('fs');
  const { dataset, dataFile } = options;
  if (!dataset) throw new InvalidDatasetError();
  if (!dataFile) throw new Error('JSON file location not found');

  const data = fs.readFileSync(path.resolve(path.resolve(__dirname, dataFile)));
  const dataObject = JSON.parse(data);

  dataObject.push(dataset);

  const newData = JSON.stringify(dataObject);
  fs.writeFile(path.resolve(__dirname, dataFile), newData, (err: any) => {
    if (err) throw err;
  });
  return [];
}

export function updateJson(options: IAddToJsonOptions) {
  const fs = require('fs');
  const { id, dataset, dataFile } = options;
  if (!dataset) throw new InvalidDatasetError();
  if (!dataFile) throw new Error('JSON file location not found');

  const data = fs.readFileSync(path.resolve(path.resolve(__dirname, dataFile)));
  const dataObject = JSON.parse(data);

  const updatedData = dataObject.map((data: IProduct) =>
    data.id === id ? { ...dataset } : data,
  );

  const newData = JSON.stringify(updatedData);
  fs.writeFile(path.resolve(__dirname, dataFile), newData, (err: any) => {
    if (err) throw err;
  });
}

export function deleteJson(options: IAddToJsonOptions) {
  const fs = require('fs');
  const { id, dataFile } = options;
  if (!dataFile) throw new Error('JSON file location not found');

  const data = fs.readFileSync(path.resolve(path.resolve(__dirname, dataFile)));
  const dataObject = JSON.parse(data);

  const updatedData = dataObject.filter((data: IProduct) => data.id !== id);

  const newData = JSON.stringify(updatedData);
  fs.writeFile(path.resolve(__dirname, dataFile), newData, (err: any) => {
    if (err) throw err;
  });
}
