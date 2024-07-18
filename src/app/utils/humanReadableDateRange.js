const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "America/New_York",
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
      // XXX Here (and below) we're setting the timezone explicitly to Eastern
      //     for SSR purposes… but this really just ought to be hydrated based
      //     on the user's locale.
      timeZone: "America/New_York",
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
        timeZone: "America/New_York",
      })}{" "}
      – {longFormDate === endLongForm ? "" : endLongForm}{" "}
      {endDate.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
        timeZone: "America/New_York",
      })}
    </>
  );
};
