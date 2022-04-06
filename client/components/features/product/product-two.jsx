import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";

function ProductTwo(props) {
  const {
    product,
    adClass = "text-center",
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    isCategory = true,
  } = props;

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    addToCart({ ...product.data, product, qty: 1, price: product.prodPrice });
    //console.log("product - "+ JSON.stringify( product));
  };

  return (
    <div className={`product text-left ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/default/${product._id}`}>
          <LazyLoadImage
            alt="product"
            src={product.large_pictures[0].url}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
          />
        </ALink>

        <div className="product-label-group">
          {product.is_new ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {product.is_top ? (
            <label className="product-label label-top">Top</label>
          ) : (
            ""
          )}
          {/*product.discount > 0 ? (
            product.variants.length === 0 ? (
              <label className="product-label label-sale">
                {product.discount}% OFF
              </label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ""
          )*/}
        </div>

        {
          <div className="product-action-vertical">
            {
              /*product.variants.length > 0 ? (
              <ALink
                href={`/product/default/${product.slug}`}
                className="btn-product-icon btn-cart"
                title="Go to product"
              >
                <i className="d-icon-arrow-right"></i>
              </ALink>
            ) : (
              <a
                href="#"
                className="btn-product-icon btn-cart"
                title="Add to cart"
                onClick={addToCartHandler}
              >
                <i className="d-icon-bag"></i>
              </a>
            )*/
              <a
                href="#"
                className="btn-product-icon btn-cart"
                title="Add to cart"
                onClick={addToCartHandler}
              >
                <i className="d-icon-bag"></i>
              </a>
            }
            {/*
              <a
                href="#"
                className="btn-product-icon btn-wishlist"
                title={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={wishlistHandler}
              >
                <i
                  className={
                    isWishlisted ? "d-icon-heart-full" : "d-icon-heart"
                  }
                ></i>
              </a>*/
            }
          </div>
        }

        <div className="product-action">
          <ALink
            href="#"
            className="btn-product btn-quickview"
            title="Quick View"
            onClick={showQuickviewHandler}
          >
            Quick View
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        <div className="product-cat">{product.category}</div>

        <h3 className="product-name">
          <ALink href="">{product.prodName}</ALink>
        </h3>

        <div className="product-price">USD {product.prodPrice}</div>

        <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * product.ratings + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">{toDecimal(2)}</span>
          </div>

          <ALink href="" className="rating-reviews">
            ( {product.reviews} )
          </ALink>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  ...modalActions,
})(ProductTwo);
