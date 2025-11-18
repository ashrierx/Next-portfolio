import Head from "next/head";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import computer from "../images/computer.jpg";

export default function Projects() {
  return (
    <section id="experience">
      <div className="text-center p-5 experience-section-header">
        <h2>EXPERIENCE</h2>
      </div>
      <div class="clip-path-about"></div>
      <VerticalTimeline id="experiencesDiv">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="09/2024 - 08/2025"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Software Engineer
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                View Systems
              </h5>
            </a>
          </div>
          <p>Engineering, Front End Development</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="09/2023 - 08/2024"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Web Developer (contract)
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                commercetools, Inc
              </h5>
            </a>
          </div>
          <p>Systems, Web Development</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="08/2022 - 09/2023"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Frontend Developer (contract)
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                Lampros Labs
              </h5>
            </a>
          </div>
          <p>User Experience, Web Development</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="08/2021 - 10/2023"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Teaching Assistant
              </h3>
              <h5 className="vertical-timeline-element-subtitle">EdX</h5>
            </a>
          </div>
          <p>Full Stack Web Development Cirriculum</p>
        </VerticalTimelineElement>

        {/* <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="08/2021 - 05/2022"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">Teacher</h3>
              <h5 className="vertical-timeline-element-subtitle">
                Webber Middle School
              </h5>
            </a>
          </div>
          <p>Web Design and Computer Animation</p>
        </VerticalTimelineElement> */}

        {/* <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="12/2020 - 04/2021"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Frontend Engineer
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                Vantage, Ltd
              </h5>
            </a>
          </div>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement> */}

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="12/2020 - 05/2022"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Junior Web Developer
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                First Turn Media
              </h5>
            </a>
          </div>
          <p>Custom React site</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          contentArrowStyle={{ borderRight: "7px solid black" }}
          date="08/2019 - 12/2020"
          iconStyle={{ color: "#fff" }}
          icon={
            <Image
              src={computer}
              width={40}
              height={40}
              className="experience-icon"
              alt="computer graphic"
            />
          }
        >
          <div className="experience-link">
            <a
              href="https://drive.proton.me/urls/2MWZJ3ZCAR#cVreCZAADmVa"
              target="_blank"
              className="experience-link"
            >
              <h3 className="vertical-timeline-element-title mb-2">
                Instructor
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                CodeWizards
              </h5>
            </a>
          </div>
          <p>Instructional Staff</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
}
