"use client";

import React, { useEffect } from "react";
import styles from "@/app/css/mainpage.module.css";
import { useGetWarrantyQuery } from "@/redux/api/pages.api";

export default function Services() {
  const { isLoading, data } = useGetWarrantyQuery();

  useEffect(() => {}, [data]);

  if (isLoading) return <>Загрузка ...</>;

  return (
    <>
      <main
        className={`${styles.main} ${styles.contentpage} ${styles.contentpageOpt}`}
      >
        <section className="flex pt-5">
          <p
            className="text-sm font-light"
            dangerouslySetInnerHTML={{ __html: data?.data.attributes.text }}
          ></p>
        </section>
      </main>
    </>
  );
}
