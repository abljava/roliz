import React, { useState } from "react";
import Link from "next/link";
import { Loader } from "./Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import styles from "@/app/css/header.module.css";
import DropdownMenu from "./DropdownMenu";

function NavCatalogue() {
  const { isLoading, data } = useGetCategoriesQuery();
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  if (isLoading) return <Loader />;

  // data[12].attributes.image.data.attributes.url

  console.log("data :", data.data[12].attributes.image.data.attributes.url);

  return (
    <div>
      <div
        // className={`${styles.navContainer} flex w-full bg-gray-dark px-12 box-border`}
        className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4 md:gap-x-3 md:gap-y-0"
      >
        {typeof data != "undefined" && data.data != "undefined"
          ? data.data.map((item) => {
              if (!item.attributes.parent.data) {
                const hasChilds =
                  item.attributes.childs &&
                  item.attributes.childs.data.length > 0;

                // const imageUrl = item.attributes.image?.data?.attributes?.url
                //   ? `https://roliz-moto.ru${item.attributes.image.data.attributes.url}`
                //   : null;
                return (
                  <div
                    className="relative"
                    key={item.id}
                    onMouseOver={() => {
                      if (hasChilds) {
                        setActiveCategoryId(item.id);
                      }
                    }}
                    onMouseOut={() => setActiveCategoryId(null)}
                  >
                    <Link
                      href={`/routes/shop/${item.id}`}
                      className="relative block cursor-pointer hover:transition-all 
                    hover:bg-yellow-default group "
                    >
                      <img
                        src={`https://roliz-moto.ru/${item.attributes.image?.data?.attributes?.url}`}
                        className="w-full"
                      />
                      <div className="absolute top-2 left-2 right-2 lg:top-5 lg:left-6 lg:right-6 flex justify-between">
                        <p className="text-sm text-white-default lg:text-2xl uppercase">
                          {item.attributes.name}
                        </p>
                        <img src='/icon/ArrowWhite.svg' alt='иконка' className="lg:w-8"/>
                      </div>
                    </Link>
                    {activeCategoryId === item.id && hasChilds && (
                      <DropdownMenu data={item} />
                    )}
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}

export default NavCatalogue;
