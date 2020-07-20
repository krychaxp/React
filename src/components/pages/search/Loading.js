import React from "react";
import { Skeleton } from "@material-ui/lab";
import styles from "./index.module.scss";
export default () => {
  return (
    <div className={styles.result}>
      <div className={styles.userInfo}>
        <Skeleton variant="rect" width={400} height={400} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={250} height={30} />
        <Skeleton variant="text" width={200} height={50} />
        <Skeleton variant="text" width={250} height={70} />
        <Skeleton variant="text" width={250} height={30} />
        <Skeleton variant="text" width={200} height={50} />
      </div>
      <div className={styles.repo}>
        {Array(6)
          .fill()
          .map((v, i) => {
            const rand1 = Math.floor(Math.random() * 100) + 100;
            const rand2 = Math.floor(Math.random() * 100) + 150;
            return (
              <div key={i}>
                <Skeleton variant="text" width={rand1} height={40} />
                <Skeleton variant="text" width={rand2} height={20} />
                <div className={styles.r_icons}>
                  {Array(5)
                    .fill()
                    .map((v, i) => {
                      const rand = (Math.floor(Math.random() * 100) % 50) + 50;
                      return (
                        <Skeleton
                          key={i}
                          variant="text"
                          width={rand}
                          height={20}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
