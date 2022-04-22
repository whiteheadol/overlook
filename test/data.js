let customers = [
  {
    id: 1,
    name: "Leatha Ullrich"
  },
  {
    id: 2,
    name: "Rocio Schuster"
  },
  {
    id: 3,
    name: "Kelvin Schiller"
  }
];

let bookings = [
  {
    id: "5fwrgu4i7k55hl6t8",
    userID: 1,
    date: "2022/02/05",
    roomNumber: 12
  },
  {
    id: "5fwrgu4i7k55hl6uf",
    userID: 2,
    date: "2022/01/09",
    roomNumber: 18
  },
  {
    id: "5fwrgu4i7k55hl6uy",
    userID: 2,
    date: "2022/01/24",
    roomNumber: 19
  }
];

let rooms = [
  {
    number: 12,
    roomType: "single room",
    bidet: false,
    bedSize: "twin",
    numBeds: 2,
    costPerNight: 172.09
  },
  {
    number: 18,
    roomType: "junior suite",
    bidet: false,
    bedSize: "king",
    numBeds: 2,
    costPerNight: 496.41
  },
  {
    number: 19,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 374.67
  }
];


export {customers, bookings, rooms};
