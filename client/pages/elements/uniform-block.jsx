import { LazyLoadImage } from "react-lazy-load-image-component";
import ChefJacket from '~/public/images/home/chef-jacket-01.jpg'

function UniformBlock() {
    return (
        <div className="container">
            <div className="">

                <div className="pt-10 mt-7">
                    <div className="section-title text-center">
                        <h1 className="">Uniforms</h1>
                        <p className="description">Pinting Galore in Temecula has been serving businesses in the valley since 2002. We offer large and small organizations excellent service and quality products.</p>

                    </div>
                </div>

                <div className="row pt-10 mt-7">

                    <div className="col-lg-6 col-md-12 col-sm-12 text-center">
                        <div>

                            <LazyLoadImage
                                src="http://www.printgalore4u.com/wp-content/uploads/2019/03/school-uniforms-Temecula-Murrieta.jpg"
                                // src={ChefJacket}
                                alt="Intro Slider"
                                effect="opacity; transform"
                            />
                        </div>

                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 justify-content-center">
                        <div className="">
                            <p>As an authorized French Toast distributor providing school uniforms at an affordable price – We believe quality should never be a compromise. No matter what product you’re looking for, we guarantee  a great selection at the best price. We want you to feel confident that you are putting your best foot forward!</p>
                        </div>
                        <div>

                            <LazyLoadImage
                                src="http://www.printgalore4u.com/wp-content/uploads/2019/04/IMG_3090-300x225.jpg"
                                // src={ChefJacket}
                                alt="Intro Slider"
                                effect="opacity; transform"
                            />
                        </div>
                    </div>

                </div>

                <div className="row pt-10 mt-7">

                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 justify-content-center">
                        <div className="">
                            <p>We have just expanded our uniforms and now have brand names available  for the workplace including polos, jackets, scrubs, and safety vests. We think you’ll be company uniforms-logo-embroideredpleased with our great selection of Dickies, Port Authority, Carhartt, French Toast, and More!</p>
                        </div>
                        <div>

                            <LazyLoadImage
                                src="http://www.printgalore4u.com/wp-content/uploads/2019/04/Safety-wear-Temecula-vests-300x217.jpg"
                                // src={ChefJacket}
                                alt="Intro Slider"
                                effect="opacity; transform"
                            />
                        </div>
                    </div>


                    <div className="col-lg-6 col-md-12 col-sm-12 text-center">
                        <div>

                            <LazyLoadImage
                                src="http://www.printgalore4u.com/wp-content/uploads/2019/04/IMG_3099-e1554329777422-225x300.jpg"
                                // src={ChefJacket}
                                alt="Intro Slider"
                                effect="opacity; transform"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UniformBlock