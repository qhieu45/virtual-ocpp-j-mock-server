const axios = require('axios');

const url = 'http://localhost:3004'

const createNewStation = (identity) => {
    axios.post(`${url}/stations`, {
        identity
    })
}

for (let i = 1; i <= 50; i++) {
    const identity = `VIRTUAL-OCPPJ-STATION-${i}`
    createNewStation(identity)
}