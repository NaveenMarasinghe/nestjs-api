import find, { InvalidDatasetError, InvalidKeyValuePair } from "./find.helper";

describe("Helper fn(): find", () => {
  describe("Empty dataset", () => {
    it("should return []", () => {
      const result = find({ dataset: [] });

      expect(result).toEqual([]);
    });
  });

  const mockDataset = [
    { id: 1, name: "Cats" },
    { id: 2, name: "Dogs" },
    { id: 3, name: "Mice" },
  ];

  describe("Mock dataset", () => {
    it("should return many objects", () => {
      const result = find({ dataset: mockDataset });

      expect(result).toEqual(mockDataset);
    });
  });

  describe("Specific datum", () => {
    const expectedDataset = [
      {
        id: 2,
        name: "Dogs",
      },
    ];

    it("should return objects that match the key & value pair", () => {
      const result = find({ dataset: mockDataset, key: "name", value: "Dogs" });

      expect(result).toEqual(expectedDataset);
    });
  });

  describe("Undefined dataset", () => {
    it("should throw if dataset is undefined", () => {
      let result;

      try {
        result = find({ dataset: undefined as any });
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidDatasetError);
      }

      expect(result).toBeUndefined();
    });
  });

  describe("Undefined key", () => {
    it("should throw if key is undefined", () => {
      let result;

      try {
        result = find({ dataset: mockDataset, value: "Dog" });
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidKeyValuePair);
      }

      expect(result).toBeUndefined();
    });
  });
});
