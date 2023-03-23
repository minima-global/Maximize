export function availableBalance() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`balance`, function (response: any) {
      if (response.response) {
        const minimaCoin = response.response.find((i: any) => i.tokenid === '0x00');
        return resolve(minimaCoin.sendable);
      }

      return reject();
    });
  });
}

export function sql(query: string, singleResult = true) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.sql(query, function (response: any) {
      if (response.status) {
        if (response.rows && singleResult) {
          return resolve(response.rows[0]);
        } else if (response.rows) {
          return resolve(response.rows);
        }

        return resolve(response.status);
      }

      return reject();
    });
  });
}

export function block() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('block', function(response: any) {
      if (response.status) {
        return resolve(response.response.block);
      }

      return reject();
    });
  });
}

const exports = {};

export default exports;
