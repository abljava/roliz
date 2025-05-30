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

  return (
    <div>
      <div
        className={`${styles.navContainer} flex w-full bg-gray-dark px-12 box-border`}
      >
        {typeof data != "undefined" && data.data != "undefined"
          ? data.data.map((item) => {
              if (!item.attributes.parent.data) {
                const hasChilds =
                  item.attributes.childs &&
                  item.attributes.childs.data.length > 0;
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
                      className="block p-5 cursor-pointer hover:transition-all 
                    hover:bg-yellow-default group "
                    >
                      <p className={styles.navItemTitle}>
                        {item.attributes.name}
                      </p>
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
