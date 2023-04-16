import Hall from "../models/Hall.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createHall = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newHall = new Hall(req.body);

  try {
    const savedHall = await newHall.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { halls: savedHall._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedHall);
  } catch (err) {
    next(err);
  }
};

export const updateHall = async (req, res, next) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHall);
  } catch (err) {
    next(err);
  }
};
export const updateHallAvailability = async (req, res, next) => {
  try {
    await Hall.updateOne(
      { "hallNumbers._id": req.params.id },
      {
        $push: {
          "hallNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Hall status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteHall = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Hall.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { halls: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Hall has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHall = async (req, res, next) => {
  try {
    const hall = await Hall.findById(req.params.id);
    res.status(200).json(hall);
  } catch (err) {
    next(err);
  }
};
export const getHalls = async (req, res, next) => {
  try {
    const halls = await Hall.find();
    res.status(200).json(halls);
  } catch (err) {
    next(err);
  }
};
