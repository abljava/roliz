import React, { useState, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useActions } from "@/hooks/useActions";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/css/shop.module.css";
import productStyles from "@/app/css/product.module.css";
import { useCustomers } from "@/hooks/useStater";

// Функция для округления цены до сотен
const roundPrice = (price) => {
  if (price >= 1000) {
    return Math.ceil(price / 100) * 100;
  }
  return price;
};

export const ProductCard = ({ item, viewMode }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { viewMode: globalViewMode } = useSelector((state) => state.view);
  const effectiveViewMode = viewMode || globalViewMode;

  const product = item.attributes?.id1c
    ? {
        id: item.id,
        id1c: item.attributes?.id1c || "",
        category:
          item.attributes?.categories?.data?.map((item) => item.id) || [],
        image:
          item.attributes?.imgs?.data?.[0]?.attributes?.url || "/noImage.jpg",
          // item.attributes?.imgs?.data?.[0]?.attributes?.formats?.thumbnail
          //   ?.url || "/noImage.jpg",
        title: item.attributes?.title,
        description: item.attributes?.description, //Сейчас нету, так на будущее
        stock: Number.parseInt(item.attributes.stock),
        storeplace: item.attributes.storeplace,
        attributes:
          item.attributes.Attributes?.attributes?.map((item) =>
            item.type === "Number"
              ? {
                  name: item.name,
                  type: item.type,
                  value: Number.parseInt(item.value),
                }
              : item
          ) || [],
        quantitySales: Number.parseInt(item.attributes.quantitySales),
        price: Math.round(item.attributes.price) || 1,
        priceOpt: Math.round(item.attributes.priceOpt) || 0,
      }
    : false;

  const [quantity, setQuantity] = useState(1);
  const [textToCart, setTextToCart] = useState("В корзину");

  const plus = () =>
    product && quantity < product.stock ? setQuantity(quantity + 1) : null;
  const minus = () =>
    product && quantity > 1 ? setQuantity(quantity - 1) : null;

  const { addToCart } = useActions();
  const customer = useCustomers();

  const handleAddToCart = (product) => {
    const makeMutableProduct = { ...product };
    makeMutableProduct.quantityForBuy = quantity;
    addToCart(makeMutableProduct);
    setTextToCart("Добавлено!");
    setTimeout(() => {
      setTextToCart("Добавить еще?");
    }, 1000);
  };

  const renderImage = (src, alt) => (
    <img
      className="rounded-lg transform hover:scale-110 transition-all"
      src={src}
      alt={alt}
    />
  );

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      {/* GRID VIEW */}
      {effectiveViewMode === "grid" && (
        <article
          className="relative min-w-[195px] lg:min-w-[300px] flex flex-col items-center justify-between transition-all duration-300 ease-in select-none cursor-pointer"
          // className={`${styles.productCard}`}
        >
          <Link
            className={styles.productCartLink}
            href={product ? `/routes/shop/products/${product.id}` : "#"}
          >
            <div className={`${styles.productCardImage} bg-white-default`}>
              {product ? (
                renderImage(
                  product.image && Array.isArray(product.image[0])
                    ? `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${product.image[0]}`
                    : `${process.env.NEXT_PUBLIC_PROTOCOL}://${
                        process.env.NEXT_PUBLIC_URL_FRONT
                      }${product.image || "/noImage.jpg"}`,
                  product.title
                )
              ) : (
                <div className={`${productStyles.singleProductImg}`}>
                  {renderImage(`/noImage.jpg`, product.title)}
                </div>
              )}
            </div>

            <h3 className={`${styles.productCardTitle}`}>{product.title}</h3>
            <p className={styles.price}>
              {product.priceOpt &&
              customer.authStatus &&
              customer.type === "Оптовый покупатель"
                ? Number(roundPrice(product.priceOpt)).toLocaleString("ru-RU")
                : Number(roundPrice(product.price)).toLocaleString("ru-RU")}{" "}
              ₽
            </p>
          </Link>
          <div className={`${styles.productCartDownBlock} relative`}>
            <button
              onClick={() => handleAddToCart(product)}
              className={`${styles.addToCartButton}`}
            >
              {textToCart}
            </button>

            <Image
              src="/icon/ArrowBordered.svg"
              alt="arrow"
              width={45}
              height={45}
            />
          </div>
        </article>
      )}

      {/* LIST VIEW */}
      {effectiveViewMode === "list" && (
        <article className="flex h-full">
          <div className=" grid grid-cols-[15%_1fr_30%] xl:grid-cols-[20%_1fr_26%] w-full p-6 transition-all duration-300 ease-in">
            <div className="py-6 h-full ">
              <Link
                href={product ? `/routes/shop/products/${product.id}` : "#"}
              >
                {product ? (
                  renderImage(
                    product.image && Array.isArray(product.image[0])
                      ? `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${product.image[0]}`
                      : `${process.env.NEXT_PUBLIC_PROTOCOL}://${
                          process.env.NEXT_PUBLIC_URL_FRONT
                        }${product.image || "/noImage.jpg"}`,
                    product.title
                  )
                ) : (
                  <div className={`${productStyles.singleProductImg}`}>
                    {renderImage(`/noImage.jpg`, product.title)}
                  </div>
                )}
              </Link>
            </div>
            <div className="flex-grow flex-col gap-8 p-6  w-auto h-full flex ">
              <Link
                href={product ? `/routes/shop/products/${product.id}` : "#"}
              >
                <h3 className="text-2xl font-bold">{product.title}</h3>
              </Link>

              <div className="w-full flex flex-col items-start self-start text-xs xl:text-base">
                {product ? (
                  <>
                    <p>
                      {showFullDescription
                        ? product.description
                        : `${product.description.substring(0, 200)}...`}
                    </p>
                    {product.description.length > 200 && (
                      <button
                        className="mt-1 text-gray-light font-light text-xs xl:text-base"
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                      >
                        {showFullDescription ? "Скрыть" : "Показать больше"}
                      </button>
                    )}
                  </>
                ) : (
                  <p>Нет данных о продукте</p>
                )}
              </div>
            </div>
            <div className="py-6 h-full flex flex-col items-start justify-between ">
              <p className="text-2xl font-bold">{roundPrice(product.price)} ₽</p>

              <div className="grid grid-cols-2 gap-2 justify-between w-full ">
                <div className="w-full border rounded-md flex justify-around items-center p-2">
                  <button onClick={minus} className="flex">
                    <Image
                      unoptimized
                      src={"/minus.svg"}
                      alt="Кнопка для уменьшения количества товара"
                      width={10}
                      height={10}
                    />
                  </button>
                  <span className="font-bold">{quantity}</span>
                  <button onClick={plus}>
                    <Image
                      unoptimized
                      src={"/plus.svg"}
                      alt="Кнопка для увеличения количества товара"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full p-2 rounded-md bg-yellow-default hover:transition-all"
                >
                  {textToCart}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* TABLE VIEW */}
      {effectiveViewMode === "table" && (
        <>
          <article className="flex h-full">
            <div className=" grid grid-cols-[10%_50%_auto_12%_12%] items-start gap-3 w-full p-6 transition-all duration-300 ease-in">
              {/* image */}
              <div className="">
                <Link
                  href={product ? `/routes/shop/products/${product.id}` : "#"}
                >
                  {product ? (
                    renderImage(
                      product.image && Array.isArray(product.image[0])
                        ? `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${product.image[0]}`
                        : `${process.env.NEXT_PUBLIC_PROTOCOL}://${
                            process.env.NEXT_PUBLIC_URL_FRONT
                          }${product.image || "/noImage.jpg"}`,
                      product.title
                    )
                  ) : (
                    <div className={`${productStyles.singleProductImg}`}>
                      {renderImage(`/noImage.jpg`, product.title)}
                    </div>
                  )}
                </Link>
              </div>
              {/* title & description */}
              <div className="flex-grow flex-col gap-8 w-auto h-full flex ">
                <Link
                  href={product ? `/routes/shop/products/${product.id}` : "#"}
                >
                  <h3 className="text-2xl font-bold">{product.title}</h3>
                </Link>

                <div className="w-full text-sm xl:text-base flex flex-col self-start items-start">
                  {product ? (
                    <>
                      <p>
                        {showFullDescription
                          ? product.description
                          : `${product.description.substring(0, 200)}...`}
                      </p>
                      {product.description.length > 200 && (
                        <button
                          className="mt-1 text-gray-light text-xs xl:text-base"
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                        >
                          {showFullDescription ? "Скрыть" : "Показать больше"}
                        </button>
                      )}
                    </>
                  ) : (
                    <p>Нет данных о продукте</p>
                  )}
                </div>
              </div>
              {/* price */}
              <p className="text-sm xl:text-xl font-bold justify-self-center">
                {roundPrice(product.price)} ₽
              </p>
              {/* quantity */}
              <div className="w-full py-2 border rounded-md flex justify-around items-center">
                <button onClick={minus} className="flex">
                  <Image
                    unoptimized
                    src={"/minus.svg"}
                    alt="Кнопка для уменьшения количества товара"
                    width={10}
                    height={10}
                  />
                </button>
                <span className="font-bold text-base">{quantity}</span>
                <button onClick={plus}>
                  <Image
                    unoptimized
                    src={"/plus.svg"}
                    alt="Кнопка для увеличения количества товара"
                    width={10}
                    height={10}
                  />
                </button>
              </div>
              {/* add to cart */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-[11px] text-sm xl:text-base rounded-md bg-yellow-default hover:transition-all"
              >
                {textToCart}
              </button>
            </div>
          </article>
        </>
      )}
    </Suspense>
  );
};
