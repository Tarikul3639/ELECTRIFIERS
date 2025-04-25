// server\src\utils\ScheduleSort.js

// Custom sorting function based on status priority
const ScheduleSortByStatusDateTime = (schedules) => {
    const statusOrder = { Active: 0, Upcoming: 1, Completed: 2 };
  
    return schedules.sort((a, b) => {
      // First by status
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
  
      // Then by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
  
      // Finally by startTime
      return a.startTime.localeCompare(b.startTime);
    });
  };

 module.exports = ScheduleSortByStatusDateTime;
  