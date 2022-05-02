import { LazyLoadImage } from "react-lazy-load-image-component";
import ChefJacket from '~/public/images/home/chef-jacket-01.jpg'

function AboutMainBlock() {
    return (
        <div className="container">
            <div className="">

                <div className="pt-10 mt-7">
                    <div className="section-title text-center">
                        <h1 className="">About Us</h1>
                        <p className="description">Printing Galore offers quality uniforms, T-shirt printing, embroidery and banners at the best price!</p>
                        <p className="description">Printing Galore in Temecula has been serving businesses in the valley since 2002.  We offer large and small organizations excellent service and quality products.</p>
                        <p className="description">As an authorized French Toast distributor, we pride ourselves on our incredible selection of  school uniforms at an affordable price.  We have just expanded our uniforms and now have available brand names for the workplace including scrubs, safety vests, Dickies and Carhartt.</p>

                    </div>
                </div>

                <div className="row pt-10 mt-7">

                    <div className="">
                        <div className="text-center">
                            <h3 className="">Our Range Of Products</h3>
                            <p>We are a perfect fit to partner with the marketing pro or small business owner, offering a wide variety of printing and promotional materials.</p>
                        </div>
                        <div className="pt-5 mt-3">
                            <h3 className="title">Decorated Apparel</h3>
                            <p>Embroidery, Heat Transfers, Numbering, Team Uniforms, Work Uniforms and more!</p>
                        </div>
                        <div className="pt-5 mt-3">
                            <h3 className="title">Banners</h3>
                            <p>Premium Quality, Full-color Sports, Banners and more! Always hemmed and grommeted.</p>
                        </div>
                        <div className="pt-5 mt-3">
                            <h3 className="title">Promotional Items Online</h3>
                            <p>Cups, bags, key chains, pens— Imprint your logo on almost anything!
                                Shop for thousands of items now.</p>
                        </div>
                        <div className="pt-5 mt-3">
                            <h3 className="title">Brand Name Uniforms For School, Work and Play</h3>
                            <p>From School uniforms to Company apparel – Printing Galore in Temecula offers a complete selection of customizable product lines</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AboutMainBlock