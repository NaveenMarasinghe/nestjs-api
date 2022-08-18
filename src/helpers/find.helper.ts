interface IModel {
  [key: string]: any;
}

interface IFindOptions<T extends IModel, K> {
  dataset: T[];
  key?: keyof T;
  value?: K;
}

export class InvalidDatasetError extends Error {
  message = 'Dataset cannot be undefined';

  constructor() {
    super();
    super.message = this.message;
  }
}

export class InvalidKeyValuePair extends Error {
  message = 'Key of specified value is undefined';

  constructor() {
    super();
    super.message = this.message;
  }
}

export default function find<T extends IModel, K = any>(
  options: IFindOptions<T, K>,
) {
  const { dataset, key, value } = options;

  if (!dataset) throw new InvalidDatasetError();
  if (!value) return dataset;

  if (!key && value) throw new InvalidKeyValuePair();
  if (key && value) return dataset.filter((datum: T) => datum[key] === value);

  return [];
}
