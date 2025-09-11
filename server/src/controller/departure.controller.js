import DepartureModel from '../models/departure.model.js';
import { geocoder } from '../utils/geocoder.js';

// Get the current date and time
const now = new Date();
const startOfDay = new Date(now.setHours(0, 0, 0, 0));

// @desc Get departures by query
// @route GET api/departures/:departure/:destination/:date
// @access public
export async function getDeparturesHandler(req, res) {
  const { departure, destination = '0', date = '0' } = req.params;
  let destinations = [];

  try {
    // Step 1: Geocode the departure point
    const departureGeo = await geocoder.geocode(departure);
    if (!departureGeo.length) {
      return res.status(400).json({ error: 'Invalid departure point' });
    }

    const departureCoordinates = [
      departureGeo[0].longitude,
      departureGeo[0].latitude,
    ];

    // Step 2: Prepare the date filtering if date is provided
    let dateFilter = {};
    if (date !== '0') {
      const selectedDate = new Date(date);

      // Correct way to handle local timezone by setting hours accordingly
      const startOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0
      );
      const endOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        23,
        59,
        59,
        999
      );

      // Add the date range to the filter in UTC
      dateFilter = {
        departureTime: {
          $gte: startOfDay.toISOString(),
          $lte: endOfDay.toISOString(),
        },
      };
    }

    // Step 3: Query departures by either departureCoordinates or checkPointsCoordinates, with the date filter
    let departures = await DepartureModel.find({
      departureCoordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: departureCoordinates,
          },
          $maxDistance: 90000,
        },
      },
      ...dateFilter,
    }).populate('transporterId', '-password');

    let checkPointsDepartures = await DepartureModel.find({
      'checkPointsCoordinates.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: departureCoordinates,
          },
          $maxDistance: 90000,
        },
      },
      ...dateFilter,
    }).populate('transporterId', '-password');

    // Step 5: Merge results and remove duplicates based on _id
    const mergedDepartures = [...departures, ...checkPointsDepartures].filter(
      (departure, index, self) =>
        index ===
        self.findIndex((d) => d._id.toString() === departure._id.toString())
    );

    // Step 6: If a destination is provided, filter results
    if (destination !== '0') {
      const destinationGeo = await geocoder.geocode(destination);
      if (!destinationGeo.length) {
        return res.status(400).json({ error: 'Invalid destination point' });
      }

      const destinationCoordinates = [
        destinationGeo[0].longitude,
        destinationGeo[0].latitude,
      ];

      // Step 7: Filter departures by destinationCoordinates
      destinations = await DepartureModel.find({
        destinationCoordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: destinationCoordinates,
            },
            $maxDistance: 90000, // Adjust as needed
          },
        },
        ...dateFilter,
      }).populate('transporterId', '-password');
    }

    if (destinations.length > 0) {
      const destinationsSet = new Set(
        destinations.map((destination) => destination._id.toString())
      );

      let finalDepartures = mergedDepartures.filter((departure) =>
        destinationsSet.has(departure._id.toString())
      );

      if (finalDepartures.length === 0) {
        return res.status(404).json({ message: 'No departures found' });
      }

      res.status(200).json({ futurDepartures: finalDepartures });
    } else {
      res.status(200).json({ futurDepartures: mergedDepartures });
    }

    // Step 6: Return the results
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// @desc Get transporters departures
// @route GET api/departures
// @access private
export async function getTransporterDeparturesHandler(req, res) {
  const transporterId = res.locals.user._doc._id;
  const { page = 1, limit = 5 } = req.query;

  try {
    // Query for future departures
    const futurDepartures = await DepartureModel.find({
      transporterId,
      departureTime: { $gte: startOfDay }, // Greater than or equal to the current time
    })
      .sort({ departureTime: 1 }) // Sort by nearest future departure time
      .exec();

    // Query for past departures
    const pastDepartures = await DepartureModel.find({
      transporterId,
      departureTime: { $lt: startOfDay }, // Less than the current time
    })
      .sort({ departureTime: 1 }) // Sort by most recent past departure time
      .exec();

    const paginatedFuturDepartures = futurDepartures.slice(
      (page - 1) * limit,
      page * limit
    );

    const paginatedPastDepartures = pastDepartures.slice(
      (page - 1) * limit,
      page * limit
    );

    const totalFuturPages = Math.ceil(futurDepartures.length / limit);
    const totalPastPages = Math.ceil(pastDepartures.length / limit);

    res.status(200).json({
      currentPage: page,
      AllFuturDepartures: futurDepartures,
      AllPastDepartures: pastDepartures,
      futurDepartures: paginatedFuturDepartures,
      pastDepartures: paginatedPastDepartures,
      totalFuturPages,
      totalPastPages,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// @desc Create a new departures
// @route POST api/departures/new
// @access private
export async function addTransporterDepartureHandler(req, res) {
  const transporterId = res.locals.user._doc._id;
  const { page = 1, limit = 5 } = req.query;

  const departure = req.body;
  console.log('🚀 ~ addTransporterDepartureHandler ~ departure:', departure);

  const newDeparture = await DepartureModel.create({
    ...departure,
    transporterId,
  });

  if (!newDeparture) {
    return res.sendStatus(404);
  }

  const futurDepartures = await DepartureModel.find({
    transporterId,
    departureTime: { $gte: now }, // Greater than or equal to the current time
  })
    .sort({ departureTime: 1 }) // Sort by nearest future departure time
    .exec();

  // Query for past departures
  const pastDepartures = await DepartureModel.find({
    transporterId,
    departureTime: { $lt: now }, // Less than the current time
  })
    .sort({ departureTime: 1 }) // Sort by most recent past departure time
    .exec();

  const paginatedFuturDepartures = futurDepartures.slice(
    (page - 1) * limit,
    page * limit
  );

  const paginatedPastDepartures = pastDepartures.slice(
    (page - 1) * limit,
    page * limit
  );

  const totalFuturPages = Math.ceil(futurDepartures.length / limit);
  const totalPastPages = Math.ceil(pastDepartures.length / limit);

  return res.json({
    totalFuturPages,
    totalPastPages,
    futurDepartures,
    pastDepartures,
    AllFuturDepartures: futurDepartures,
    AllPastDepartures: pastDepartures,
    futurDepartures: paginatedFuturDepartures,
    pastDepartures: paginatedPastDepartures,
  });
}

// @desc Delete a departure
// @route DELETE api/departures/:departureId/delete
// @access private
export async function deleteTransporterDepartureHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const { page = 1, limit = 5 } = req.query;

  const { departureId } = req.params;

  const departure = await DepartureModel.findById(departureId);

  if (!departure) {
    res.status(404).json({ message: 'Depart introuvable' });
  }

  const response = await departure.deleteOne({ _id: departure._id });

  const futurDepartures = await DepartureModel.find({
    transporterId,
    departureTime: { $gte: now }, // Greater than or equal to the current time
  })
    .sort({ departureTime: 1 }) // Sort by nearest future departure time
    .exec();

  // Query for past departures
  const pastDepartures = await DepartureModel.find({
    transporterId,
    departureTime: { $lt: now }, // Less than the current time
  })
    .sort({ departureTime: 1 }) // Sort by most recent past departure time
    .exec();

  const paginatedFuturDepartures = futurDepartures.slice(
    (page - 1) * limit,
    page * limit
  );

  const paginatedPastDepartures = pastDepartures.slice(
    (page - 1) * limit,
    page * limit
  );

  const totalFuturPages = Math.ceil(futurDepartures.length / limit);

  const totalPastPages = Math.ceil(pastDepartures.length / limit);

  if (response.acknowledged && response.deletedCount === 1) {
    res.status(200).json({
      totalFuturPages,
      totalPastPages,
      AllFuturDepartures: futurDepartures,
      AllPastDepartures: pastDepartures,
      futurDepartures: paginatedFuturDepartures,
      pastDepartures: paginatedPastDepartures,
      message: 'suppression effectuée avec sucés',
    });
  }
}

// @desc Update a departure
// @route PUT api/departures/:departureId/update
// @access private
export async function updateTransporterDepartureHandler(req, res) {
  const transporterId = res.locals.user._doc._id;
  const { departureId } = req.params;
  const { page = 1, limit = 5 } = req.query;

  const update = req.body;

  const departure = await DepartureModel.findById(departureId);

  if (!departure) {
    return res.sendStatus(404);
  }

  const updatedDeparture = await DepartureModel.findOneAndUpdate(
    { _id: departureId, transporterId },
    update,
    { new: true }
  );

  if (!updatedDeparture) {
    return res.sendStatus(404);
  }

  const futurDepartures = await DepartureModel.find({
    transporterId,
    departureTime: { $gte: now },
  })
    .sort({ departureTime: 1 })
    .exec();

  // Query for past departures
  const pastDepartures = await DepartureModel.find({
    transporterId,
    departureTime: { $lt: now },
  })
    .sort({ departureTime: 1 })
    .exec();

  const paginatedFuturDepartures = futurDepartures.slice(
    (page - 1) * limit,
    page * limit
  );

  const paginatedPastDepartures = pastDepartures.slice(
    (page - 1) * limit,
    page * limit
  );

  const totalFuturPages = Math.ceil(futurDepartures.length / limit);
  const totalPastPages = Math.ceil(pastDepartures.length / limit);

  return res.json({
    totalFuturPages,
    totalPastPages,
    futurDepartures,
    pastDepartures,
    AllFuturDepartures: futurDepartures,
    AllPastDepartures: pastDepartures,
    futurDepartures: paginatedFuturDepartures,
    pastDepartures: paginatedPastDepartures,
  });
}

// @desc Get transporter next departure
// @route GET api/departures/next/departure
// @access private
export async function getTransporterNextDepartureHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  try {
    // Query for future departures
    const nextDeparture = await DepartureModel.findOne({
      transporterId,
      departureTime: { $gte: startOfDay },
    })
      .sort({ departureTime: 1 })
      .exec();

    if (!nextDeparture) {
      return res.status(404).json({ message: 'No upcoming departures found' });
    }

    res.status(200).json({
      nextDeparture,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
