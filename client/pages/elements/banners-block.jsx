import { LazyLoadImage } from "react-lazy-load-image-component";
import ChefJacket from '~/public/images/home/chef-jacket-01.jpg'

function BannersBlock() {
    return (
        <div className="container">
            <div className="">

                <div className="pt-10 mt-7">
                    <div className="section-title text-center">
                        <h1 className="">Design Your Own Banner</h1>
                        <p className="description">Our Large Format Printer allows us to Print Banners for your Company and your Favorite Sports Team.  100’s of templates for you to choose from for your design – at the best price in town!</p>
                        <p className="description">For Details and to order: <a href="https://www.socalsportsbanners.com/">SoCalSportsBanners.com</a> </p>

                    </div>
                </div>

                <div className="row pt-10 mt-7">

                    <div className="">
                        <div className="text-center">
                            <h3 className="">Banners Starting At $54.99</h3>
                            <h3 className="">Team Pennant Banners are a SUPER Value at Only $64.99</h3>
                            <h3 className="">It's as Simple as 1, 2, 3</h3>
                            <p>Our banners are the best in town, premium quality vinyl for durability— hemming and grommets are always included!</p>
                        </div>
                        <div className="pt-5 mt-3 text-center">
                            <h4 className="">NOW AVAILABLE:</h4>
                            <p>DECALS and PENNANTS at special prices when you purchase with a banner.</p>
                            <p>DECALS $25.00 FOR THE WHOLE TEAM</p>
                            <p>Only available as an add-on to your banner order.</p>
                            <p>PENNANTS $10.00 EACH</p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default BannersBlock