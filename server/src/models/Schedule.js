const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    division: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // "HH:mm"
      required: true,
      trim: true,
    },
    endTime: {
      type: String, // "HH:mm"
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Upcoming"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster search and sorting
ScheduleSchema.index({ division: 1, district: 1, date: 1 });
ScheduleSchema.index({ date: 1, startTime: 1 });

module.exports = mongoose.model("Schedule", ScheduleSchema);
