"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGetContactsQuery } from "@/redux/api/contacts.api";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import styles from "@/app/css/footer.module.css";
import { ProductRow } from "@/app/components/shop/ProductRow";
import { CallBack } from "@/app/components/micro/CallBack";
import Socials from "@/app/components/micro/Socials";

export const Footer = ({}) => {
  const { isLoading: contactsLoading, data: contactsData } =
    useGetContactsQuery();
  const { isLoading: categoriesLoading, data: categoriesData } =
    useGetCategoriesQuery();

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {}, [contactsData]);

  return (
    <footer className={`pt-10 ${styles.footerContainer}`}>
      {/* <ProductRow category={process.env.NEXT_PUBLIC_VELOPART_ID} place="" /> */}

      <div className={`${styles.footerBlock0}`}>
        <div className={`${styles.footerColumn}`}>
          <h3>Мы в соцсетях</h3>
          <Socials />
        </div>
        <div className={`${styles.footerColumn}`}>
          <CallBack />
        </div>
        <div className={`${styles.footerColumn}`}>
          {!contactsLoading &&
            typeof contactsData !== "undefined" &&
            contactsData.data && (
              <>
                <a href={`mailto:${contactsData.data[0].attributes.MainEmail}`}>
                  {contactsData.data[0].attributes.MainEmail}
                </a>
                <a href={`mailto:${contactsData.data[0].attributes.MainEmail}`}>
                  Написать нам
                </a>
              </>
            )}
        </div>
      </div>

      <div className={`${styles.footerBlock1}`}>
        <div className={`${styles.footerColumn}`}>
          <h5>Roliz.Ru</h5>
          <p>
            Оптовая и розничная продажа мотоциклов,
            <br /> запчастей, велосипедов и экипировки.
          </p>
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${
              !contactsLoading
                ? typeof contactsData != "undefined" && contactsData.data
                  ? contactsData.data[0].attributes.MainAdress
                  : null
                : null
            }`}
          >
            {typeof contactsData != "undefined" && contactsData.data
              ? contactsData.data[0].attributes.MainAdress
              : null}
          </a>
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${
              !contactsLoading
                ? typeof contactsData != "undefined" && contactsData.data
                  ? contactsData.data[0].attributes.OfficeUssur
                  : null
                : null
            }`}
          >
            {typeof contactsData != "undefined" && contactsData.data
              ? contactsData.data[0].attributes.OfficeUssur
              : null}
          </a>
        </div>
        <div className={`${styles.footerColumn}`}>
          <h5>Клиентам</h5>
          <Link href={`${"/routes/pages/delivery"}`}>Доставка и оплата</Link>
          <Link href={`${"/routes/pages/about"}`}>О компании</Link>
          <Link href={`${"/routes/pages/opt"}`}>Оптовым покупателям</Link>
          <Link href={`${"/routes/pages/contacts"}`}>Контакты</Link>
        </div>
        {/* Каталог меню */}
        <div className={`${styles.footerColumn}`}>
          <h5>Каталог</h5>
          <ul>
            {!categoriesLoading
              ? typeof categoriesData != "undefined" && categoriesData.data
                ? categoriesData.data.map((item) => {
                    if (!item.attributes.parent.data) {
                      return (
                        <li key={item.id}>
                          <Link
                            href={`/routes/shop/${item.id}`}
                            className=" cursor-pointer  hover:transition-all 
                              group"
                          >
                            <h4 className="group-hover:text-white-default">
                              {item.attributes.name}
                            </h4>
                          </Link>
                        </li>
                      );
                    }
                  })
                : null
              : null}
          </ul>
        </div>
      </div>

      <div className={`${styles.footerBlock2}`}>
        <div className={`${styles.footerColumn}`}>
          <p>
            <span>ООО Roliz © {year}</span>
            все права защищены
          </p>
        </div>
        <div className={`${styles.footerColumn}`}>
          <Link href="/routes/political">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
};
