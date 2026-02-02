import Head from "next/head";
import Image from "next/image";
import Profile from "../images/profile.jpg";

export default function About() {
  return (
    <section id="about">
      <Head>{/* <title>About</title> */}</Head>
      {/* <div > */}
      {/* <div className="col-md-2"></div>
            <div className="col-md-8 p-5"> */}
      {/* <div class="clip-path-about"></div> */}
      <div class="about-content">
        <p className="light-text home-text">
          <span className="dark-text">Software Engineer</span> specializing in frontend and full-stack web development, with experience building scalable React applications,
          admin portals, and API-driven dashboards.{" "}
          <span className="dark-text">Proven track record</span> of shipping weekly production features, improving performance and developer workflows, and{" "}
          <span className="dark-text">reducing operational friction </span>
          by up to 25%. Currently pursuing a B.S. in Computer Science at the <span className="dark-text">University of Colorado</span>{" "}
        </p>
        {/* <p className="light-text job-title">
          Front End <span className="dark-text">Web Developer</span>
        </p> */}

        {/* <p className="light-text home-text">
          I am a <span className="dark-text">customer service guru</span> turned{" "}
          <span className="dark-text">programmer</span> with 3 years of
          experience working with teams to produce impactful, leading-edge
          websites that engage customers and deliver business results.
          Well-versed in design standards and user preferences. Organized and
          dependable, successful at managing multiple priorities with a positive
          attitude.
        </p> */}
        <p className="light-text home-text">
          While not online, I enjoy{" "}
          <span className="dark-text">running trails</span> in the high country,
          checking out local <span className="dark-text">breweries</span>,
          mountain biking, snowboarding, and
          <span className="dark-text"> camping</span> under the stars.
        </p>
      </div>
      {/* </div> */}
      {/* <div className="col-md-4 text-center order-1 order-md-2 d-flex align-items-center about-img justify-content-center">
              <Image 
              src={Profile}
              height={600}
              width={600}
              alt="author holding a cup of tea"
              className='profile-photo'
              />
            </div> */}
      {/* <div className="col-md-2"></div> */}
      {/* </div> */}
    </section>
  );
}
