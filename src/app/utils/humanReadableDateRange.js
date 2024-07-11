const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const humanReadableDateRange = (startDate, endDate) => {
  if (+startDate === +endDate) {
    // weird, but whatever.
    return startDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });
  }

  const longFormDate = startDate.toLocaleDateString(undefined, dateOptions);
  const endLongForm = endDate.toLocaleDateString(undefined, dateOptions);
  return (
    <>
      {longFormDate}{" "}
      {startDate.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      })}{" "}
      – {longFormDate === endLongForm ? "" : endLongForm}{" "}
      {endDate.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      })}
    </>
  );
};
