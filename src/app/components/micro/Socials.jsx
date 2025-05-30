import { useGetSocialQuery } from "@/redux/api/socials.api";
import React, { useEffect } from "react";
import styles from "@/app/css/footer.module.css";

function Socials({}) {
  const { isLoading, error, data } = useGetSocialQuery();

  useEffect(() => {}, [isLoading]);

  return (
    <div className={styles.socialRow}>
      {!isLoading ? (
        typeof data != "undefined" &&
        data.data &&
        Array.isArray(data.data) &&
        data.data[0].attributes.telegram ? (
          <div className={styles.oneSocial}>
            <a target="_blank" href={`${data.data[0].attributes.telegram}`}>
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 19 17"
                fill="#262626"
              >
                <path
                  d="M7.61686 11.0053L7.32737 15.4027C7.74155 15.4027 7.92093 15.2105 8.13604 14.9798L10.0779 12.9756L14.1015 16.1579C14.8394 16.602 15.3593 16.3682 15.5584 15.4247L18.1995 2.05935L18.2002 2.05856C18.4343 0.880468 17.8057 0.419783 17.0868 0.708794L1.56244 7.12767C0.502936 7.57182 0.518978 8.20969 1.38233 8.4987L5.35128 9.83193L14.5704 3.60205C15.0042 3.29178 15.3987 3.46345 15.0742 3.77373L7.61686 11.0053Z"
                  fill="#262626"
                />
              </svg>
            </a>
          </div>
        ) : null
      ) : null}
      {!isLoading ? (
        typeof data != "undefined" &&
        data.data &&
        Array.isArray(data.data) &&
        data.data[0].attributes.vk ? (
          <div className={styles.oneSocial}>
            <a target="_blank" href={`${data.data[0].attributes.vk}`}>
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 21 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.3148 1.31257C20.4571 0.844571 20.3148 0.5 19.6334 0.5H17.3834C16.8108 0.5 16.5468 0.797428 16.4037 1.12571C16.4037 1.12571 15.2594 3.86514 13.6385 5.64457C13.114 6.16057 12.8757 6.32428 12.5894 6.32428C12.4463 6.32428 12.2311 6.16057 12.2311 5.69171V1.31257C12.2311 0.750285 12.0734 0.5 11.5968 0.5H8.05855C7.70112 0.5 7.48598 0.760571 7.48598 1.00829C7.48598 1.54057 8.29683 1.664 8.37998 3.16228V6.41771C8.37998 7.13171 8.24883 7.26114 7.96255 7.26114C7.19969 7.26114 5.34398 4.50885 4.24255 1.35971C4.02913 0.746857 3.81313 0.5 3.23798 0.5H0.986272C0.343415 0.5 0.214844 0.797428 0.214844 1.12571C0.214844 1.71028 0.9777 4.61428 3.7677 8.45514C5.6277 11.078 8.24626 12.5 10.6317 12.5C12.0623 12.5 12.2388 12.1846 12.2388 11.6403V9.65771C12.2388 9.02599 12.3743 8.89999 12.8277 8.89999C13.162 8.89999 13.7337 9.06456 15.0691 10.3288C16.5948 11.828 16.846 12.5 17.7048 12.5H19.9548C20.5977 12.5 20.92 12.1846 20.7348 11.5606C20.5308 10.94 19.8023 10.0391 18.8363 8.97028C18.3117 8.36171 17.5248 7.70599 17.2857 7.37771C16.9523 6.95685 17.0474 6.76914 17.2857 6.39457C17.2857 6.39457 20.0285 2.60086 20.314 1.31257H20.3148Z"
                  fill="#262626"
                />
              </svg>
            </a>
          </div>
        ) : null
      ) : null}

      {!isLoading ? (
        typeof data != "undefined" &&
        data.data &&
        Array.isArray(data.data) &&
        data.data[0].attributes.youtube ? (
          <div className={styles.oneSocial}>
            <a
              className={styles.youTubeIcon}
              target="_blank"
              href={`${data.data[0].attributes.youtube}`}
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <circle cx="17.5" cy="17.5" r="17.5" fill="#FECC00"/>
                <path
                  d="M26.44 13.18c-.21-.82-.84-1.47-1.65-1.69-1.45-.4-7.29-.4-7.29-.4s-5.84 0-7.29.4c-.81.22-1.44.87-1.65 1.69-.39 1.5-.39 4.61-.39 4.61s0 3.11.39 4.61c.21.82.84 1.47 1.65 1.69 1.45.4 7.29.4 7.29.4s5.84 0 7.29-.4c.81-.22 1.44-.87 1.65-1.69.39-1.5.39-4.61.39-4.61s0-3.11-.39-4.61zm-10.69 7.82v-5.83l4.67 2.92-4.67 2.91z"
                  fill="#262626"
                />
              </svg>
            </a>
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default Socials;
