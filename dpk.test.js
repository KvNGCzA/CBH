const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const NEWLY_CREATED_HASH = "NEWLY_CREATED_HASH";
const SHORT_STRING_PARTITION_KEY = "SHORT_STRING_PARTITION_KEY";
const NUMBER_PARTITION_KEY = 3424234234;
const OBJECT_PARTITION_KEY = { someKey: { someOtherKey: [] } };
const EVENT_WITH_NO_PARTITION = { someEvent: { someOtherItem: [] } };
const LONG_STRING_PARTITION_KEY = `LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY_LONG_STRING_PARTITION_KEY`;

jest.mock("crypto", () => ({
  ...jest.requireActual("crypto"),
  createHash: jest.fn().mockReturnValue({
    update: () => ({
      digest: () => NEWLY_CREATED_HASH,
    }),
  }),
}));

describe("deterministicPartitionKey", () => {
  describe("No partitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
      const trivialKey = deterministicPartitionKey();

      expect(trivialKey).toBe("0");
    });

    it("Returns a new hash using crypto.createHash when given event with no partitionKey", () => {
      const trivialKey = deterministicPartitionKey(EVENT_WITH_NO_PARTITION);

      expect(trivialKey).toBe(NEWLY_CREATED_HASH);
      expect(crypto.createHash).toHaveBeenCalled();
    });
  });

  describe("With partitionKey", () => {
    it("Returns the same string when given event with a short string partitionKey", () => {
      const trivialKey = deterministicPartitionKey({
        partitionKey: SHORT_STRING_PARTITION_KEY,
      });

      expect(trivialKey).toBe(SHORT_STRING_PARTITION_KEY);
    });

    it("Creates a hash using crypto.createHash when given event with a long string partitionKey", () => {
      const trivialKey = deterministicPartitionKey({
        partitionKey: LONG_STRING_PARTITION_KEY,
      });

      expect(trivialKey).toBe(NEWLY_CREATED_HASH);
      expect(crypto.createHash).toHaveBeenCalled();
    });

    it("Returns a stringified number when given event with a number partitionKey", () => {
      const trivialKey = deterministicPartitionKey({
        partitionKey: NUMBER_PARTITION_KEY,
      });

      expect(trivialKey).toBe(String(NUMBER_PARTITION_KEY));
    });

    it("Returns the stringified object when given event with an object partitionKey", () => {
      const trivialKey = deterministicPartitionKey({
        partitionKey: OBJECT_PARTITION_KEY,
      });
      const expectedResult = JSON.stringify(OBJECT_PARTITION_KEY);

      expect(trivialKey).toBe(expectedResult);
    });
  });
});
