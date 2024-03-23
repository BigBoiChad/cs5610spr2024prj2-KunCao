import React from 'react';
import './Info.css'
function Info() {
  return (
    <section class="content">
      <div class="personal-summary">
        <p>
          Alex, a dedicated Computer Science graduate from Northeastern University in Seattle, currently pursuing a Master's in Computer Science through the Align Program. Holding a Bachelor's in Economics, Alex transitioned to tech.
          With diverse skills and a commitment to impact, Alex excels in both academia and the professional realm.</p>
      </div>
      <div class="experience-container">
        <nav class="tmln tmln--box tmln--year">
          <h2 class="tmln__header">Experience</h2>
          <ul class="tmln__list">
            <li class="tmln__item tmln__item--active">
              <span data-title>Jan, 2024 - Apr, 2024</span>
              <h3 class="tmln__item-headline">Graduate TA for CS5200 @Northeastern University --- Seattle,US</h3>
              <p>Graduate TA for subject Database Mangement. </p>

            </li>
            <li class="tmln__item tmln__item--bg-lght">
              <span data-title>Sep, 2023 - Dec, 2023</span>
              <h3 class="tmln__item-headline">Graduate TA for CS5002@Northeastern University --- Seattle,US</h3>
              <p>Graduate TA for subject Discrect Mathmatics.</p>

            </li>
            <li class="tmln__item tmln__item--bg-dark">
              <span data-title>May, 2023 - Aug, 2023</span>
              <h3 class="tmln__item-headline">Software Developer Intern @Social PayMe --- Seattle, US</h3>
              <p>Built and maintained web scraping API using Django to extract over 10k user profiles from social media
                platforms.</p>
              <p>Developed a C++ networking module to support HLS and MP4 video live streaming on both iOS and Android
                devices.</p>
              <p>Optimized the video post queue through strategic refactoring, significantly increased a 32% in
                efficiency, and eliminated invalid multi-thread operations.</p>
              <p>Led the migration of user data from MySQL to AWS RDS as the backend database, resulting in a 12%
                improvement in data processing.</p>
              <p>Revamped the software development lifecycle, integrating cutting-edge methodologies and tools, leading
                to a notable 20% enhancement in system performance and a 15% rise in user satisfaction rates.</p>
            </li>
            <li class="tmln__item tmln__item--bg-lght">
              <span data-title>May, 2022 - Aug, 2022</span>
              <h3 class="tmln__item-headline">Technology Assistant Intern @HUATAI Securities Co., Ltd</h3>
              <p>Developed and maintained a robust online stock trading platform using a modern stack including React.js,
                HTML/ CSS, and JavaScript for frontend, to deliver an intuitive and interactive user interface.</p>
              <p>Spearheaded the development of REST APIs for user registration, login, and multi-factor authorization,
                ensuring data security and user trust, resulting in an 8% increase in sign-up rates and reducing the load
                time from 200ms to 50ms.</p>
              <p>Guaranteed cross-platform compatibility with Linux and Unix systems, catering to diverse customer needs,
                and providing a consistent experience across different operating environments, expanded user base by 20%.
              </p>
            </li>
            <li class="tmln__item tmln__item--bg-dark">
              <span data-title>Aug, 2021 - Sep, 2021</span>
              <h3 class="tmln__item-headline">Administrative Assistant @People's Bank of China</h3>
              <p>Led a team of 6 to evaluate impact of a local 40M yuan economic stimulation project utilizing data-driven methodologies and computational analysis.</p>
              <p>Provided insights to cross-function teams and delivered both verbal and written reports to executives.</p>
            </li>
            <li class="tmln__item tmln__item--bg-lght">
              <span data-title>Sep, 2018 - Jul, 2020</span>
              <h3 class="tmln__item-headline">Event Organizer @HeiLongJiang Volunteer Association</h3>
              <p>Promoted and organized “Care for Empty Nesters” , improved participation rate by 23%+.</p>
              <p>Gathered and distributed donations for local orphanages, up to of 100k+ yuans per year</p>
            </li>
          </ul>
        </nav>


      </div>
    </section>
  );
}

export default Info;
