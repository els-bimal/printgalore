import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from '~/server/queries';

import OwlCarousel from '~/components/features/owl-carousel';

import MediaOne from '~/components/partials/product/media/media-one';
import DetailOne from '~/components/partials/product/detail/detail-one';
import DescOne from '~/components/partials/product/desc/desc-one';
import RelatedProducts from '~/components/partials/product/related-products';

import { GET_PROD_BY_ID } from "~/server/queries";

import { mainSlider17 } from '~/utils/data/carousel';

function ProductDefault() {
    const slug = useRouter().query.slug;
    //const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { slug } });
    const [loaded, setLoadingState] = useState(false);
    //const product = data && data.product.data;
    const related = data && data.product.related;

    const { data, loading, error } = useQuery(GET_PROD_BY_ID, { variables: { id: slug } });
    const [product, setProduct] = useState([]);

    useEffect(() => {
        /*
        if (!loading && product)
            console.log("product got", product)
        imagesLoaded('main').on('done', function () {
            console.log("images loading")
            setLoadingState(true);
        }).on('progress', function () {
            console.log("images loaded")
            setLoadingState(false);
        });
        if (loading)
            console.log("product loading")
        setLoadingState(false)
        */
        if (data) {
            // console.log(" x ->"+ JSON.stringify(data.prod_by_id));

            setProduct(data.prod_by_id);
            if (!loading){
                setLoadingState(true);
            }
            
        }


    })/*, [loading, product])*/

    return (
        <main className="main mt-6 single-product">
            <Helmet>
                <title>Printing Galore - | Product Default</title>
            </Helmet>

            <h1 className="d-none">Printing Galore - Product Default</h1>
            {
                <div>
                    {product.map((product, index) => (

                        <div key={product._id} className={`page-content mb-10 pb-6 ${loaded ? '' : 'd-none'}`} >

                            <div className="container vertical">
                                <div className="product product-single row mb-7">
                                    <div className="col-md-6 sticky-sidebar-wrapper">
                                        
                                        {<MediaOne product={product}  />}

                                    </div>

                                    <div className="col-md-6">
                                        
                                        {<DetailOne data={data} />}
                                    </div>
                                </div>

                                {/*<DescOne product={product} />*/}

                                {/*<RelatedProducts products={related} />*/}
                            </div>
                        </div>

                    ))}
                </div>
                /*
                    product !== undefined ?
                        <div className={`page-content mb-10 pb-6 ${loaded ? '' : 'd-none'}`} >
    
                            <div className="container vertical">
                                <div className="product product-single row mb-7">
                                    <div className="col-md-6 sticky-sidebar-wrapper">
                                        {product._id}
                                        {<MediaOne product={product} />}
    
                                    </div>
    
                                    <div className="col-md-6">
                                        {*<DetailOne data={data} />}
                                    </div>
                                </div>
    
                                {<DescOne product={product} />}
    
                                {<RelatedProducts products={related} />}
                            </div>
                        </div> : '' */
            }
            {
                loaded && !loading ? ''
                    :
                    <div className="skeleton-body container mb-10">
                        <div className="row mb-7">
                            <div className="col-md-6 pg-vertical">
                                <div className="skel-pro-gallery"></div>
                            </div>

                            <div className="col-md-6">
                                <div className="skel-pro-summary"></div>
                            </div>
                        </div>

                        <div className="skel-pro-tabs"></div>

                        {/* <section className="pt-3 mt-4">
                            <h2 className="title justify-content-center">Related Products</h2>

                            <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={mainSlider17}>
                                {
                                    [1, 2, 3, 4, 5, 6].map((item) =>
                                        <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                                    )
                                }
                            </OwlCarousel>
                        </section> */}
                    </div>
            }
        </main>
    )
}

export default withApollo({ ssr: typeof window === 'undefined' })(ProductDefault);