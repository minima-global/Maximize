import { UTCDate } from "@date-fns/utc";
import addSeconds from 'date-fns/addSeconds';
import format from "date-fns/format";
import { addMonths } from "date-fns";

const getPayoutTime = (transaction: any) => {
  try {
    const payoutBlock = Number(transaction?.state[1]?.data);

    if (payoutBlock) {
      const now = new UTCDate();
      const blockTimeInSeconds = 50;
      const newTime = addSeconds(now, payoutBlock * blockTimeInSeconds);

      return format(newTime, "hh:mmaaa 'UTC', dd MMM yy");
    }
  } catch {
    return null;
  }
};

const getEstimatedPayoutTime = (percent: any) => {
  try {
    const now = new UTCDate();
    const payoutTime = addMonths(now, percent.months);
    return format(payoutTime, "hh:mmaaa 'UTC', dd MMM yy");
  } catch {
    return '-';
  }
}

export { getPayoutTime, getEstimatedPayoutTime };
