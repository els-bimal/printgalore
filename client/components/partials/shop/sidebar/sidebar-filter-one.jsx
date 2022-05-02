import { useEffect, useState } from "react";
import { useRouter } from "next/router";
//import { useQuery } from '@apollo/react-hooks';
import { useQuery, gql } from "@apollo/client";
import InputRange from "react-input-range";

import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";
import OwlCarousel from "~/components/features/owl-carousel";

import SmallProduct from "~/components/features/product/product-sm";

import withApollo from "../../../../server/apollo";
import { GET_SHOP_SIDEBAR_DATA } from "../../../../server/queries";

import SlideToggle from "react-slide-toggle";

import filterData from "~/utils/data/shop";
import { scrollTopHandler } from "~/utils";
import { GET_CAT } from "~/server/queries";
import { GET_SIZE } from "~/server/queries";
import { GET_COLOR } from "~/server/queries";
import { GET_BRAND } from "~/server/queries";

function SidebarFilterOne(props) {
  const { type = "left", isFeatured = false } = props;
  const router = useRouter();
  const query = router.query;
  const { data, loading, error } = useQuery(GET_SHOP_SIDEBAR_DATA, {
    variables: { demo: 1, featured: true },
  });
  let tmpPrice = {
    max: query.max_price ? parseInt(query.max_price) : 50,
    min: query.min_price ? parseInt(query.min_price) : 0,
  };
  const [filterPrice, setPrice] = useState(tmpPrice);
  const [isFirst, setFirst] = useState(true);
  let sidebarData = data && data.shopSidebarData;
  let timerId;

  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [brand, setBrand] = useState([]);

  //const { catData, catLoading, catError } = useQuery(GET_CAT);
  const response = useQuery(GET_CAT);
  const response_size = useQuery(GET_SIZE);
  const response_color = useQuery(GET_COLOR);
  const response_Brand = useQuery(GET_BRAND);
  

  //example const { loading, error, data } = useQuery(GET_MY_TODOS)


  /*console.log("A->"+response.loading)
  console.log("B->"+response.data)
  console.log("C->"+response.error)*/


  useEffect(() => {
    if (response_Brand.loading) {
      console.log("Loading list of Brands")
    } else {
      setBrand(response_Brand.data.getBrandFromDbProduct);
    }

  }, [response_Brand]);

  useEffect(() => {

    if (response_color.loading) {
      console.log("Loading list of color")
    } else {
      console.log(response_color.data);
      setColor(response_color.data.getColorFromDbProduct)
    }

  }, [response_color]);

  useEffect(() => {

    if (response.loading) {
      console.log("Loading list of cat")
    } else {
      setCat(response.data.getProdFromProduct);
    }
  }, [response]);

  useEffect(() => {

    if (response_size.loading) {
      console.log("Loading list of size")
    } else {
      setSize(response_size.data.getSizeFromDbProduct);
    }
  }, [response_size]);
  

  useEffect(() => {
    window.addEventListener("resize", hideSidebar);
    return () => {
      window.removeEventListener("resize", hideSidebar);
    };
  }, []);

  useEffect(() => {
    setPrice({
      max: query.max_price ? parseInt(query.max_price) : 50,
      min: query.min_price ? parseInt(query.min_price) : 0,
    });
    if (isFirst) {
      setFirst(false);
    } else {
      scrollTopHandler();
    }
  }, [query]);

  const filterByPrice = (e) => {
    e.preventDefault();
    let url = router.pathname.replace("[grid]", query.grid);
    let arr = [
      `min_price=${filterPrice.min}`,
      `max_price=${filterPrice.max}`,
      "page=1",
    ];
    for (let key in query) {
      if (
        key !== "min_price" &&
        key !== "max_price" &&
        key !== "page" &&
        key !== "grid"
      )
        arr.push(key + "=" + query[key]);
    }
    url = url + "?" + arr.join("&");
    router.push(url);
  };

  const containsAttrInUrl = (type, value) => {
    const currentQueries = query[type] ? query[type].split(",") : [];
    return currentQueries && currentQueries.includes(value);
  };

  const getUrlForAttrs = (type, value) => {
    let currentQueries = query[type] ? query[type].split(",") : [];
    currentQueries = containsAttrInUrl(type, value)
      ? currentQueries.filter((item) => item !== value)
      : [...currentQueries, value];
    return currentQueries.join(",");
  };

  const onChangePrice = (value) => {
    setPrice(value);
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    document
      .querySelector("body")
      .classList.remove(
        `${
          type === "left" || type === "off-canvas"
            ? "sidebar-active"
            : "right-sidebar-active"
        }`
      );

    let stickyWraper = e.currentTarget.closest(".sticky-sidebar-wrapper");

    let mainContent = e.currentTarget.closest(".main-content-wrap");
    if (mainContent && type !== "off-canvas" && query.grid !== "4cols")
      mainContent.querySelector(".row.product-wrapper") &&
        mainContent
          .querySelector(".row.product-wrapper")
          .classList.toggle("cols-md-4");

    if (mainContent && stickyWraper) {
      stickyWraper.classList.toggle("closed");

      if (stickyWraper.classList.contains("closed")) {
        mainContent.classList.add("overflow-hidden");
        clearTimeout(timerId);
      } else {
        timerId = setTimeout(() => {
          mainContent.classList.remove("overflow-hidden");
        }, 500);
      }
    }
  };

  const showSidebar = (e) => {
    e.preventDefault();
    document.querySelector("body").classList.add("sidebar-active");
  };

  const hideSidebar = () => {
    document
      .querySelector("body")
      .classList.remove(
        `${
          type === "left" ||
          type === "off-canvas" ||
          type === "boxed" ||
          type === "banner"
            ? "sidebar-active"
            : "right-sidebar-active"
        }`
      );
  };

  return (
    <aside
      className={`col-lg-3 shop-sidebar skeleton-body ${
        type === "off-canvas" ? "" : "sidebar-fixed sticky-sidebar-wrapper"
      } ${
        type === "off-canvas" || type === "boxed" ? "" : "sidebar-toggle-remain"
      } ${
        type === "left" ||
        type === "off-canvas" ||
        type === "boxed" ||
        type === "banner"
          ? "sidebar"
          : "right-sidebar"
      }`}
    >
      <div className="sidebar-overlay" onClick={hideSidebar}></div>
      {type === "boxed" || type === "banner" ? (
        <a href="#" className="sidebar-toggle" onClick={showSidebar}>
          <i className="fas fa-chevron-right"></i>
        </a>
      ) : (
        ""
      )}
      <ALink className="sidebar-close" href="#" onClick={hideSidebar}>
        <i className="d-icon-times"></i>
      </ALink>

      <div className="sidebar-content">
        {!loading && sidebarData ? (
          <div className="sticky-sidebar">
            {type === "boxed" || type === "banner" ? (
              ""
            ) : (
              <div className="filter-actions mb-4">
                <a
                  href="#"
                  className="sidebar-toggle-btn toggle-remain btn btn-outline btn-primary btn-icon-right btn-rounded"
                  onClick={toggleSidebar}
                >
                  Filter
                  {type === "left" || type === "off-canvas" ? (
                    <i className="d-icon-arrow-left"></i>
                  ) : (
                    <i className="d-icon-arrow-right"></i>
                  )}
                </a>
                <ALink
                  href={{
                    pathname: router.pathname,
                    query: {
                      grid: query.grid,
                      type: router.query.type ? router.query.type : null,
                    },
                  }}
                  scroll={false}
                  className="filter-clean"
                >
                  Clean All
                </ALink>
              </div>
            )}

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>All Categories<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={false}
              >
                <ul className="widget-body filter-items search-ul">
                  {cat
                    ? cat.map((category, index) => (
                        <li key={category._id}>
                          <ALink href={`shop?category=${category.category}`}>
                            {category.category}
                          </ALink>
                        </li>
                      ))
                    : ""}
                </ul>
              </Card>
              {/*console.log("dsdsdsdsdsd" + JSON.stringify(catData))*/}
            </div>

            {/*
                                <div className="widget widget-collapsible">
                                    <Card title="<h3 class='widget-title'>All Categories<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                                        <ul className="widget-body filter-items search-ul">
                                            {
                                                data && sidebarData.categories.map((item, index) => (
                                                    item.children ?
                                                        <li
                                                            key={item.name + ' - ' + index}
                                                            className={`with-ul overflow-hidden ${item.slug === query.category || item.children.findIndex(subCat => subCat.slug === query.category) > -1 ? 'show' : ''} `}
                                                        >
                                                            <SlideToggle collapsed={true} >
                                                                {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                                    <>
                                                                        <ALink href={{ pathname: router.pathname, query: { category: item.slug, grid: query.grid, type: router.query.type ? router.query.type : null } }} scroll={false}>{item.name}
                                                                            <i className={`fas fa-chevron-down ${toggleState.toLowerCase()}`} onClick={e => { onToggle(); e.stopPropagation(); e.preventDefault(); }}></i>
                                                                        </ALink>

                                                                        <div ref={setCollapsibleElement}>
                                                                            <div>
                                                                                <ul style={{ display: "block" }}>
                                                                                    {
                                                                                        item.children.map((subItem, index) =>
                                                                                            <li key={subItem.name + ' - ' + index}
                                                                                                className={`with-ul ${subItem.slug === query.category ? 'show' : ''} `}>
                                                                                                <ALink scroll={false} href={{ pathname: router.pathname, query: { category: subItem.slug, grid: query.grid, type: router.query.type ? router.query.type : null } }}>{subItem.name}</ALink>
                                                                                            </li>
                                                                                        )
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </>

                                                                )}

                                                            </SlideToggle >
                                                        </li> :
                                                        <li
                                                            className={query.category === item.slug ? 'show' : ''}
                                                            key={item.name + ' - ' + index}
                                                        >
                                                            <ALink href={{ pathname: router.pathname, query: { category: item.slug, grid: query.grid, type: router.query.type ? router.query.type : null } }} scroll={false}>{item.name}
                                                            </ALink>
                                                        </li>
                                                ))
                                            }
                                        </ul>
                                    </Card>
                                </div>*/}

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Filter by Price<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={false}
              >
                <div className="widget-body">
                  <form action="#">
                    <div className="filter-price-slider noUi-target noUi-ltr noUi-horizontal shop-input-range">
                      <InputRange
                        formatLabel={(value) => `$${value}`}
                        maxValue={50}
                        minValue={0}
                        step={1}
                        value={filterPrice}
                        onChange={onChangePrice}
                      />
                    </div>

                    <div className="filter-actions">
                      <div className="filter-price-text mb-4">
                        Price: ${filterPrice.min} - ${filterPrice.max}
                        <span className="filter-price-range"></span>
                      </div>

                      <button
                        className="btn btn-dark btn-filter btn-rounded"
                        onClick={filterByPrice}
                      >
                        Filter
                      </button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Size<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={false}
              >
                <ul className="widget-body filter-items">
                  {size.map((item, index) => (
                    <li
                      className={
                        containsAttrInUrl("sizes", item.size) ? "active" : ""
                      }
                      key={item._id}
                    >
                      <ALink
                        scroll={false}
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            sizes: getUrlForAttrs("sizes", item.size),
                            type: router.query.type ? router.query.type : null,
                          },
                        }}
                      >
                        {item.size}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Color<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={false}
              >
                <ul className="widget-body filter-items">
                  {color.map((item, index) => (
                    <li
                      className={
                        containsAttrInUrl("colors", item.color) ? "active" : ""
                      }
                      key={item._id}
                    >
                      <ALink
                        scroll={false}
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            colors: getUrlForAttrs("colors", item.color),
                            type: router.query.type ? router.query.type : null,
                          },
                        }}
                      >
                        {item.color}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Brand<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={false}
              >
                <ul className="widget-body filter-items">
                  {brand.map((item, index) => (
                    <li
                      className={
                        containsAttrInUrl("brands", item.brand) ? "active" : ""
                      }
                      key={item._id}
                    >
                      <ALink
                        scroll={false}
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            brands: getUrlForAttrs("brands", item.brand),
                            type: router.query.type ? router.query.type : null,
                          },
                        }}
                      >
                        {item.brand}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {isFeatured ? (
              <div className="widget widget-products widget-collapsible">
                <h4 className="widget-title">Our Featured</h4>

                <div className="widget-body">
                  <OwlCarousel adClass="owl-nav-top">
                    <div className="products-col">
                      {sidebarData.featured.slice(0, 3).map((item, index) => (
                        <SmallProduct
                          product={item}
                          key={item.name + " - " + index}
                        />
                      ))}
                    </div>
                    <div className="products-col">
                      {sidebarData.featured.slice(3, 6).map((item, index) => (
                        <SmallProduct
                          product={item}
                          key={item.name + " - " + index}
                        />
                      ))}
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="widget-2 mt-10 pt-5"></div>
        )}
      </div>
    </aside>
  );
}

export default withApollo({ ssr: typeof window === "undefined" })(
  SidebarFilterOne
);
