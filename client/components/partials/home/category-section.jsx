import React from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery, gql } from "@apollo/client";
import ALink from "~/components/features/custom-link";
import { useState, useEffect } from "react";
import { fadeIn } from "~/utils/data/keyframes";
import { GET_CAT } from "~/server/queries";



function CategorySection() {
  const [cat, setCat] = useState([]);

  const { data, loading, error } = useQuery(GET_CAT);
  useEffect(() => {
    if (data) {
      setCat(data.getsProdCat);
    }
  });

  //if (loading) return <div>Loading</div>;
  //if (error) return <div>error</div>;

  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className="pt-10 mt-7">
        <div className="container">
          <h2 className="title title-center mb-5">Browse Our Categories</h2>

          <div className="row">
            {cat.map((category, index) => (
              <div key={category._id} className="col-xs-6 col-lg-3 mb-4">
                <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                  <ALink
                    href={{
                      pathname: "/shop",
                      query: { category: category.catName },
                    }}
                  >
                    <figure className="category-media">
                      <LazyLoadImage
                        src={category.imageUrl}
                        alt="Intro Slider"
                        effect="opacity; transform"
                        width={280}
                        height={280}
                      />
                    </figure>

                    <div className="category-content">
                      <h4 className="category-name font-weight-bold ls-l">
                        {" "}
                        {category.catName} 
                      </h4>
                    </div>
                  </ALink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default React.memo(CategorySection);
