const crypto = require("crypto");

const DEFAULT_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let partitionKey = DEFAULT_PARTITION_KEY;

  if (event) {
    partitionKey =
      event.partitionKey ||
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  if (typeof partitionKey !== "string")
    partitionKey = JSON.stringify(partitionKey);

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH)
    partitionKey = crypto
      .createHash("sha3-512")
      .update(partitionKey)
      .digest("hex");

  return partitionKey;
};
