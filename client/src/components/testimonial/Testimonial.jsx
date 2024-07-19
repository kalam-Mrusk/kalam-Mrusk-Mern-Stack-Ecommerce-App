import React from "react";
import "./testimonial.css";
const Testimonial = () => {
  return (
    <div>
      <section className="testimonialSection">
        <div className="testimonialMainContainer">
          <h1 className="testimonialHeading">Testimonial</h1>
          <h2 className="testimonialHeading2 ">
            What our <span className="TestiCustomer">customers</span> are saying
          </h2>

          <div className="testimonialContentContainer">
            <div className="testimonialTextInfo testimonial1">
              <div className="testiImgCont">ZA</div>
              <p className="testimonialtext">
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className="EmptySpan"></span>
              <h3 className="testimonialName">Zeeshan Ahmad Ansari</h3>
              <p className="testimonialWork">Senior Product Designer</p>
            </div>
            <div className="testimonialTextInfo testimonial1">
              <div className="testiImgCont">KA</div>
              <p className="testimonialtext">
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className="EmptySpan"></span>
              <h3 className="testimonialName">Kalam Ansari</h3>
              <p className="testimonialWork">UI Develeoper</p>
            </div>
            <div className="testimonialTextInfo testimonial1">
              <div className="testiImgCont">SA</div>
              <p className="testimonialtext">
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className="EmptySpan"></span>
              <h3 className="testimonialName">Sakib Ansari</h3>
              <p className="testimonialWork">CTO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
