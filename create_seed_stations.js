const axios = require("axios");
const faker = require("faker");

const url = "http://localhost:3004";

const createNewStation = (identity) => {
  axios.post(`${url}/stations`, {
    identity,
    centralSystemUrl: faker.internet.url(),
    meterValue: faker.random.float(),
    chargeInProgress: faker.random.boolean(),
    currentTransactionId: faker.random.number(),
    currentChargingPower: faker.random.number(500),
  });
};

for (let i = 1; i <= 50; i++) {
  const identity = `CHARGEBOX_J_${i}`;
  createNewStation(identity);
}
