import React from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
import withApollo from '~/server/apollo';
import { GET_HOME_DATA } from '~/server/queries';

// import Home Components
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import ServiceBox from '~/components/partials/home/service-section';
import CategorySection from '~/components/partials/home/category-section';
import BestCollection from '~/components/partials/home/best-collection';
import DealSection from '~/components/partials/home/deal-section';
import FeaturedCollection from '~/components/partials/home/featured-collection';
import CtaSection from '~/components/partials/home/cta-section';
import BrandSection from '~/components/partials/home/brand-section';
import BlogSection from '~/components/partials/home/blog-section';
import SmallCollection from '~/components/partials/product/small-collection';
import AboutBlock from '~/pages/elements/about-block'
import AboutMainBlock from '~/pages/elements/about-main-block'
import UniformBlock from '~/pages/elements/uniform-block'
import BannersBlock from '~/pages/elements/banners-block'
import DecoratedApparelBlock from '~/pages/elements/decorated-apparel-block'

function HomePage() {
    const { data, loading, error } = useQuery(GET_HOME_DATA, { variables: { productsCount: 7 } });
    const featured = data && data.specialProducts.featured;
    const bestSelling = data && data.specialProducts.bestSelling;
    const latest = data && data.specialProducts.latest;
    const onSale = data && data.specialProducts.onSale;
    const posts = data && data.posts.data;



    return (
        <div className="main home">
            <Helmet>
                <title>Printing Galore | Uniforms, Banners, Embroidery</title>
            </Helmet>


            <h1 className="d-none">Printing Galore</h1>

            <div className="page-content">
                <div className="intro-section">
                    <IntroSection />

                    {/* <ServiceBox /> */}
                </div>

                <AboutBlock />
                <CategorySection />
                <UniformBlock />
                <AboutMainBlock />
                <BannersBlock />
                <DecoratedApparelBlock />

                {/* <BestCollection products={bestSelling} loading={loading} /> */}

                {/* <DealSection /> */}

                {/* <FeaturedCollection products={featured} loading={loading} /> */}

                {/* <CtaSection /> */}

                {/* <BlogSection posts={posts} /> */}

                {/* <BrandSection /> */}

                {/* <SmallCollection featured={featured} latest={latest} bestSelling={bestSelling} onSale={onSale} loading={loading} /> */}
            </div>

            {/* <NewsletterModal /> */}
        </div>
    )
}

export default withApollo({ ssr: typeof window === 'undefined' })(HomePage);