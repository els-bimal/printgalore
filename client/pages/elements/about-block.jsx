import { LazyLoadImage } from "react-lazy-load-image-component";
import ChefJacket from '~/public/images/home/chef-jacket-01.jpg'

function AboutBlock() {
    return (
        <div className="container">
            <div className="pt-10 mt-7">
                <div className="">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="thumbnail">
                                <LazyLoadImage
                                    src="http://www.printgalore4u.com/wp-content/uploads/2019/04/Chef-215x300.jpg"
                                    // src={ChefJacket}
                                    alt="Intro Slider"
                                    effect="opacity; transform"
                                    width={280}
                                    height={280}
                                />
                                <p className="description">From Chef Jackets to Aprons, Hats and more…we can help with your embroidery needs!</p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="about-inner inner">

                                <div className="section-title">
                                    <h2 className="title">Quality printing, exceptional customer service, and an impressive array of services to meet your printing needs…</h2>
                                    <p className="description">Uniforms, Banners, Embroidery, Promotional Items…Business, Personal, Just for Fun too!</p>
                                    <p className="description">Our team prides itself on our customer service, but don’t just take our word for it…</p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="about-us-list">
                                            <h3 className="title"> HAPPY CLIENTS SAY</h3>
                                            <p>I wanted to thank Linda and her team always great service and quick turnaround times, everything has always come out great.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="about-us-list">
                                            <h3 className="title">Who we are</h3>
                                            <p>Printing Galore in Temecula, CA, offers quality uniforms, T-shirt printing, embroidery and banners at the best price!</p>
                                            <p>Printing Galore in Temecula has been serving businesses in the valley since 2002.  We offer large and small organizations excellent service and quality products.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutBlock